const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const os = require("node:os");
const path = require("node:path");

const {
  mapPageToPost,
  diffSyncedPosts,
  renderBlocksToMarkdown,
  syncNotionToHexo,
} = require("../tools/notion-sync-lib");

test("syncNotionToHexo waits and retries a rate-limited child block request", async (t) => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "notion-sync-"));
  t.after(() => fs.rm(tempDir, { recursive: true, force: true }));
  const config = {
    ...require("../notion-sync.config.cjs"),
    outputDir: path.relative(process.cwd(), tempDir),
  };
  const env = process.env;
  t.mock.method(globalThis, "setTimeout", (resolve) => queueMicrotask(resolve));
  const timer = globalThis.setTimeout;
  t.mock.method(console, "warn", () => {});
  process.env = {
    ...env,
    NOTION_TOKEN: "test-token",
    NOTION_DATABASE_ID: "test-db",
  };
  t.after(() => {
    process.env = env;
  });

  const responses = [
    Response.json({
      results: [{
        id: "page",
        created_time: "2026-04-28T00:00:00Z",
        properties: {
          Name: { type: "title", title: [{ plain_text: "Example" }] },
          Status: { type: "status", status: { name: "done" } },
        },
      }],
    }),
    Response.json({
      results: [{
        id: "child",
        type: "paragraph",
        has_children: true,
        paragraph: { rich_text: [] },
      }],
    }),
    Response.json({ additional_data: { retry_after: "60" } }, {
      status: 429,
      headers: { "Retry-After": "24" },
    }),
    Response.json({ additional_data: { retry_after: "30" } }, { status: 429 }),
    Response.json({ results: [] }),
  ];
  const request = t.mock.method(globalThis, "fetch", async () => responses.shift());

  const result = await syncNotionToHexo(config);

  assert.equal(result.writtenPosts, 1);
  assert.equal(request.mock.callCount(), 5);
  const childUrl = "https://api.notion.com/v1/blocks/child/children?page_size=100";
  assert.deepEqual(
    request.mock.calls.slice(2).map(({ arguments: [url] }) => url),
    [childUrl, childUrl, childUrl],
  );
  const delays = timer.mock.calls.map(({ arguments: [, delay] }) => delay);
  assert.equal(delays.length, 2);
  assert.ok(delays[0] >= 24000 && delays[0] < 24250);
  assert.ok(delays[1] >= 30000 && delays[1] < 30250);
  const post = await fs.readFile(path.join(tempDir, "example.md"), "utf8");
  assert.match(post, /title: Example/);
});

test("mapPageToPost converts notion properties into a Hexo post record", async () => {
  const page = {
    id: "page-123",
    properties: {
      Name: {
        type: "title",
        title: [{ plain_text: "从 Notion 自动发布" }],
      },
      Slug: {
        type: "rich_text",
        rich_text: [{ plain_text: "publish-from-notion" }],
      },
      Date: {
        type: "date",
        date: { start: "2025-04-09T10:00:00.000Z" },
      },
      Tags: {
        type: "multi_select",
        multi_select: [{ name: "notion" }, { name: "hexo" }],
      },
      Categories: {
        type: "multi_select",
        multi_select: [{ name: "自动化" }],
      },
    },
  };

  const markdown = renderBlocksToMarkdown([
    {
      type: "heading_1",
      heading_1: {
        rich_text: [{ plain_text: "同步方案", href: null, annotations: {} }],
      },
    },
    {
      type: "paragraph",
      paragraph: {
        rich_text: [
          { plain_text: "正文第一段", href: null, annotations: {} },
          {
            plain_text: "Notion",
            href: "https://www.notion.so/",
            annotations: { bold: true },
          },
        ],
      },
    },
    {
      type: "bulleted_list_item",
      bulleted_list_item: {
        rich_text: [{ plain_text: "支持列表", href: null, annotations: {} }],
      },
    },
    {
      type: "code",
      code: {
        language: "javascript",
        rich_text: [{ plain_text: "console.log('hello')", annotations: {} }],
      },
    },
    {
      type: "image",
      image: {
        type: "external",
        external: { url: "https://example.com/demo.png" },
        caption: [{ plain_text: "示例图", annotations: {} }],
      },
    },
  ]);

  const post = mapPageToPost(page, markdown, {
    timezone: "Asia/Shanghai",
    propertyMap: {
      title: "Name",
      slug: "Slug",
      date: "Date",
      tags: "Tags",
      categories: "Categories",
    },
    outputDir: "source/_posts/notion",
  });

  assert.equal(post.notionId, "page-123");
  assert.equal(post.slug, "publish-from-notion");
  assert.equal(post.filePath, "source/_posts/notion/publish-from-notion.md");
  assert.match(post.content, /^---\ntitle: 从 Notion 自动发布\n/);
  assert.match(post.content, /date: 2025-04-09 18:00/);
  assert.match(post.content, /tags:\n  - notion\n  - hexo/);
  assert.match(post.content, /categories:\n  - 自动化/);
  assert.match(post.content, /notion_id: page-123/);
  assert.match(post.content, /# 同步方案/);
  assert.match(post.content, /正文第一段\*\*\[Notion\]\(https:\/\/www\.notion\.so\/\)\*\*/);
  assert.match(post.content, /- 支持列表/);
  assert.match(post.content, /```javascript\nconsole\.log\('hello'\)\n```/);
  assert.match(post.content, /!\[示例图\]\(https:\/\/example\.com\/demo\.png\)/);
});

test("mapPageToPost supports auto-detected title property and writes description", async () => {
  const page = {
    id: "page-456",
    created_time: "2026-03-23T03:02:00.000Z",
    properties: {
      标题: {
        type: "title",
        title: [{ plain_text: "OpenClaw 连接本地 Ollama 模型" }],
      },
      Status: {
        type: "status",
        status: { name: "done🙌🏻" },
      },
      Summary: {
        type: "rich_text",
        rich_text: [{ plain_text: "本地运行 open claw" }],
      },
      Type: {
        type: "multi_select",
        multi_select: [{ name: "system" }, { name: "ai" }],
      },
      Tags: {
        type: "multi_select",
        multi_select: [{ name: "基础" }],
      },
    },
  };

  const post = mapPageToPost(page, "正文", {
    timezone: "Asia/Shanghai",
    propertyMap: {
      title: "__title__",
      slug: "Slug",
      date: "Created time",
      tags: "Tags",
      categories: "Type",
      description: "Summary",
    },
    outputDir: "source/_posts/notion",
  });

  assert.equal(post.slug, "openclaw-连接本地-ollama-模型");
  assert.match(post.content, /^---\ntitle: OpenClaw 连接本地 Ollama 模型\n/);
  assert.match(post.content, /date: 2026-03-23 11:02/);
  assert.match(post.content, /description: 本地运行 open claw/);
  assert.match(post.content, /categories:\n  - system\n  - ai/);
  assert.match(post.content, /tags:\n  - 基础/);
});

test("diffSyncedPosts finds generated files that should be removed", async () => {
  const staleFiles = diffSyncedPosts(
    [
      {
        notionId: "active-post",
        filePath: "source/_posts/notion/active-post.md",
      },
    ],
    [
      {
        notionId: "active-post",
        filePath: "source/_posts/notion/active-post.md",
      },
      {
        notionId: "draft-post",
        filePath: "source/_posts/notion/draft-post.md",
      },
    ],
  );

  assert.deepEqual(staleFiles, ["source/_posts/notion/draft-post.md"]);
});

test("diffSyncedPosts removes old files when the same notion page gets a new slug", async () => {
  const staleFiles = diffSyncedPosts(
    [
      {
        notionId: "page-123",
        filePath: "source/_posts/notion/new-slug.md",
      },
    ],
    [
      {
        notionId: "page-123",
        filePath: "source/_posts/notion/old-slug.md",
      },
    ],
  );

  assert.deepEqual(staleFiles, ["source/_posts/notion/old-slug.md"]);
});

test("renderBlocksToMarkdown prefers downloaded asset paths for image blocks", async () => {
  const markdown = renderBlocksToMarkdown(
    [
      {
        type: "image",
        image: {
          type: "file",
          file: { url: "https://secure.notion-static.com/image.png" },
          caption: [{ plain_text: "封面图", annotations: {} }],
        },
      },
    ],
    {
      assetMap: {
        "https://secure.notion-static.com/image.png":
          "/images/notion/cover-image.png",
      },
    },
  );

  assert.equal(markdown.trim(), "![封面图](/images/notion/cover-image.png)");
});

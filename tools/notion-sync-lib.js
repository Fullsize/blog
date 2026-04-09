const fs = require("node:fs/promises");
const path = require("node:path");

const NOTION_VERSION = "2022-06-28";

function yamlScalar(value) {
  const stringValue = String(value ?? "");
  if (/^[\p{Letter}\p{Number}_\-/ .]+$/u.test(stringValue)) {
    return stringValue;
  }
  return JSON.stringify(stringValue);
}

function slugify(input, fallback = "post") {
  const normalized = String(input ?? "")
    .normalize("NFKC")
    .trim()
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || fallback;
}

function formatDateInTimezone(input, timezone = "Asia/Shanghai") {
  const date = new Date(input);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid date value: ${input}`);
  }

  const formatter = new Intl.DateTimeFormat("sv-SE", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date).replace(" ", " ");
}

function getPlainTextFromRichText(items = []) {
  return items.map((item) => item.plain_text || "").join("");
}

function getPropertyValue(page, propertyName) {
  if (!propertyName) {
    return undefined;
  }

  if (propertyName === "__title__") {
    const titleProperty = Object.values(page.properties || {}).find(
      (property) => property?.type === "title",
    );
    return titleProperty
      ? getPlainTextFromRichText(titleProperty.title)
      : undefined;
  }

  const property = page.properties?.[propertyName];
  if (!property) {
    return undefined;
  }

  switch (property.type) {
    case "title":
      return getPlainTextFromRichText(property.title);
    case "rich_text":
      return getPlainTextFromRichText(property.rich_text);
    case "date":
      return property.date?.start;
    case "created_time":
      return property.created_time;
    case "last_edited_time":
      return property.last_edited_time;
    case "multi_select":
      return property.multi_select.map((item) => item.name);
    case "select":
      return property.select?.name;
    case "status":
      return property.status?.name;
    case "checkbox":
      return property.checkbox;
    default:
      return property[property.type];
  }
}

function escapeInlineMarkdown(text) {
  return String(text ?? "").replace(/([\\`*_[\]<>])/g, "\\$1");
}

function renderRichText(items = []) {
  return items
    .map((item) => {
      const annotations = item.annotations || {};
      let text = annotations.code
        ? `\`${String(item.plain_text ?? "").replace(/`/g, "\\`")}\``
        : escapeInlineMarkdown(item.plain_text ?? "");

      if (item.href) {
        text = `[${text}](${item.href})`;
      }
      if (annotations.bold) {
        text = `**${text}**`;
      }
      if (annotations.italic) {
        text = `*${text}*`;
      }
      if (annotations.strikethrough) {
        text = `~~${text}~~`;
      }

      return text;
    })
    .join("");
}

function getBlockRichText(block) {
  const value = block[block.type];
  return value?.rich_text || [];
}

function getImageUrl(block) {
  const image = block.image;
  if (!image) {
    return undefined;
  }

  if (image.type === "external") {
    return image.external?.url;
  }

  if (image.type === "file") {
    return image.file?.url;
  }

  return undefined;
}

function renderBlock(block, options = {}, depth = 0) {
  const assetMap = options.assetMap || {};
  const indent = "  ".repeat(depth);

  switch (block.type) {
    case "paragraph":
      return renderRichText(getBlockRichText(block));
    case "heading_1":
      return `# ${renderRichText(getBlockRichText(block))}`;
    case "heading_2":
      return `## ${renderRichText(getBlockRichText(block))}`;
    case "heading_3":
      return `### ${renderRichText(getBlockRichText(block))}`;
    case "bulleted_list_item":
      return `${indent}- ${renderRichText(getBlockRichText(block))}`;
    case "numbered_list_item":
      return `${indent}1. ${renderRichText(getBlockRichText(block))}`;
    case "quote":
      return `> ${renderRichText(getBlockRichText(block))}`;
    case "divider":
      return "---";
    case "code": {
      const language = block.code?.language || "";
      const code = getPlainTextFromRichText(block.code?.rich_text || []);
      return `\`\`\`${language}\n${code}\n\`\`\``;
    }
    case "callout":
      return `> ${renderRichText(getBlockRichText(block))}`;
    case "image": {
      const originalUrl = getImageUrl(block);
      const finalUrl = assetMap[originalUrl] || originalUrl;
      const caption = renderRichText(block.image?.caption || []);
      return `![${caption}](${finalUrl})`;
    }
    case "toggle":
      return `- ${renderRichText(getBlockRichText(block))}`;
    default:
      return renderRichText(getBlockRichText(block));
  }
}

function renderBlocksToMarkdown(blocks = [], options = {}, depth = 0) {
  const parts = [];

  for (const block of blocks) {
    const rendered = renderBlock(block, options, depth);
    if (rendered) {
      parts.push(rendered);
    }

    if (Array.isArray(block.children) && block.children.length > 0) {
      const nextDepth =
        block.type === "bulleted_list_item" || block.type === "numbered_list_item"
          ? depth + 1
          : depth;
      const childMarkdown = renderBlocksToMarkdown(
        block.children,
        options,
        nextDepth,
      );
      if (childMarkdown) {
        parts.push(childMarkdown);
      }
    }
  }

  return parts.filter(Boolean).join("\n\n");
}

function buildFrontMatter(post) {
  const lines = [
    "---",
    `title: ${post.title}`,
    `date: ${post.date}`,
    ...(post.description ? [`description: ${post.description}`] : []),
    "tags:",
    ...post.tags.map((tag) => `  - ${tag}`),
    "categories:",
    ...post.categories.map((category) => `  - ${category}`),
    `notion_id: ${post.notionId}`,
    "---",
  ];

  return lines.join("\n");
}

function mapPageToPost(page, markdown, config) {
  const titleValue = getPropertyValue(page, config.propertyMap.title);
  if (!titleValue) {
    throw new Error(`Page ${page.id} is missing title property`);
  }

  const slugValue = getPropertyValue(page, config.propertyMap.slug);
  const dateValue = getPropertyValue(page, config.propertyMap.date) || page.created_time;
  const tagsValue = getPropertyValue(page, config.propertyMap.tags) || [];
  const categoriesValue =
    getPropertyValue(page, config.propertyMap.categories) || [];
  const descriptionValue = getPropertyValue(
    page,
    config.propertyMap.description,
  );

  const slug = slugify(slugValue || titleValue, page.id);
  const filePath = path.posix.join(config.outputDir, `${slug}.md`);
  const frontMatter = buildFrontMatter({
    title: yamlScalar(titleValue),
    date: formatDateInTimezone(dateValue, config.timezone),
    description: descriptionValue ? yamlScalar(descriptionValue) : "",
    tags: tagsValue.map(yamlScalar),
    categories: categoriesValue.map(yamlScalar),
    notionId: page.id,
  });

  return {
    notionId: page.id,
    slug,
    filePath,
    content: `${frontMatter}\n\n${markdown.trim()}\n`,
  };
}

function diffSyncedPosts(currentPosts, existingPosts) {
  const currentById = new Map(
    currentPosts.map((post) => [post.notionId, post.filePath]),
  );
  return existingPosts
    .filter((post) => currentById.get(post.notionId) !== post.filePath)
    .map((post) => post.filePath)
    .sort();
}

async function notionRequest({ token, pathName, method = "GET", body }) {
  const response = await fetch(`https://api.notion.com/v1${pathName}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      "Notion-Version": NOTION_VERSION,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Notion API ${method} ${pathName} failed: ${response.status} ${errorText}`,
    );
  }

  return response.json();
}

async function queryDatabase({ token, databaseId }) {
  const results = [];
  let cursor;

  do {
    const payload = { page_size: 100 };
    if (cursor) {
      payload.start_cursor = cursor;
    }

    const response = await notionRequest({
      token,
      pathName: `/databases/${databaseId}/query`,
      method: "POST",
      body: payload,
    });

    results.push(...response.results);
    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return results;
}

async function fetchBlockChildren({ token, blockId }) {
  const results = [];
  let cursor;

  do {
    const query = new URLSearchParams({ page_size: "100" });
    if (cursor) {
      query.set("start_cursor", cursor);
    }

    const response = await notionRequest({
      token,
      pathName: `/blocks/${blockId}/children?${query.toString()}`,
    });

    for (const block of response.results) {
      if (block.has_children) {
        block.children = await fetchBlockChildren({ token, blockId: block.id });
      }
      results.push(block);
    }

    cursor = response.has_more ? response.next_cursor : undefined;
  } while (cursor);

  return results;
}

function isPublished(page, config) {
  const statusValue = getPropertyValue(page, config.propertyMap.status);
  return config.publishStatusValues.includes(statusValue);
}

function collectAssetUrls(blocks = [], urls = new Set()) {
  for (const block of blocks) {
    if (block.type === "image") {
      const url = getImageUrl(block);
      if (url) {
        urls.add(url);
      }
    }
    if (Array.isArray(block.children) && block.children.length > 0) {
      collectAssetUrls(block.children, urls);
    }
  }
  return urls;
}

async function ensureDir(targetPath) {
  await fs.mkdir(targetPath, { recursive: true });
}

function fileExtensionFromUrl(url) {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname);
    return ext || ".bin";
  } catch {
    return ".bin";
  }
}

async function downloadAsset(url, destinationPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download asset: ${url}`);
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await ensureDir(path.dirname(destinationPath));
  await fs.writeFile(destinationPath, bytes);
}

async function downloadAssets({ blocks, slug, assetDir, assetPublicDir }) {
  const urls = [...collectAssetUrls(blocks)];
  const assetMap = {};
  const postAssetDir = path.posix.join(assetDir, slug);
  const postAssetAbsoluteDir = path.join(process.cwd(), postAssetDir);

  await fs.rm(postAssetAbsoluteDir, { recursive: true, force: true });

  for (const [index, url] of urls.entries()) {
    const extension = fileExtensionFromUrl(url);
    const fileName = `${index + 1}${extension}`;
    const relativePath = path.posix.join(postAssetDir, fileName);
    const absolutePath = path.join(process.cwd(), relativePath);
    await downloadAsset(url, absolutePath);
    assetMap[url] = path.posix.join("/", assetPublicDir, slug, fileName);
  }

  return assetMap;
}

async function walkMarkdownFiles(dirPath) {
  const absoluteDir = path.join(process.cwd(), dirPath);
  try {
    const entries = await fs.readdir(absoluteDir, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
      const entryPath = path.join(absoluteDir, entry.name);
      const relativePath = path.posix.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        files.push(...(await walkMarkdownFiles(relativePath)));
      } else if (entry.isFile() && entry.name.endsWith(".md")) {
        files.push(relativePath);
      }
    }

    return files;
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

function extractNotionId(content) {
  const match = content.match(/^notion_id:\s*(.+)$/m);
  return match ? match[1].trim() : undefined;
}

async function loadExistingSyncedPosts(outputDir) {
  const files = await walkMarkdownFiles(outputDir);
  const posts = [];

  for (const filePath of files) {
    const content = await fs.readFile(path.join(process.cwd(), filePath), "utf8");
    const notionId = extractNotionId(content);
    if (notionId) {
      posts.push({ notionId, filePath });
    }
  }

  return posts;
}

async function writePost(post) {
  const absolutePath = path.join(process.cwd(), post.filePath);
  await ensureDir(path.dirname(absolutePath));
  await fs.writeFile(absolutePath, post.content, "utf8");
}

async function removeFile(relativePath) {
  await fs.rm(path.join(process.cwd(), relativePath), { force: true });
}

async function removePostAssets(relativePath, assetDir) {
  const slug = path.basename(relativePath, ".md");
  await fs.rm(path.join(process.cwd(), assetDir, slug), {
    recursive: true,
    force: true,
  });
}

async function syncNotionToHexo(config) {
  const token = process.env.NOTION_TOKEN;
  const databaseId = process.env.NOTION_DATABASE_ID;

  if (!token || !databaseId) {
    throw new Error("Missing NOTION_TOKEN or NOTION_DATABASE_ID");
  }

  const pages = await queryDatabase({ token, databaseId });
  const publishedPages = pages.filter((page) => isPublished(page, config));
  const existingPosts = await loadExistingSyncedPosts(config.outputDir);
  const currentPosts = [];

  await ensureDir(path.join(process.cwd(), config.outputDir));

  for (const page of publishedPages) {
    const blocks = await fetchBlockChildren({ token, blockId: page.id });
    const slugSource =
      getPropertyValue(page, config.propertyMap.slug) ||
      getPropertyValue(page, config.propertyMap.title) ||
      page.id;
    const slug = slugify(slugSource, page.id);
    const assetMap = await downloadAssets({
      blocks,
      slug,
      assetDir: config.assetDir,
      assetPublicDir: config.assetPublicDir,
    });
    const markdown = renderBlocksToMarkdown(blocks, { assetMap });
    const post = mapPageToPost(page, markdown, config);
    await writePost(post);
    currentPosts.push({ notionId: post.notionId, filePath: post.filePath });
  }

  const staleFiles = diffSyncedPosts(currentPosts, existingPosts);
  for (const filePath of staleFiles) {
    await removeFile(filePath);
    await removePostAssets(filePath, config.assetDir);
  }

  return {
    totalPages: pages.length,
    publishedPages: publishedPages.length,
    writtenPosts: currentPosts.length,
    removedPosts: staleFiles.length,
  };
}

module.exports = {
  NOTION_VERSION,
  mapPageToPost,
  diffSyncedPosts,
  renderBlocksToMarkdown,
  syncNotionToHexo,
};

const { syncNotionToHexo } = require("./notion-sync-lib");

async function main() {
  const config = require("../notion-sync.config.cjs");
  const result = await syncNotionToHexo(config);
  console.log(
    `Synced ${result.writtenPosts}/${result.publishedPages} published posts from ${result.totalPages} Notion pages, removed ${result.removedPosts} stale posts.`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

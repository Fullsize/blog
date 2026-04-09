const { syncNotionToHexo } = require("./notion-sync-lib");

async function main() {
  const config = require("../notion-sync.config.cjs");
  console.log("Starting Notion sync...");
  const result = await syncNotionToHexo(config);
  console.log("-----------------------------------------");
  console.log(`Total Notion pages found: ${result.totalPages}`);
  console.log(`Pages matching status:    ${result.publishedPages}`);
  console.log(`Files written to disk:   ${result.writtenPosts}`);
  console.log(`Stale files removed:     ${result.removedPosts}`);
  console.log("-----------------------------------------");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

- `npm install` — install dependencies (CI uses npm)
- `npm run dev` — local Hexo server for previewing
- `npm run build` — generate static site into `public/`
- `npm run clean` — remove generated artifacts (`public/`, `db.json`)
- `npm run clean && npm run build` — routine check before opening PRs
- `npm run sync:notion` — sync published posts from Notion
- `npm run test` — run tests via `node --test tests/*.test.js`

## Architecture

Hexo 7.3.0 blog with the Fluid theme (`hexo-theme-fluid` as npm dep, configured in `_config.fluid.yml`). The legacy `themes/hexo-theme-matery/` is unused — don't edit it.

**Content flow**: Hexo reads `source/_posts/**/*.md`, processes front matter, renders with Fluid theme, outputs to `public/`. Deployed to GitHub Pages via `JamesIves/github-pages-deploy-action@v4`.

**Two content sources**:
- **Manual posts**: Markdown files in `source/_posts/code/<topic>/` (javascript/, react/, typescript/, vue/, haxi/)
- **Notion-synced posts**: Auto-generated in `source/_posts/notion/` with images in `source/images/notion/<slug>/`

**Notion sync pipeline** (`tools/`):
- `notion-sync.config.cjs` — maps Notion database properties to Hexo front matter, defines output dirs and published-status values
- `tools/notion-sync.js` — CLI entry point
- `tools/notion-sync-lib.js` — core library: queries Notion API, renders blocks to Markdown, downloads images, generates front matter, diffs stale files
- `notion_id` in front matter links a post back to its Notion page

**CI/CD** (`.github/workflows/`):
- `notion-sync.yml` — hourly cron + manual dispatch; syncs from Notion and commits changes
- `deploy.yml` — triggers on push to `master` AND after successful Notion sync; builds and deploys

## Conventions

- Commit prefixes: `feat:`, `fix:`, `chore:`, `docs:` (Chinese summaries common)
- Notion sync auto-commits use: `feat: sync notion posts`
- Front matter: YAML with 2-space indent; manual posts use `title/date/tags/categories`, Notion posts add `description/notion_id`
- Permalinks: `:year/:month/:day/:title/` with `hexo-permalink-pinyin` converting Chinese to pinyin
- No linter or formatter configured — preserve existing style in nearby files
- Tests use Node.js built-in test runner (`node:test`, `node:assert/strict`) in `tests/*.test.js`

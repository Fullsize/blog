# Repository Guidelines

## Project Structure & Module Organization
This repository is a Hexo blog. The main site configuration lives in `_config.yml`, with an older alternate config in `_config.landscape.yml`. Write content under `source/`: blog posts go in `source/_posts/`, and standalone pages such as `source/about/` or `source/tags/` define site sections. Use `scaffolds/` for new post/page templates. Treat `themes/hexo-theme-matery/` as bundled theme code; avoid editing it unless a change cannot be handled through config or content.

## Build, Test, and Development Commands
- `npm install`: install Hexo and theme dependencies. The GitHub Actions deploy job currently uses npm.
- `npm run dev`: start the local Hexo server for previewing posts and pages.
- `npm run build`: generate the static site into `public/`.
- `npm run clean`: remove generated artifacts before a fresh build.
- `npm run deploy`: run Hexo's deploy task if deploy targets are configured locally.

For routine checks, run `npm run clean && npm run build` before opening a PR.

## Coding Style & Naming Conventions
Keep Markdown content concise and front matter valid YAML. Use 2-space indentation in YAML files and front matter blocks. Prefer descriptive post titles and stable, readable paths under `source/_posts/`, grouped by topic folders such as `javascript/`, `react/`, or `typescript/`. Store shared images in `source/images/`. There is no configured formatter or linter in this repo, so preserve the existing style in nearby files.

## Testing Guidelines
This project does not include an automated test suite. Validation is build-based: contributors should run `npm run build` and inspect the result locally with `npm run dev`. Check that new posts render, links resolve, tags/categories update correctly, and no Hexo warnings are introduced.

## Commit & Pull Request Guidelines
Recent history uses short Conventional Commit prefixes such as `feat: 更新` and `feat: 增加文章`; continue using `feat:`, `fix:`, or `docs:` with a brief summary. Keep each commit focused on one content or config change. Pull requests should include a short description, note any changed pages or posts, and attach screenshots when layout, navigation, or rendered content changes. If deployment behavior is affected, mention the impact on `.github/workflows/deploy.yml`.

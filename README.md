**English** | [简体中文](README.zh-CN.md)

# Wuya Blog | Frontend Development and Technical Notes

Wuya (无涯) is fullsize's personal tech blog, sharing frontend development notes, solutions to problems encountered at work, developer tools, and reflections on everyday life. Topics include JavaScript, React, Vue, Nuxt, CSS, browsers and HTTP requests, along with engineering practices using GitHub Actions and Docker.

**Read the blog: [blog.fullsize.cn](https://blog.fullsize.cn/)**

[Archives](https://blog.fullsize.cn/archives/) · [Categories](https://blog.fullsize.cn/categories/) · [Tags](https://blog.fullsize.cn/tags/) · [GitHub Repository](https://github.com/Fullsize/blog)

The blog articles are primarily written in Chinese. This README is available in English and [Simplified Chinese](README.zh-CN.md).

## Topics

The blog focuses on practical questions, code examples, and lessons from development. Browse it for frontend fundamentals, framework usage, and solutions to everyday development problems.

| Area | Topics |
| --- | --- |
| JavaScript fundamentals | Closures, iterators and generators, Promises, array operations, shallow and deep copying |
| React | Hooks, passing props, lifecycle, Fiber, keys, and new features in React 19 |
| Vue and Nuxt | watch vs. computed, lifecycle, and common Nuxt 3 configuration |
| CSS and UI development | Tailwind CSS, CSS in JS, text overflow, preprocessing and postprocessing |
| Browsers and networking | CORS and preflight requests, caching, request headers, audio recording, and Web Workers |
| Tools and engineering | GitHub Actions, Docker, Miniconda, development environment setup, and troubleshooting |

### Selected Articles

These links open the original Markdown files in this repository. For the full reading experience and more posts, visit the [blog archives](https://blog.fullsize.cn/archives/).

- [React 19 Improvements and New Features](source/_posts/code/react/react19的改进和新功能.md)
- [The Role of Keys in React](source/_posts/code/react/react%20key的作用.md)
- [JavaScript Closures](source/_posts/code/javascript/闭包.md)
- [HTTP Preflight Requests](source/_posts/code/javascript/预检请求.md)
- [watch vs. computed in Vue](source/_posts/code/vue/vue中watch和computed的区别.md)
- [Common Nuxt 3 Configuration](source/_posts/notion/nuxt3常用配置.md)

## Run Locally

The site uses **Hexo 7** with the **Fluid** theme and provides archives, categories, tags, and site search. Node.js 20 is recommended to match the GitHub Actions build environment.

```bash
git clone https://github.com/Fullsize/blog.git
cd blog
npm install
npm run dev
```

Open [http://localhost:4000](http://localhost:4000) to preview the blog. Check the terminal output for the actual server address.

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the local preview server |
| `npm run clean` | Remove generated files and the Hexo cache |
| `npm run build` | Generate the static site in `public/` |
| `npm run sync:notion` | Sync Notion pages that meet the publication criteria |
| `npm test` | Run tests for the Notion sync logic |
| `npm run deploy` | Run Hexo deployment after configuring a deployment target in `_config.yml` |

## Content and Configuration

```text
.
├── _config.yml              # Site metadata, URL, permalinks, and theme selection
├── _config.fluid.yml        # Configuration for the active Fluid theme
├── source/
│   ├── _posts/code/         # Posts organized by technical topic
│   ├── _posts/notion/       # Posts synced from Notion
│   ├── images/             # Image assets
│   ├── about/              # About page
│   ├── categories/         # Categories page
│   └── tags/               # Tags page
├── scaffolds/              # Hexo content templates
├── tools/                  # Notion sync scripts
├── tests/                  # Notion sync tests
└── .github/workflows/      # Content sync and automated deployment
```

The repository also retains Matery theme code in `themes/` and an older alternative configuration in `_config.landscape.yml`. The active theme is selected by `theme: fluid` in `_config.yml`.

### Write a Post

Create a Markdown file under `source/_posts/` in the appropriate topic directory. Start the file with YAML front matter:

```markdown
---
title: Your Post Title
date: 2026-10-08 10:00:00
tags:
  - JavaScript
categories:
  - Frontend Development
description: A sentence describing the problem this post addresses.
---

Write your post here.
```

Store shared images in `source/images/`. Before publishing, run a clean build and preview the site to check the article, images, links, categories, and tags:

```bash
npm run clean && npm run build
npm run dev
```

### Sync from Notion

`notion-sync.config.cjs` defines property mappings, publication statuses, and output directories. Set the `NOTION_TOKEN` and `NOTION_DATABASE_ID` environment variables and grant the Notion integration access to the target database before running the sync. In GitHub Actions, store these values as Repository Secrets with the same names.

```bash
npm run sync:notion
```

Accepted publication statuses are `done`, `Done`, `已发布`, and `done🙌🏻`. Posts are written to `source/_posts/notion/`, and images to `source/images/notion/`. The sync removes previously synced posts that no longer meet the criteria, along with their associated images. Edit these posts in Notion and sync again to update them.

## Automated Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which installs dependencies, generates the static site, and publishes `public/` to GitHub Pages.

The Notion sync workflow, `.github/workflows/notion-sync.yml`, is triggered manually in GitHub Actions and commits synced content. The deployment workflow also runs after a successful Notion sync workflow. The configured site URL is [https://blog.fullsize.cn/](https://blog.fullsize.cn/).

## Feedback

Report article errors, broken links, or topic suggestions through [GitHub Issues](https://github.com/Fullsize/blog/issues). When submitting a correction, include the relevant article and the reason for the change so it can be reviewed.

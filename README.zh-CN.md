[English](README.md) | **简体中文**

# 无涯的博客｜前端开发与技术实践

无涯是 fullsize 的个人技术博客，记录前端开发中的学习笔记、工作问题与解决过程，也分享开发工具的使用经验和生活感悟。内容涵盖 JavaScript、React、Vue、Nuxt、CSS、浏览器与网络请求，以及 GitHub Actions、Docker 等工程实践。

**在线阅读：[blog.fullsize.cn](https://blog.fullsize.cn/)**

[文章归档](https://blog.fullsize.cn/archives/) · [主题分类](https://blog.fullsize.cn/categories/) · [标签索引](https://blog.fullsize.cn/tags/) · [GitHub 仓库](https://github.com/Fullsize/blog)

## 这里有什么

博客以具体问题、代码示例和实践记录为主，适合查阅前端基础知识、框架用法，以及日常开发中遇到的问题。

| 方向 | 内容 |
| --- | --- |
| JavaScript 基础 | 闭包、迭代器与生成器、Promise、数组处理、浅拷贝与深拷贝 |
| React | Hooks、组件传参、生命周期、Fiber、key 的作用、React 19 新功能 |
| Vue 与 Nuxt | watch 与 computed、生命周期、Nuxt 3 常用配置 |
| CSS 与页面开发 | Tailwind CSS、CSS in JS、文本溢出处理、预编译与后编译 |
| 浏览器与网络 | 跨域和预检请求、缓存、请求头、Web 录音、Web Worker |
| 工具与工程实践 | GitHub Actions、Docker、Miniconda、开发环境搭建与故障排查 |

### 从这些文章开始

以下链接指向仓库内的 Markdown 原文；完整阅读体验和更多文章见[博客归档](https://blog.fullsize.cn/archives/)。

- [React 19 的改进和新功能](source/_posts/code/react/react19的改进和新功能.md)
- [React key 的作用](source/_posts/code/react/react%20key的作用.md)
- [JavaScript 闭包](source/_posts/code/javascript/闭包.md)
- [HTTP 预检请求](source/_posts/code/javascript/预检请求.md)
- [Vue 中 watch 和 computed 的区别](source/_posts/code/vue/vue中watch和computed的区别.md)
- [Nuxt 3 常用配置](source/_posts/notion/nuxt3常用配置.md)

## 本地运行

博客使用 **Hexo 7** 生成静态页面，当前启用 **Fluid** 主题，支持文章归档、分类、标签与站内内容搜索。建议使用 Node.js 20，与 GitHub Actions 的构建环境保持一致。

```bash
git clone https://github.com/Fullsize/blog.git
cd blog
npm install
npm run dev
```

启动后访问 [http://localhost:4000](http://localhost:4000) 预览博客，实际地址以终端输出为准。

| 命令 | 用途 |
| --- | --- |
| `npm run dev` | 启动本地预览服务 |
| `npm run clean` | 清理生成文件和 Hexo 缓存 |
| `npm run build` | 生成静态站点到 `public/` |
| `npm run sync:notion` | 将符合发布条件的 Notion 页面同步为文章 |
| `npm test` | 运行 Notion 同步逻辑的测试 |
| `npm run deploy` | 执行 Hexo 部署；需先配置 `_config.yml` 中的部署目标 |

## 内容与配置

```text
.
├── _config.yml              # 站点信息、网址、文章链接和主题选择
├── _config.fluid.yml        # 当前 Fluid 主题配置
├── source/
│   ├── _posts/code/         # 按技术主题整理的文章
│   ├── _posts/notion/       # 从 Notion 同步的文章
│   ├── images/             # 图片资源
│   ├── about/              # 关于页面
│   ├── categories/         # 分类页面
│   └── tags/               # 标签页面
├── scaffolds/              # Hexo 内容模板
├── tools/                  # Notion 同步脚本
├── tests/                  # Notion 同步测试
└── .github/workflows/      # 内容同步与自动部署
```

`themes/` 中保留了 Matery 主题代码，`_config.landscape.yml` 是旧的备用配置；当前主题以 `_config.yml` 的 `theme: fluid` 为准。

### 写一篇文章

在 `source/_posts/` 下创建 Markdown 文件，按主题放入对应目录。文件开头使用 YAML front matter：

```markdown
---
title: 文章标题
date: 2026-10-08 10:00:00
tags:
  - JavaScript
categories:
  - 前端开发
description: 用一句话说明文章解决的问题。
---

这里开始写正文。
```

共享图片放在 `source/images/` 下。发布前执行一次完整构建，并在本地预览中检查正文、图片、链接和分类标签：

```bash
npm run clean && npm run build
npm run dev
```

### 从 Notion 同步

同步规则位于 `notion-sync.config.cjs`，包括属性映射、发布状态和输出目录。运行前需设置环境变量 `NOTION_TOKEN` 与 `NOTION_DATABASE_ID`，并授予 Notion 集成访问目标数据库的权限。GitHub Actions 中使用同名 Repository Secrets 保存这些值。

```bash
npm run sync:notion
```

当前允许的发布状态为 `done`、`Done`、`已发布` 和 `done🙌🏻`。同步文章写入 `source/_posts/notion/`，图片写入 `source/images/notion/`。同步会清理不再符合条件的旧同步文章及其对应图片；维护这些内容时，应在 Notion 中修改后重新同步。

## 自动部署

推送到 `master` 分支会触发 `.github/workflows/deploy.yml`：安装依赖、生成静态页面，然后将 `public/` 发布到 GitHub Pages。

Notion 同步工作流 `.github/workflows/notion-sync.yml` 通过 GitHub Actions 手动触发，完成后会提交同步内容；部署工作流也会在该同步工作流成功结束后运行。线上站点地址配置为 [https://blog.fullsize.cn/](https://blog.fullsize.cn/)。

## 反馈与交流

如果发现文章中的错误、失效链接，或希望补充某个主题，欢迎通过 [GitHub Issues](https://github.com/Fullsize/blog/issues) 反馈。提交内容修正时，请注明对应文章和修改原因，方便核对。

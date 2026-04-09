---
title: esbuild
date: 2020-11-27 18:17
description: "打包速度明显快于webpack,可以替换webpack?"
tags:
  - tool
categories:
  - tool
notion_id: 83a0cf93-c31d-43e7-bfe5-74f016001c94
---

Esbuild 是一个极快的 JavaScript 和 TypeScript 打包工具和编译器。它的设计目标是速度和效率，能够显著减少构建时间。以下是一些 Esbuild 的主要特点：

1. **速度快**：Esbuild 使用 Go 语言编写，具有极高的性能，能够在几毫秒内完成构建任务。

1. **支持现代 JavaScript 特性**：Esbuild 支持最新的 JavaScript 和 TypeScript 语法，包括 ES6 模块、动态导入等。

1. **树摇优化**：Esbuild 可以自动移除未使用的代码，从而减小打包后的文件大小。

1. **代码拆分**：支持代码拆分功能，可以将代码分割成多个文件，以便于按需加载。

1. **插件系统**：Esbuild 提供了一个插件系统，允许开发者扩展其功能。

以下是一个简单的 Esbuild 配置示例：

```javascript
const esbuild = require('esbuild');
esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
  minify: true,
  sourcemap: true,
  target: ['es2020'],
}).catch(() => process.exit(1));

```

在这个示例中，Esbuild 将 `src/index.js` 作为入口文件，打包输出到 `dist/bundle.js`，并且启用了代码压缩和源映射。

要安装 Esbuild，可以使用 npm：

```bash
npm install esbuild --save-dev
```

然后可以通过运行以下命令来执行构建：

```bash
node esbuild.config.js
```

Esbuild 是一个非常强大的工具，适合需要快速构建和优化前端代码的开发者。

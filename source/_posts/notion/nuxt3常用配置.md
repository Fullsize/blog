---
title: nuxt3常用配置
date: 2025-05-22 16:07
description: 看官方文档即可
tags:
  - 扩展
categories:
  - vue
notion_id: 1fb841bd-614d-8017-b570-f24be0f0e2a1
---

## 去掉console

### 安装插件：

```javascript
npm install vite-plugin-remove-console --save-dev
```

### 配置 `nuxt.config.ts`：

```typescript
import removeConsole from 'vite-plugin-remove-console'

export default defineNuxtConfig({
  vite: {
    plugins: [
      removeConsole() // 默认移除所有 console
    ]
  }
})

```

如果你只想在生产环境去除，可以这样配置：

```typescript
import removeConsole from 'vite-plugin-remove-console'

export default defineNuxtConfig({
  vite: {
    plugins: process.env.NODE_ENV === 'production' ? [removeConsole()] : []
  }
})


```

## ssg(静态生成)

### 1.通过配置

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: [
        '/',               // 首页
        '/about',          // 静态路由
        '/blog/hello-nuxt' // 动态页面
      ]
    }
  }
})

```

### 2.API 调用

```typescript
export default defineNuxtConfig({
  nitro: {
    prerender: {
      routes: async () => {
        const res = await fetch('https://api.example.com/posts')
        const posts = await res.json()
        return posts.map((post: any) => `/blog/${post.slug}`)
      }
    }
  }
})

```

### 3.页面目录结构控制生成页面

- 所有在 `pages/` 目录下有静态路径的页面都会默认生成。

- 动态路径（如 `[slug].vue`）不会自动生成，除非你显式列出所有路由（见上方的方式 1 和 2）。

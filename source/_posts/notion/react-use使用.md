---
title: React.use使用
date: 2025-10-10 10:43
description: react19 react.use的作用
tags:
  - 基础
categories:
  - react
notion_id: 288841bd-614d-80d8-8706-f0a5077c945f
---

`React.use()` 是 React 19 引入的新 API，**作用是直接在组件渲染期间“解包 Promise 或上下文资源”**，从而让组件可以同步地使用异步数据。

## 1. 解包 Promise（最常见用法）

```javascript
import React from "react";

export default function Page({ params }: { params: Promise<{ locale: string }> }) {
  // ✅ React.use 直接解包 Promise
  const awaitedParams = React.use(params);
  const locale = awaitedParams.locale;

  return <div>{locale}</div>;
}

```

## 2. 与 Suspense 配合

```javascript
import React from "react";
const fetchUser = () => fetch("/api/user").then((res) => res.json());
export default function UserPage() {
  const user = React.use(fetchUser());
  return <div>Hello, {user.name}</div>;
}
```

外部包一层 `<Suspense>`，在数据加载时不会卡页面👇

```javascript
import { Suspense } from "react";
import UserPage from "./UserPage";

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserPage />
    </Suspense>
  );
}

```

## 🧭 总结一下 `React.use()` 的作用：

👉 简单记法：

> React.use() = 渲染时“等待”Promise + Suspense 自动处理加载状态。

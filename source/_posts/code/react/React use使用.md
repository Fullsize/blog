---
title: React use使用
date: 2025-10-10 10:43
tags:
  - react
categories:
  - 技术
  - 学习
---

# React.use 使用

`React.use()` 是 React 19 引入的新 API，**作用是直接在组件渲染期间“解包 Promise 或上下文资源”**，从而让组件可以同步地使用异步数据。

## 1. 解包 Promise（最常见用法）

```jsx
import React from "react";

export default function Page({
  params,
}: {
  params: Promise<{ locale: string }>,
}) {
  // ✅ React.use 直接解包 Promise
  const awaitedParams = React.use(params);
  const locale = awaitedParams.locale;

  return <div>{locale}</div>;
}
```

## 2. 与 Suspense 配合

```jsx
import React from "react";
const fetchUser = () => fetch("/api/user").then((res) => res.json());
export default function UserPage() {
  const user = React.use(fetchUser());
  return <div>Hello, {user.name}</div>;
}
```

外部包一层 `<Suspense>`，在数据加载时不会卡页面 👇

```jsx
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

| 功能                      | 描述                                        |
| ------------------------- | ------------------------------------------- |
| 解包 Promise              | 可以同步拿到异步请求的结果（例如 `params`） |
| 替代 useEffect+useState   | 减少样板代码，代码更直观                    |
| 与 Suspense 协同          | 异步加载时不会阻塞页面                      |
| 支持 Server & Client 组件 | 更灵活地获取数据                            |

👉 简单记法：

> React.use() = 渲染时“等待”Promise + Suspense 自动处理加载状态。

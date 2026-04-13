---
title: react异步组件
date: 2021-08-30 17:06
description: 懒加载
tags:
  - react
categories:
  - [react]
notion_id: 1b55ec4a-8944-458f-a1e4-3e994b66ba14
---

在React中，异步组件通常指的是使用动态 **`import()`** 函数来异步加载组件。这在 React 中是一种常见的技术，特别是在大型应用程序中，以便优化加载时间和性能。

以下是一个简单的例子，演示如何在 React 中使用异步组件：

```javascript
import React, { Suspense } from 'react';

// 异步加载组件
const AsyncComponent = React.lazy(() => import('./AsyncComponent'));

function App() {
  return (
    <div>
      <h1>异步组件示例</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <AsyncComponent />
      </Suspense>
    </div>
  );
}

export default App;

```

在上面的示例中，**`AsyncComponent`** 是一个异步组件，它通过 **`React.lazy()`** 函数进行加载。**`Suspense`** 组件用于在异步组件加载完成之前显示一个 loading 界面。一旦异步组件加载完成，它将被渲染到 DOM 中。

异步组件的懒加载可以帮助减少初始加载时间，只有在需要时才加载相应的组件。这在大型应用程序中特别有用，可以提高性能并降低内存占用。

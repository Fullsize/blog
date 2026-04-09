---
title: "web woker 的封装使用（基于comlink）"
date: 2025-09-24 14:37
description: web worker的异步应用
tags:
  - 思考
categories:
  - javascript
notion_id: 278841bd-614d-808d-b3a8-c32d25b2320e
---

因为工作工程中需要处理大数据量数据，导致主线程被卡住，页面长时间无响应，导致体验不好，所以使用web worker开多线程处理数据；但是原生的web worker使用过于繁琐，读取困难，使用了google开源的comlink库，基于Promise的web worker封装，使用简单，易读。

## 使用comlink库

```javascript
npm install comlink
```

## 创建 Worker 文件

假设文件名 `request.worker.js`：

```javascript
import * as Comlink from "comlink";

// 这里是封装的请求函数
const api = {
  async get(url, options = {}) {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },

  async post(url, body, options = {}) {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...(options.headers || {}) },
      body: JSON.stringify(body),
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    return res.json();
  },
};

// 暴露到主线程
Comlink.expose(api);

```

## 主线程调用

```javascript
import * as Comlink from "comlink";
import RequestWorker from "./request.worker.js?worker"; // Vite/webpack 需要 ?worker

async function main() {
  // 创建 Worker 并包装
  const workerApi = Comlink.wrap(new RequestWorker());

  try {
    const data = await workerApi.get("https://jsonplaceholder.typicode.com/todos/1");
    console.log("Worker 请求结果:", data);

    const postData = await workerApi.post("https://jsonplaceholder.typicode.com/posts", {
      title: "foo",
      body: "bar",
      userId: 1,
    });
    console.log("Worker POST 结果:", postData);
  } catch (err) {
    console.error("请求出错:", err);
  }
}

main();

```

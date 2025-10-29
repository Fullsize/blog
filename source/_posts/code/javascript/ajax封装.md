---
title: ajax 封装
date: 2025-03-27 21:45
tags:
  - ajax
categories:
  - 基础
---

# ajax 封装

一个完整的 **AJAX（Asynchronous JavaScript and XML）** 请求通常涉及以下几个步骤：

1. **创建 `XMLHttpRequest` 对象**
2. **配置请求方法和 URL**
3. **设置请求头（可选）**
4. **监听 `readystatechange` 事件或 `onload` 事件**
5. **发送请求**
6. **处理服务器响应**

---

## 完整示例

```jsx
function ajaxRequest(method, url, data = null, callback) {
  // 1. 创建 XMLHttpRequest 对象
  const xhr = new XMLHttpRequest();

  // 2. 配置请求 (GET 或 POST)
  xhr.open(method, url, true);

  // 3. 设置请求头（如果是 POST 请求，需要设置 Content-Type）
  if (method === "POST" && data) {
    xhr.setRequestHeader("Content-Type", "application/json");
  }

  // 4. 监听请求状态变化
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      // 请求完成
      if (xhr.status >= 200 && xhr.status < 300) {
        // 解析 JSON 响应
        const response = JSON.parse(xhr.responseText);
        callback(null, response);
      } else {
        callback(`Error: ${xhr.status} ${xhr.statusText}`, null);
      }
    }
  };

  // 5. 发送请求
  if (method === "POST" && data) {
    xhr.send(JSON.stringify(data));
  } else {
    xhr.send();
  }
}

// **调用示例**
// GET 请求
ajaxRequest(
  "GET",
  "https://jsonplaceholder.typicode.com/posts/1",
  null,
  function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("GET Response:", data);
    }
  }
);

// POST 请求
ajaxRequest(
  "POST",
  "https://jsonplaceholder.typicode.com/posts",
  { title: "AJAX Test", body: "This is a test", userId: 1 },
  function (err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log("POST Response:", data);
    }
  }
);
```

### **解释**

1. `XMLHttpRequest` 是用于发送 HTTP 请求的 JavaScript 对象。
2. `xhr.open(method, url, async)` 配置请求：
   - `method`: `GET` 或 `POST`
   - `url`: 请求地址
   - `async`: 是否异步（一般为 `true`）
3. `xhr.setRequestHeader` 设置 HTTP 头（POST 请求时需要 `Content-Type`）
4. `xhr.onreadystatechange` 监听状态变化，`readyState === 4` 表示请求完成。
5. `xhr.status` 检测 HTTP 状态码：
   - **200~299** 说明请求成功
   - 其他状态表示错误，如 **404（未找到）**，**500（服务器错误）** 等
6. `xhr.send(data)` 发送数据：
   - `GET` 请求时，`data` 为空
   - `POST` 请求时，需要 `JSON.stringify(data)`

### **AJAX 请求状态 (`readyState`)**

| 值  | 状态             | 说明                                     |
| --- | ---------------- | ---------------------------------------- |
| 0   | UNSENT           | XMLHttpRequest 已创建，但未调用 `open()` |
| 1   | OPENED           | `open()` 方法已调用                      |
| 2   | HEADERS_RECEIVED | 服务器已返回 HTTP 头信息                 |
| 3   | LOADING          | 数据正在下载                             |
| 4   | DONE             | 请求完成，数据传输结束                   |

---
title: ajax封装
date: 2025-03-27 21:45
description: 完整的ajax请求和封装
tags:
  - http
categories:
  - [http]
notion_id: 1c3841bd-614d-80cf-9774-ea201f10626d
---

一个完整的 **AJAX（Asynchronous JavaScript and XML）** 请求通常涉及以下几个步骤：

1. **创建 ****`XMLHttpRequest`**** 对象**

1. **配置请求方法和 URL**

1. **设置请求头（可选）**

1. **监听 ****`readystatechange`**** 事件或 ****`onload`**** 事件**

1. **发送请求**

1. **处理服务器响应**

---

## 完整示例

```javascript
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

1. `xhr.open(method, url, async)` 配置请求：

  - `method`: `GET` 或 `POST`

  - `url`: 请求地址

  - `async`: 是否异步（一般为 `true`）

1. `xhr.setRequestHeader` 设置 HTTP 头（POST 请求时需要 `Content-Type`）

1. `xhr.onreadystatechange` 监听状态变化，`readyState === 4` 表示请求完成。

1. `xhr.status` 检测 HTTP 状态码：

  - **200~299** 说明请求成功

  - 其他状态表示错误，如 **404（未找到）**，**500（服务器错误）** 等

1. `xhr.send(data)` 发送数据：

  - `GET` 请求时，`data` 为空

  - `POST` 请求时，需要 `JSON.stringify(data)`

### **AJAX 请求状态 (****`readyState`****)**

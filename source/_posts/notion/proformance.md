---
title: proformance
date: 2025-04-02 14:22
description: 使用这个api完成性能优化和性能监听
tags:
  - javascript
categories:
  - javascript
notion_id: 1c9841bd-614d-80a6-9de7-c75dddc8b5f8
---

### **Performance API 介绍**

Performance API 是浏览器提供的 **高精度性能监控接口**，用于测量网页和应用的性能，包括 **页面加载时间、资源加载情况、JavaScript 执行时间** 等。

Performance API 主要用于：

- **分析页面加载时间**（如 `performance.timing`）

- **监测资源加载情况**（如 `performance.getEntriesByType('resource')`）

- **测量代码执行耗时**（如 `performance.now()`）

- **创建自定义性能指标**（如 `PerformanceObserver`）

## **Performance API 主要功能**

### 1. **`performance.now()`**（高精度时间戳）

返回**当前时间戳（相对于页面加载）**，单位是 **毫秒（ms）**，精确到**微秒（小数点后三位）**。

```javascript

const start = performance.now();
// 运行某些代码
const end = performance.now();
console.log(`代码执行耗时: ${end - start}ms`);


```

> 适用于测量函数执行时间，比 Date.now() 精度更高。

### 2. **`performance.timing`****（页面加载时间分析）**

**`performance.timing`****（已废弃，推荐 ****`PerformanceNavigationTiming`****）** 记录页面从加载到完成的各个关键时间点。

```javascript
console.log(performance.timing);
```

重要字段：

- `navigationStart`：导航开始时间（用户点击链接或地址栏输入 URL 的时间）

- `responseStart`：服务器开始响应时间

- `responseEnd`：服务器响应完成时间

- `domContentLoadedEventEnd`：DOM 加载完成时间

- `loadEventEnd`：页面完全加载完成时间

### **计算页面关键时间**

```javascript
const timing = performance.timing;
console.log(`DNS 查询时间: ${timing.domainLookupEnd - timing.domainLookupStart}ms`);
console.log(`TCP 连接时间: ${timing.connectEnd - timing.connectStart}ms`);
console.log(`HTTP 请求时间: ${timing.responseEnd - timing.requestStart}ms`);
console.log(`白屏时间（FP）: ${timing.responseStart - timing.navigationStart}ms`);
console.log(`DOMContentLoaded 时间: ${timing.domContentLoadedEventEnd - timing.navigationStart}ms`);
console.log(`页面完全加载时间: ${timing.loadEventEnd - timing.navigationStart}ms`);


```

---

### 3. **`performance.getEntriesByType()`****（资源加载时间）**

获取所有资源（如 CSS、JS、图片）的加载情况。

```javascript
const resources = performance.getEntriesByType('resource');
resources.forEach(resource => {
  console.log(`资源: ${resource.name}`);
  console.log(`加载时间: ${resource.responseEnd - resource.startTime}ms`);
});


```

> 可以用于分析页面卡顿、慢加载资源。

---

### 4. **`PerformanceObserver`****（监听性能事件）**

`PerformanceObserver` 可以**监听**某些性能事件（如 `longtask`、`paint`）。

```javascript
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach(entry => {
    console.log('发生长任务:', entry);
  });
});
observer.observe({ entryTypes: ['longtask'] });


```

> 适用于监控长任务（如主线程阻塞）。

---

## **Performance API 适用场景**

- **优化页面加载速度**

- **监测用户交互体验**

- **分析 JavaScript 代码执行性能**

- **查找性能瓶颈**

## 可以从开发者工具查看

![](/images/notion/proformance/1.png)

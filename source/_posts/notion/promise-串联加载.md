---
title: Promise 串联加载
date: 2021-04-16 15:14
description: promise的链式调用
tags:
  - 重点
categories:
  - es6
  - javascript
notion_id: e206067e-b0db-4356-91e0-ae9af35b0667
---

promise每次执行后,都会返回promise对象.因此可以实现链式调用

```javascript
(promise D, (promise C, (promise B, (promise A) ) ) )
```

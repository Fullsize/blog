---
title: shouldComponentUpdate是做什么的
date: 2020-12-08 21:32
description: 性能优化函数
tags:
  - react
categories:
  - [react]
notion_id: 5795ef76-8080-4b4a-b922-3aebee686842
---

shouldComponentUpdate 这个方法用来判断是否需要调用render方法重新绘制dom

因为DOM的描绘非常消耗性能，如果我们能在shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能

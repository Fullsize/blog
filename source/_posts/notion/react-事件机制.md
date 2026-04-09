---
title: react 事件机制
date: 2020-12-08 21:05
description: react事件是合成事件
tags:
  - 重点
  - 思考
categories:
  - react
notion_id: 4b0a46c9-92fd-4ff3-b6af-14019363b49a
---

react基于vitrual dom(虚拟dom)实现了syntheicEvent(合成事件),react的事件接受器

收到一个实现了syntheicEvent对象,syntheicEvent(合成事件)和原生浏览器事件一样拥有同样的接口,支持事件冒泡机制,可以通过stopPropgation和preventDefault中断.

## 机制

react的事件机制利用了事件委托机制.事件并没有绑定在真实的dom节点上,而是把事件都绑定在结构的最外层document,使用一个统一的事件监听器.所有事件都由这个监听器统一分发.

---

## 优点

- 减少内存消耗,提升性能,一种事件类型只在document上注册一次

- 对每种类型的事件,拥有统一的分发函数dispathEvebt

- 事件对象是合成对象,不是原生,具有跨浏览器兼容的特性

## 同原生事件的区别

- React并不是将事件直接绑定在dom上面，而是采用**事件冒泡**的形式冒泡到document上面，然后React将事件封装给正式的函数处理运行和处理。

- 命名规范不同,react事件属性名是驼峰命名形式

## 推荐文章

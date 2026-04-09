---
title: react setState
date: 2020-12-08 21:27
description: setState的原理和执行
tags:
  - react
categories:
  - react
notion_id: 9878e23f-c037-4edc-83dd-943fac575f5d
---

## 调用setState之后发生了什么?

当调用setState后，新的 state 并没有马上生效渲染组件，而是，先看执行流中有没有在批量更新中

如果有，push到存入到dirtyeComponent中，如果没有，则遍历dirty中的component，调用updateComponent,进行state或props的更新

然后更新UI，react进行diff运算，与上一次的虚拟DOM相比较，进行有效的渲染更新组件

## setState 何时同步何时异步？

- setState 只在合成事件（react为了解决跨平台，兼容性问题，自己封装了一套事件机制，代理了原生的事件，像在jsx中常见的onClick、onChange这些都是合成事件）和钩子函数（生命周期）中是“异步”的，在原生事件和 setTimeout 中都是同步的

- setState的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 setState(partialState, callback) 中的callback拿到更新后的结果

- setState 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和setTimeout 中不会批量更新，在“异步”中如果对同一个值进行多次 setState ， setState 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 setState 多个不同的值，在更新时会对其进行合并批量更新

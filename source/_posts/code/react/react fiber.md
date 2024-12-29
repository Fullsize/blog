---
title: react fiber
date: 2020-12-01
tags:
  - javascript
  - react
  - 基础
categories:
  - 技术
  - 学习
---

## 原因

是大量的同步计算任务阻塞了浏览器的 ui 渲染，默认情况下，js 运算，页面布局和页面绘制都是运行在浏览器的主进程中，他们是互斥的关系。如果 js 运算长时间占用主线程，页面就无法得到及时的更新。当我们调用`setState`更新页面的时候，react 回遍历应用的所有节点，计算出差异，然后更新 UI。整个过程是一气呵成，不能被打断。如果页面元素过多，就容易出现掉帧的现象。

## 解决

解决主线程一直被 js 运算占用这一问题的基本思路，将运算分割为多步骤，分批完成。也就是完成一部分任务之后，将控制权就给浏览器，让浏览器有时间进行页面渲染。等浏览器完成之后，再继续之前未完成的任务

## 原理

react 框架内部的运作可以为分为三层

- Virtual DOM 层 结构层(描述页面长什么样)，js 结构层
- Reconciler 层 负责调用组件生命周期方法，进行 DIff 等 调度阶段
- Renderer 层 渲染层 比较常见的就是`ReactDom`和`ReactNative`

react 团队重写了 Reconciler 层，即组件生命周期和 diff 算法，react 团队命名为`fiber Reconciler`，建立了自己的组件调用栈，让 diff 计算可打断。

Fiber 其实实指的一种数据结构，它可以用一个纯 js 对象来表示:

```jsx
const fiber={
	stateNode, // 节点实例
	child,     // 子节点
	sibing,    // 兄弟节点
	return    // 父节点
}
```

为了区分，以前的 Reconiler 被命名为`Stack Reconiler` 。Stack Reconciler 运作的过程是不能被打断的，必须一条道走到黑：
![示例1.png](https://segmentfault.com/img/bVboIrF?w=1556&h=602)
而 Fiber Reconiler 每执行一段时间，就会将控制权交回浏览器，可以分端执行：

![示例2.png](https://segmentfault.com/img/bVboJj4?w=1472&h=578)

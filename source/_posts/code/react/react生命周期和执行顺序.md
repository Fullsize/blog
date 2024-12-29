---
title: react生命周期和执行顺序
date: 2020-12-01
tags:
  - javascript
  - react
  - 基础
categories:
  - 技术
  - 学习
---

![周期.png](/images/react/zhouqi.jpeg)

## 挂载和销毁阶段

### constructor()

constructor()中完成了 react 数据的初始化,它接受两个参数:props 和 content

### componentWillMount()

在渲染前调用,在客户端也在服务端。它代表的过程是组件已经经历了 constructor()初始化数据后，但是还未渲染 DOM 时。

### componentDidMount()

组件第一次渲染完成,此时 dom 节点已经生成

### componentWillUnmount()

组件卸载和数据的销毁

## 更新阶段

### componentWillReceiveProps(nextProps)

在接受父组件改变后的 props 需要重新渲染组件时用的比较多

接受一个参数 nextProps;

通过对比 nextProps 和 this.props,将 nextProps 的 state 为组件的 state,从而重新渲染组件

### componentWillUpdate(nextProps,nextState)

组件进入重新渲染的流程,这里同样能拿到 nextProps 和 nextState

### componentDidUpdate(prevProps,PrevState)

组件更新完毕后,react 只会在第一次初始化成功会进入 componentDidMount(),之后每次渲染都会进入这个生命周期

## 新增生命周期

### getDerivcedStateFromProps(nextProps,nextState)

代替 componentWillProps(),就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

### getSnapshotBeforeUpdate(prevProps,PrevState)

代替 componentWillUpdate()

componentDidUpdate()和 componentWillUpdate()中读取的 dom 元素状态不是安全的,因为这个值很可能失效了

getSnapshotBeforeUpdate 会在最终的 render 前调用,也就是是说在 getSnapshotBeforeUpdate 中读取的 dom 元素状态和 componentDidUpdate 是一致的

此生命周期返回的任何值都将作为参数传递给 componentDidUpdate

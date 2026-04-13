---
title: react生命周期和执行顺序
date: 2020-12-01 20:54
description: 基础
tags:
  - react
categories:
  - [react]
notion_id: afda562a-d523-499c-b4ca-a9df6a0bb187
---

![](/images/notion/react生命周期和执行顺序/1.jpg)

## 挂载和销毁阶段

### constructor()

constructor()中完成了 react数据的初始化,它接受两个参数:props和content

### componentWillMount()

在渲染前调用,在客户端也在服务端。它代表的过程是组件已经经历了constructor()初始化数据后，但是还未渲染DOM时。

### componentDidMount()

组件第一次渲染完成,此时dom节点已经生成

### componentWillUnmount()

组件卸载和数据的销毁

## 更新阶段

### componentWillReceiveProps(nextProps)

在接受父组件改变后的props需要重新渲染组件时用的比较多

接受一个参数nextProps;

通过对比nextProps和this.props,将nextProps的state为组件的state,从而重新渲染组件

### componentWillUpdate(nextProps,nextState)

组件进入重新渲染的流程,这里同样能拿到nextProps和nextState

### componentDidUpdate(prevProps,PrevState)

组件更新完毕后,react只会在第一次初始化成功会进入componentDidMount(),之后每次渲染都会进入这个生命周期

## 新增生命周期

### getDerivcedStateFromProps(nextProps,nextState)

代替componentWillProps(),就是在根据当前的 props 来更新组件的 state，而不是去做其他一些让组件自身状态变得更加不可预测的事情。

### getSnapshotBeforeUpdate(prevProps,PrevState)

代替componentWillUpdate()

componentDidUpdate()和componentWillUpdate()中读取的dom元素状态不是安全的,因为这个值很可能失效了

getSnapshotBeforeUpdate会在最终的render前调用,也就是是说在getSnapshotBeforeUpdate中读取的dom元素状态和componentDidUpdate是一致的

此生命周期返回的任何值都将作为参数传递给componentDidUpdate

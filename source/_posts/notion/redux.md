---
title: redux
date: 2020-12-09 21:46
description: "react 原则，工作流程"
tags:
  - react
categories:
  - react
notion_id: fb05899f-1dea-415c-9a11-bc9a3ed0e437
---

redux 是一个应用数据流框架，主要是解决了组件间状态共享的问题，原理是集中式管理，主要有三个核心方法，action，store，reducer

## 三大原则

- 唯一数据源(整个应用的 state 被储存在一棵 object tree 中，并且这个 object tree 只存在于唯一一个 store 中)

- reducer必须是纯函数（输入必须对应着唯一的输出）

- State 是只读的, 想要更改必须经过派发action

## 工作流程

使用通过reducer创建出来的Store发起一个Action，reducer会执行相应的更新state的方法，当state更新之后，view会根据state做出相应的变化

- 提供getState()获取到state

- 通过dispatch(action)发起action更新state

- 通过subscribe()注册监听器

## 数据流通的过程

- 用户操作视图

- 发起一次dispatch。有异步：返回一个函数（使用thunk中间件），没有异步：return {}

- 进入reducer,通过对应的type去修改state,最后返回一个新的state

## 缺点

- 向事件池中追加方法时，没有做去重处理

- 把绑定的方从在事件池中移除掉时，用的是arr.splice(index,1)，这样可能会引起数组塌陷

- reducer中state，每次返回都需要深克隆，可以在redux中获取状态信息时，深克隆，这样就不用在reducer里深克隆了

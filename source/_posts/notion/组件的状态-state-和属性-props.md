---
title: "组件的状态(state)和属性(props)"
date: 2020-12-09 21:32
description: state和props的区别
tags:
  - 基础
categories:
  - react
notion_id: c5db0250-8b74-42e7-8a88-b4c8d0fd0b07
---

State 是一种数据结构，用于组件挂载时所需数据的默认值。State 可能会随着时间的推移而发生突变，但多数时候是作为用户事件行为的结果

Props(properties 的简写)则是组件的配置。props 由父组件传递给子组件，并且就子组件而言，props 是不可变的

组件不能改变自身的 props，但是可以把其子组件的 props 放在一起(统一管理)

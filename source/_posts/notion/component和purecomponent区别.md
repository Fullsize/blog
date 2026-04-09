---
title: component和pureComponent区别
date: 2020-12-08 21:57
description: 是否会浅对比state或props
tags:
  - react
categories:
  - react
notion_id: 43157548-aa75-4254-888f-53aeb8d0cc95
---

PureComponent自带通过props和state的浅对比来实现 shouldComponentUpate()，而Component没有

比于Component，PureCompoent的性能表现将会更好

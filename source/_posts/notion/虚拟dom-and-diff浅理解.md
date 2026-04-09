---
title: 虚拟DOM and DIFF浅理解
date: 2021-12-09 18:15
description: 虚拟dom
tags:
  - javascript
categories:
  - javascript
notion_id: 05827c99-d174-410a-8c17-db1406271260
---

虚拟DOM（Virtual DOM）和DOM Diff是React中重要的概念，它们一起工作以实现高效的UI更新。

1. **虚拟DOM（Virtual DOM）**：

  - 虚拟DOM是一个轻量级的JavaScript对象树，它对应着真实的DOM结构。

  - 在React中，每个React元素都对应着虚拟DOM中的一个节点，这些节点包含有关元素的类型、属性和子元素等信息。

  - React使用虚拟DOM来表示页面的当前状态，并且在每次数据更新时，会基于新的数据重新构建虚拟DOM树。

1. **DOM Diff（DOM Diffing）**：

  - DOM Diff是指在更新虚拟DOM时，React通过比较新旧虚拟DOM树的差异，并将差异应用到实际的DOM上，以尽可能地减少DOM操作次数，提高性能。

  - React使用一种称为“协调（Reconciliation）”的算法来进行DOM Diff。该算法会遍历新旧虚拟DOM树的节点，找出变化的部分，并生成一组DOM操作指令。

  - React的协调算法具有以下特点：

    - 高效：React会尽可能地复用已有的DOM节点，避免不必要的重新渲染。

    - 一致性：React保证UI与数据同步，确保每次更新都能正确地反映数据的变化。

    - 可预测性：由于React的更新是基于数据的变化而触发的，因此更新过程是可预测的，有助于减少意外错误。

虚拟DOM和DOM Diff是React实现高效UI更新的关键技术之一。通过使用虚拟DOM，React能够将UI的状态保存在内存中，减少了直接操作DOM所带来的性能开销。而DOM Diff则确保了在更新UI时只进行必要的DOM操作，从而提高了页面的响应速度和性能表现。

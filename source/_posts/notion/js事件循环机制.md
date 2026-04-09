---
title: JS事件循环机制
date: 2021-04-13 11:55
description: event loop
tags:
  - 重点
categories:
  - javascript
notion_id: 17a2d14c-15e9-40c3-aa0b-7e5ee233136a
---

JavaScript的事件循环（Event Loop）是JavaScript执行模型的核心部分，它决定了代码的执行顺序和事件处理的机制。事件循环使得JavaScript能够处理异步操作，例如定时器、网络请求和事件监听等。

事件循环的基本原理如下：

1. **执行栈（Execution Stack）**：JavaScript代码的执行过程中，会形成一个执行栈。当函数被调用时，会将其放入执行栈中执行，执行完成后则从栈中弹出。

1. **任务队列（Task Queue）**：除了执行栈外，JavaScript还有一个任务队列。异步任务完成后，会被放入任务队列中。

1. **事件循环（Event Loop）**：事件循环是一个持续的过程，它不断地从任务队列中取出任务，放入执行栈中执行。当执行栈为空时，事件循环会检查任务队列是否有任务，如果有，则将任务取出执行，否则会继续等待。

1. **微任务队列（Microtask Queue）**：在任务队列中，还有一个特殊的队列叫做微任务队列。微任务会在每个宏任务执行完毕后立即执行，确保它们在下一个宏任务开始之前执行完毕。

基于以上原理，JavaScript的事件循环可以描述为：

- 从执行栈开始执行代码。

- 遇到异步任务时，将其放入任务队列中。

- 执行栈为空时，从任务队列中取出任务执行，直到任务队列为空。

- 微任务队列中的任务会在宏任务执行完毕后立即执行。

这种机制保证了JavaScript的单线程执行，同时能够处理异步操作，保持了代码的响应性和流畅性。

```javascript
console.log('1');

		setTimeout(function () {
			console.log('2');
			process.nextTick(function () {
				console.log('3');
			})
			new Promise(function (resolve) {
				console.log('4');
				resolve();
			}).then(function () {
				console.log('5')
			})
		})
		process.nextTick(function () {
			console.log('6');
		})
		new Promise(function (resolve) {
			console.log('7');
			resolve();
		}).then(function () {
			console.log('8')
		})

		setTimeout(function () {
			console.log('9');
			process.nextTick(function () {
				console.log('10');
			})
			new Promise(function (resolve) {
				console.log('11');
				resolve();
			}).then(function () {
				console.log('12')
			})
		})
```

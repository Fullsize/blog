---
title: Promise并联加载
date: 2021-04-16 15:20
description: promise的并发请求
tags:
  - 重点
categories:
  - es6
  - javascript
notion_id: 53eb2d5d-1ea1-458a-8644-b7f29beac603
---

## 1.Promise.all()

但有弊端,并联请求如果你的promises数组中每个对象都是http请求，或者说每个对象包含了复杂的调用处理。而这样的对象有几十万个。

那么会出现的情况是，你在瞬间发出几十万http请求（tcp连接数不足可能造成等待），或者堆积了无数调用栈导致内存溢出。

## 递归

```javascript
function asyncPool(limit, array, callback) {
			let i = 0;
			let ret = []
			let executing = [];
			const enqueue = () => {
				if (i === array.length) {
					return Promise.resolve();
				}
				// 获取arr的其中一项
				const item = array[i++];
				// 初始化promise
				const p = Promise.resolve().then(() => callback?.(item, array))
				// 放入promises数组
				ret.push(p);
				// promise执行完毕，从executing数组中删除
				const e = p.then(() => executing.splice(executing.indexOf(e), 1));
				// 插入executing数字，表示正在执行的promise
				executing.push(e);
				// 使用Promise.rece，每当executing数组中promise数量低于limit，就实例化新的promise并执行
				let r = Promise.resolve();
				if (executing.length >= limit) {
					r = Promise.race(executing);
				}
				return r.then(() => enqueue())
			}
			return enqueue().then(() => Promise.all(ret));
		}

		const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i))
		asyncPool(2, [1000, 5000, 3000, 2000], timeout).then((d) => {
			console.log(d)
		});
```

## 2.迭代器

```javascript
function* PromiseAll(arr = [], stop = 1) {
			const maxStop = Math.floor(arr.length / stop);
			let currentStop = 0;
			while (currentStop <= maxStop) {
				const newA = arr.slice(currentStop * stop, (currentStop * stop) + stop)
				currentStop++;
				yield Promise.all(newA)
			}
		}
		const b = PromiseAll([1, 2, 3, 4], 3)
		let result = b.next();
		while (!result.done) {
			result.value.then((data) => {
				console.log(data)
			})
			result = b.next()
		}
```

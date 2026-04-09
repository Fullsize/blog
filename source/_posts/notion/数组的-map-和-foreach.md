---
title: 数组的 map 和 forEach
date: 2021-04-14 11:24
description: "数组的 map 和 forEach 有什么区别？"
tags:
  - javascript
categories:
  - javascript
notion_id: cfac2203-5c82-4f43-ad91-04c6d9d7ee83
---

## map

```javascript
Array.prototype.map = function (callback) {
			var arr = [];
			for (var i = 0; i < this.length; i++) {
				arr[i] = callback(this[i], i,this)
			}
			return arr
		}
```

## forEach

```javascript
Array.prototype.forEach = function (callback, thisArg) {
			varlen = this.length;
			for (vari = 0; i < len; i++) {
				callback.call(thisArg, this[i], i, this);
			}
		}
```

## 相同点

- 都是循环遍历数组中的每一项

- this都是指向调用方法的数组

- 都只能操作数组

## 不同点

- map()通过每个元素的回调函数将其映射到新的元素上，最终返回一个新的数组；

- forEach()可以改变原数组,在每一次迭代的使用中都会产生副作用

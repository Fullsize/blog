---
title: 浅拷贝or深拷贝
date: 2021-04-13 18:00
description: "深,浅拷贝的区别和方法"
tags:
  - javascript
categories:
  - [javascript]
notion_id: e1a2a2da-2316-4652-9c84-bb40325caa5c
---

## 定义

**浅拷贝:**只复制一层对象，当对象的属性是引用类型时，实质上复制的是其引用，当引用指向的值发生变化的时候，原对象属性值也跟着变化，相互还是会受到影响;**浅复制是对对象地址的复制**

**深拷贝:**在拷贝的时候，创建新的对象，并把原对象所有属性都深拷贝被新对象，原属性如果是对象，也会重新创建新的对象并拷贝到新对象属性中，这样新旧对象，是相互对立的，互不影响，这个就是深拷贝;**深复制则是开辟新的栈**

## 浅拷贝

### Object.assign

```javascript
var obj = { a: 1, b: { c: 3 } }
		const obj2 = Object.assign({}, obj)
		obj.b.c = 5
		console.log(obj, obj2)
```

> 数据结构为一层时,为深拷贝,多层为浅拷贝

### slice

> 数据结构为一层时,为深拷贝,多层为浅拷贝

### concat

> 数据结构为一层时,为深拷贝,多层为浅拷贝

### 扩展运算符...

> 数据结构为一层时,为深拷贝,多层为浅拷贝

## 深拷贝

## JSON.parse(JSON.stringify(data))

> 可能就造成对象的循环引用使程序卡死，并且要经过两次转换，结构上难免显得冗余。

### 递归

```javascript
function copy(data) {
			let result = Array.isArray(data) ? [] : {}
			return fn(data, result)
			function fn(data, result) {
				Object.keys(data).forEach(k => {
					if (data.hasOwnProperty(k)) {
						let value = data[k]
						if (value && typeof value === 'object') {
							result[k] = Array.isArray(value) ? [] : {}
							return fn(value, result[k])
						} else {
							result[k] = value
						}
					}
				})
				return result
			}
		}
```

### lodash.cloneDeep()

```javascript
let sourceObj = {a: 1, b: {c: [1, 2, 3, 4], d: [11, 12, 13, 14]}}
let desObj = _.cloneDeep(sourceObj)
desObj.b.d.push(15, 16)

console.log(desObj)
// {a: 1, b: {c: [1, 2, 3, 4], d: [11, 12, 13, 14, 15, 16]}}
console.log(sourceObj)
// {a: 1, b: {c: [1, 2, 3, 4], d: [11, 12, 13, 14]}}
```

### 通过jQuery的extend方法实现深拷贝

```javascript
var array = [1,2,3,4];
var newArray = $.extend(true,[],array);
```

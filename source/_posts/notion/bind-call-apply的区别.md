---
title: "bind、call、apply的区别"
date: 2021-04-14 14:43
description: "bind、call、apply的区别"
tags:
  - javascript
categories:
  - javascript
notion_id: 4f838890-1735-4d7b-8fa5-0e6742e429b1
---

# **call、apply、bind都是改变this指向的方法**

**call与apply的唯一区别**

传给`func`的参数写法不同：

- apply是第2个参数，这个参数是一个类数组对象：传给`func`参数都写在数组中。

- call从第2~n的参数都是传给`func`的。

**call/apply与bind的区别**

**执行：**

- call/apply改变了函数的`this`的指向并马上**执行该函数**；

- bind则是返回改变了`this`指向后的函数，**不执行该函数**。

**返回值：**

- call/apply 返回`func`的执行结果；

- bind返回`func`的拷贝，并指定了`func`的`this`指向，保存了`func`的参数。

## call

call() 方法使用一个指定的 this 值和单独给出的一个或多个参数来调用一个函数。

```javascript
fn.call([this],[param]...)
```

### 非严格模式下

> 如果不传参数，或者第一个参数是null或nudefined，this都指向window

```javascript
let fn = function (a, b) {
			console.log(this, a, b);
		}
		let obj = { name: "obj" };
		fn.call(obj, 1, 2);    // this:obj    a:1         b:2
		fn.call(1, 2);        // this:1      a:2         b:undefined
		fn.call(obj, 1, 2);     // this:window a:undefined b:undefined
		fn.call(null);       // this=window a=undefined b=undefined
		fn.call(undefined);  // this=window a=undefined b=undefined
```

### 严格模式下

> 第一个参数是谁，this就指向谁，包括null和undefined，如果不传参数this就是undefined

```javascript
"use strict"
		let fn = function (a, b) {
			console.log(this, a, b);
		}
		let obj = { name: "obj" };
		fn.call(obj, 1, 2);   // this:obj        a:1          b:2
		fn.call(1, 2);       // this:1          a:2          b=undefined
		fn.call();          // this:undefined  a:undefined  b:undefined
		fn.call(null);      // this:null       a:undefined  b:undefined
		fn.call(undefined); // this:undefined  a:undefined  b:undefined
```

## apply

和call基本上一致，唯一区别在于传参方式

> apply把需要传递给fn的参数放到一个数组（或者类数组）中传递进去，虽然写的是一个数组，但是也相当于给fn一个个的传递

```javascript
let fn = function (a, b) {
			console.log(this, a, b);
		}
		let obj = { name: "obj" };
		fn.call(obj, 1, 2);
		fn.apply(obj, [1, 2,3]);
```

## bind

语法和call一模一样，区别在于立即执行还是等待执行(ps: 方法不会直接调用,只是改变了this指向)，bind不兼容IE6~8

```javascript
let fn = function (a, b) {
			console.log(this, a, b);
		}
		let obj = { name: "obj" };
		const bindA=fn.bind(obj, 1, 2); // 改变fn中的this，fn并不执行
		fn.call(obj, 1, 2); // 改变fn中的this，并且把fn立即执行
		bindA();
```

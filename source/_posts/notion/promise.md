---
title: Promise
date: 2021-04-15 17:56
description: 了解Promise
tags:
  - 重点
categories:
  - javascript
  - es6
notion_id: a00e416f-1a6d-4810-8c1a-260be62ed740
---

Promise 对象用于表示一个异步操作的最终完成 (或失败)及其结果值。

一个 `Promise` 对象代表一个在这个 promise 被创建出来时不一定已知的值。它让您能够把异步操作最终的成功返回值或者失败原因和相应的处理程序关联起来。 这样使得异步方法可以像同步方法那样返回值：异步方法并不会立即返回最终的值，而是会返回一个 promise，以便在未来某个时候把值交给使用者。

**Promise是一个状态机,只有pending(进行中),fulfilled(已完成),rejected(已拒绝)**

**Promise可以链式调用**

## 特点

- 对象的状态不受外界影响。

- 一旦从等待状态变成为其他状态就永远不能更改状态了。

- 一旦新建Promise就会立即执行，无法中途取消。

- 如果不设置回调函数callback，Promise内部抛出的错误，就不会反应到外部。

- 当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。

## 实例操作

![](/images/notion/promise/1.png)

## Promise实例

Promise 对象是由关键字 new 及其构造函数来创建的。该构造函数会把一个叫做“处理器函数”（executor function）的函数作为它的参数。这个“处理器函数”接受两个函数——resolve 和 reject ——作为其参数。当异步任务顺利完成且返回结果值时，会调用 resolve 函数；而当异步任务失败且返回失败原因（通常是一个错误对象）时，会调用reject 函数。

```javascript
let promise=new Promsie(function(resolve,rejec){
    if(/*异步执行成功*/){
        resolve(value);
    }else{
        reject(error);
    }
})
promise.then(function(){
    //回调执行成功之后的操作
},function(){
    //回调执行失败之后的操作，可选
});
```

## 构造函数原型的方法

### Promise.prototype.then(onFulfilled, onRejected)

添加解决(fulfillment)和拒绝(rejection)回调到当前 promise, 返回一个新的 promise, 将以回调的返回值来resolve.

```javascript
new Promise((resolve, reject) => {
			setTimeout(() => {
				const isSuccess = Math.round(Math.random());
				isSuccess ? resolve('success') : reject('failed')
			}, 500)
		}).then((val) => {
			console.log(val)
		}, (err) => {
			console.log(err)
		})
```

### Promise.prototype.catch(onRejected)

用于指定发生错误时的回调函数。 Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。

`Promise.catch()`方法返回的也是一个 Promise 对象，因此后面还可以接着调用then方法。

```javascript
new Promise((resolve, reject) => {
			setTimeout(() => {
				const isSuccess = Math.round(Math.random());
				isSuccess>2 ? resolve('success') : reject('failed')
			}, 500)
		}).catch((err)=>{
			console.log('发生错误',err)
		})
```

### Promise.prototype.finally(onFinally)

添加一个事件处理回调于当前promise对象，并且在原promise对象解析完毕后，返回一个新的promise对象。回调会在当前promise运行完毕后被调用，无论当前promise的状态是完成(fulfilled)还是失败(rejected)

```javascript
new Promise((resolve, reject) => {
			setTimeout(() => {
				const isSuccess = Math.round(Math.random());
				isSuccess ? resolve('success') : reject('failed')
			}, 500)
		}).then((val) => {
			console.log('成功---', val)
		}).catch((err) => {
			console.log('失败---', err)
		}).finally(() => {
			console.log('promise执行完毕')
		})
```

## Promise API

### Promise.all(iterable)

将多个promise实例，包装成一个新的promise实例。该promise对象在iterable参数对象里所有的promise对象都成功的时候才会触发成功，一旦有任何一个iterable里面的promise对象失败则立即触发该promise对象的失败。这个新的promise对象在触发成功状态以后，会把一个包含iterable里所有promise返回值的数组作为成功回调的返回值，顺序跟iterable的顺序保持一致；如果这个新的promise对象触发了失败状态，它会把iterable里第一个触发失败的promise对象的错误信息作为它的失败错误信息。Promise.all方法常被用于处理多个promise对象的状态集合。

**Promise.all()是异步解析,但是当且仅当传递的iterable为空时，Promise.all才会同步解析。**

```javascript
const p = Promise.all([]);
		console.log(p);
```

**全部成功:**

```javascript
const p1=new Promise((resolve)=>resolve(1))
		const p2=new Promise((resolve)=>resolve(2))
		Promise.all([p1,p2]).then((data)=>{
			console.log(data)
		}).catch((err)=>{
			console.log(err)
		})
```

**其中一个失败:**

```javascript
// 情况一
const p1 = new Promise((resolve, reject) => reject(1))
		const p2 = new Promise((resolve) => resolve(2))
		Promise.all([p1, p2]).then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log('失败',err)
		})
// 情况二
const p1 = new Promise((resolve, reject) => resolve(1))
		const p2 = new Promise((resolve, reject) => reject(2))
		const p3 = new Promise((resolve, reject) => resolve(3))
		Promise.all([p1, p2, p3]).then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log('失败', err)
		})
// 情况三
const p1 = new Promise((resolve, reject) => resolve(1))
		const p2 = new Promise((resolve, reject) => resolve(2))
		const p3 = new Promise((resolve, reject) => reject(3))
		Promise.all([p1, p2, p3]).then((data) => {
			console.log(data)
		}).catch((err) => {
			console.log('失败', err)
		})
```

> 以上结果可知all()方法,一个promisee的状态为rejected,将会直接rejected

**特殊情况:**

常规情况下，当其中一个实例返回rejected，就会调用Promise.all的catch方法，返回第一个错误。但实际应用时，我们想让所有的实例不论成功或失败就可以返回参数组成数组，这时就可以调用实例自身的catch方法来规避这种情况。

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello'); //resolved
}).then(result => result).catch(e => e);

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');//rejected
}).then(result => result).catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))// ["hello", Error: 报错了]
.catch(e => console.log(e));
```

### Promise.allSettled(iterable)(PS:兼容性不友好)

该方法和promise.all类似，就是**解决all方法在处理错误时的不合理而出现的**。其参数接受一个Promise的数组, 返回一个新的Promise, 唯一与all的不同在于, 其不会进行短路, 也就是说当Promise全部处理完成后我们可以拿到每个Promise的状态, 而不管其是否处理成功。

**当自身实例有catch回调时，每个实例状态变为fulfilled**

```javascript
const p3 = new Promise((resolve, reject) => {
			resolve('hello'); //resolved
		}).then(result => result).catch(e => e);

		const p4 = new Promise((resolve, reject) => {
			throw new Error('报错了');//rejected
		}).then(result => result).catch(e => e);

		Promise.allSettled([p3, p4])
			.then(result => console.log('成功', result))
			.catch(e => console.log('错误', e));
```

**没有catch接收错误，返回自身的状态和回调参数**

```javascript
const p3 = new Promise((resolve, reject) => {
			resolve('hello'); //resolved
		}).then(result => result)

		const p4 = new Promise((resolve, reject) => {
			throw new Error('报错了');//rejected
		}).then(result => result)

		Promise.allSettled([p3, p4])
			.then(result => console.log('成功', result))
			.catch(e => console.log('失败', e));
```

## Promise.race(iterable)

该方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例，其他特点和all很像，和all的区别在于：race方法好比是赛跑，几个实例一起跑，谁先到就成功了，就resolve谁，或者谁跑到中途摔了出现异常状况失败了，就reject谁，不论成功还是失败，就先捕获第一个完成的。(谁先走完,就resolve)

**成功:**

```javascript
const p1 = Promise.resolve('1')
		const p2 = Promise.resolve('2')
		Promise.race([p1, p2]).then(res => console.log(res))// '1'
```

**失败:**

```javascript
const p1 = Promise.reject("ERR1");
		const p2 = Promise.reject("ERR2");
		Promise.race([p1, p2]).catch(console.log) //Promise {<reject>: "ERR1"}
```

## Promise.any(iterable)

接收一个Promise对象的集合，当其中的一个 promise 成功，就返回那个成功的promise的值。

```javascript
const p1 = Promise.resolve("1");
		const p2 = Promise.reject("ERR2");
		const p3 = Promise.resolve(3)
		Promise.any([p1, p2, p3]).then(console.log)
```

## 函数拥有promise功能

想要某个函数拥有promise功能，只需让其返回一个promise即可。

```javascript
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
};
```

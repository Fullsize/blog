---
title: "ES6特性(后续特性)"
date: 2021-04-14 16:18
description: ES6常用特性
tags:
  - javascript
categories:
  - [javascript]
notion_id: 2c4cf4ec-9970-46a9-b11e-6c2519074dd0
---

## 1. 形参默认

```javascript
function sum(a, b = 0) {
			console.log(a,b)
		}
		sum(10) //不给b传惨 默认b等于0
```

## 2. 模板字符串

```javascript
const a = 10
		console.log(`a${a}`)
```

## 3. 解构赋值

```javascript
const arr=[1,2]
const [a,b]=arr;
console.log(a,b)
```

## 4. 箭头函数

```javascript
const fn=()=>{
	console.log('箭头函数')
}
```

## 5. 扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```javascript
console.log(...[1, 2, 3])
// 1 2 3

console.log(1, ...[2, 3, 4], 5)
// 1 2 3 4 5

[...document.querySelectorAll('div')]
```

## 6. 块级作用域

解决了变量提升问题

```javascript
const let ()=>{}

```

## 7. Set

成员的值都是唯一的，没有重复的值。

Set本身是一个构造函数，用来生成 Set 数据结构。

```javascript
[...new Set(array)]
const s = new Set();

[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

for (let i of s) {
  console.log(i);
}
```

> WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。
首先，WeakSet 的成员只能是对象，而不能是其他类型的值。其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

## 8.WeakSet 

WeakSet 结构与 Set 类似，也是不重复的值的集合。但是，它与 Set 有两个区别。

首先，WeakSet 的成员只能是对象，而不能是其他类型的值。

其次，WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

WeakSet 是一个构造函数，可以使用new命令，创建 WeakSet 数据结构。

```javascript
const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a);
```

## 9. Map

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构）

```javascript
const m = new Map();
const o = {p: 'Hello World'};

m.set(o, 'content')
m.get(o) // "content"

m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

## 10. WeakMap

WeakMap结构与Map结构类似，也是用于生成键值对的集合。

```javascript
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"
```

> WeakMap与Map的区别有两点。首先，WeakMap只接受对象作为键名（null除外），不接受其他类型的值作为键名。其次，WeakMap的键名所指向的对象，不计入垃圾回收机制。

## 11. for of

它结合了 forEach 的简洁性和中断循环的能力

```javascript
for(const v of [1,2,3]){
	console.log(v)
}
for (const [i, v] of ['a', 'b', 'c'].entries()) {
  console.log(i, v);
}
```

## 12. Promise

```javascript
new Promise(
  function (resolve, reject) {
    // 一段耗时的异步操作
    resolve('成功') // 数据处理完成
    // reject('失败') // 数据处理出错
  }
).then(
  (res) => {console.log(res)},  // 成功
  (err) => {console.log(err)} // 失败
)
```

## 13. class

```javascript
class Foo {
  static bar () {
    this.baz();
  }
  static baz () {
    console.log('hello');
  }
  baz () {
    console.log('world');
  }
}

Foo.bar(); // hello
```

## 14. 字面量增强写法

```javascript
const name = 'why';
const age = 18;
const height = 1.88

const obj = {
  name,
  age,
  height,
} //给obj添加name、age、height三个属性，值从同名变量找
```

## 15. 数组新增方法

### 1. keys()

keys() 方法返回一个包含数组中每个索引键的Array Iterator对象。

```javascript
let arr = [1, 2, 3];
		console.log(Object.keys(arr))
		console.log([...arr.keys()])
```

### 2. values() 

values() 方法返回一个新的 Array Iterator 对象，该对象包含数组每个索引的值

```javascript
let arr = [1, 2, 3];
		console.log(arr.values())
		console.log([...arr.values()])
```

### 3. includes() 

includes() 方法用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 true，否则返回false。

```javascript
let arr = [1, 2, 3];
		console.log(arr.includes(3)) // true
		console.log(arr.includes(4)) // false
```

### 4. entries()

entries() 方法返回一个新的Array Iterator对象，该对象包含数组中每个索引的键/值对。

```javascript
let arr = ['a', 'b', 'c'];
		const iterator1=arr.entries()
		console.log(iterator1.next().value) // [0,'a']
		console.log(iterator1)
```

### 5. findIndex()

findIndex()方法返回数组中满足提供的测试函数的**第一个元素的索引**。若没有找到对应元素则返回-1。

```javascript
let arr = [1, 2, 3];
		const isLargeNumber = (element) => element < 2;
		console.log(arr.findIndex(isLargeNumber))
```

## 16. optional-chaining(可选链操作符)

可选链操作符( ?. )允许读取位于连接对象链深处的属性的值，而不必明确验证链中的每个引用是否有效。?. 操作符的功能类似于 . 链式操作符，不同之处在于，在引用为空(nullish ) (null 或者 undefined) 的情况下不会引起错误，该表达式短路返回值是 undefined。与函数调用一起使用时，如果给定的函数不存在，则返回 undefined。

```javascript
const adventurer = {
			name: 'Alice',
			cat: {
				name: 'Dinah'
			}
		};
		const dogName = adventurer.dog?.name;
		console.log(dogName); // undefined
		console.log(adventurer.someNonExistentMethod?.()); // undefined
```

## 17. Logical OR assignment (||=)

逻辑OR赋值(x ||= y)运算符只有在x是假的情况下才会赋值。

```javascript
const a = { duration: 50, title: '' };

		a.duration ||= 10;
		console.log(a.duration); // 50
		a.title ||= 'title is empty.';
		console.log(a.title); // title is empty.
```

## 18. 空值合并运算符

空值合并操作符（??）是一个逻辑操作符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。

```javascript
const foo = null ?? 'default string';
console.log(foo);
// expected output: "default string"

const baz = 0 ?? 42;
console.log(baz);
// expected output: 0
```

## 数值

### 数值隔断符

欧美语言中，较长的数值允许每三位添加一个分隔符（通常是一个逗号），增加数值的可读性。比如，`1000`可以写作`1,000`。

[ES2021](https://github.com/tc39/proposal-numeric-separator)，允许 JavaScript 的数值使用下划线（`_`）作为分隔符。

```javascript
let budget = 1_000_000_000_000;
	budget === 10 ** 12 // true
	console.log(budget,budget === 10 ** 12)
```

这个数值分隔符没有指定间隔的位数，也就是说，可以每三位添加一个分隔符，也可以每一位、每两位、每四位添加一个。

```javascript
123_00 === 12_300 // true

12345_00 === 123_4500 // true
12345_00 === 1_234_500 // true
```

小数和科学计数法也可以使用数值分隔符。

```javascript
// 小数
0.000_001

// 科学计数法
1e10_000
```

其他进制的数值也可以使用分隔符。

```javascript
// 二进制
0b1010_0001_1000_0101
// 十六进制
0xA0_B0_C0
```

### Number.isFinite(), Number.isNaN()

`Number.isFinite()`用来检查一个数值是否为有限的（finite），即不是`Infinity`。

```javascript
	console.log(Number.isFinite(0))
	console.log(Number.isFinite(-0.232323))
	console.log(Number.isFinite(Number.EPSILON))
	console.log(Number.isFinite(Infinity))
	console.log(Number.isFinite('1'))
```

和全局的 [`isFinite()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isFinite) 函数相比，这个方法不会强制将一个非数值的参数转换成数值，这就意味着，只有数值类型的值，且是有穷的（finite），才返回 `true`。

 `Number.isNaN()`同`isNaN()`一样

> 注意，`Number.isFinite()`和`Number.isNaN()`都不回不会强制将一个非数值的参数转换成数值，这就意味着，非数值都将返回false

### Number.isInteger()

`Number.isInteger()` 方法用来判断给定的参数是否为整数。如果被检测的值是整数，则返回 `true`，否则返回 `false`。注意 [`NaN`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN) 和正负 [`Infinity`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Infinity) 不是整数。

```javascript
console.log(Number.isInteger(123))
	console.log(Number.isInteger(-0.232323))
	console.log(Number.isInteger(Number.EPSILON))
	console.log(Number.isInteger(Infinity))
	console.log(Number.isInteger('1'))
```

### Number.EPSILON

`Number.EPSILON` 属性表示 1 与[`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number)可表示的大于 1 的最小的浮点数之间的差值。

你不必创建一个 [`Number`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number) 对象来访问这个静态属性（直接使用 `Number.EPSILON`）。

`EPSILON` 属性的值接近于 `2.2204460492503130808472633361816E-16`，或者 `252。`

`Number.EPSILON`实际上是 JavaScript 能够表示的最小精度。误差如果小于这个值，就可以认为已经没有意义了，即不存在误差了。

```javascript
x = 0.2;
y = 0.3;
z = 0.1;
equal = (Math.abs(x - y + z) < Number.EPSILON);
```

### Math.trunc()

**`Math.trunc()`** 方法会将数字的小数部分去掉，只保留整数部分。

不像 `Math` 的其他三个方法： [`Math.floor()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)、[`Math.ceil()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)、[`Math.round()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Math/round) ，`Math.trunc()` 的执行逻辑很简单，仅仅是**删除**掉数字的小数部分和小数点，不管参数是正数还是负数。

传入该方法的参数会被隐式转换成数字类型。

因为 `trunc()` 是 `Math` 对象的静态方法，你必须用 `Math.trunc()` 来使用，而不是调用你创建的 `Math` 对象的一个实例方法（`Math` 没有构造函数）

```javascript
	console.log(Math.trunc(123))
	console.log(Math.trunc(-0.232323))
	console.log(Math.trunc(231.131313))
	console.log(Math.trunc(Number.EPSILON))
	console.log(Math.trunc(Infinity))
	console.log(Math.trunc('1'))
	console.log(Math.trunc(NaN))
	console.log(Math.trunc(0.3113131))
```

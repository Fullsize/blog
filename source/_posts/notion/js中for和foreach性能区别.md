---
title: js中for和forEach性能区别
date: 2025-03-20 19:34
description: 很无趣的对比
tags:
  - javascript
categories:
  - javascript
notion_id: 1bc841bd-614d-80e9-8e21-f2f6fd97e181
---

在 JavaScript 中，`for` 循环和 `forEach` 方法在性能上有一些区别。一般来说，`for` 循环的性能优于 `forEach`，因为 `for` 循环是一个基本的循环结构，具有较少的开销，而 `forEach` 是一个数组方法，具有额外的函数调用开销。

### `for` 循环

`for` 循环是一个基本的循环结构，适用于需要高性能的场景。它的语法简单，执行效率高。

**示例：**

```javascript
const array = [1, 2, 3, 4, 5];
for (let i = 0; i < array.length; i++) {
  console.log(array[i]);
}

```

### `forEach` 方法

`forEach` 方法是数组的一个方法，用于遍历数组中的每个元素。它的语法更简洁，但由于每次迭代都会调用一个回调函数，因此在性能上略逊于 `for` 循环。

**示例：**

```javascript
const array = [1, 2, 3, 4, 5];
array.forEach(element => {
  console.log(element);
});

```

### 性能对比

在大多数情况下，`for` 循环的性能优于 `forEach`。这是因为 `forEach` 方法在每次迭代时都会调用一个回调函数，而 `for` 循环则没有这种开销。

**性能测试示例：**

```javascript
const array = new Array(1000000).fill(0);

// 使用 for 循环
console.time('for');
for (let i = 0; i < array.length; i++) {
  array[i] += 1;
}
console.timeEnd('for');

// 使用 forEach 方法
console.time('forEach');
array.forEach((element, index) => {
  array[index] += 1;
});
console.timeEnd('forEach');
// 测试结果受机器性能影响，但for确实比forEach更快
// for: 4.972900390625 ms
// forEach: 13.860107421875 ms

```

在上述示例中，`for` 循环通常会比 `forEach` 方法更快。

### 结论

- **`for`**** 循环**：适用于需要高性能的场景，特别是当数组很大时。

- **`forEach`**** 方法**：语法更简洁，适用于代码可读性更重要的场景。

在实际开发中，选择 `for` 还是 `forEach` 取决于具体的需求和场景。如果性能是关键因素，建议使用 `for` 循环；如果代码可读性更重要，可以使用 `forEach` 方法。

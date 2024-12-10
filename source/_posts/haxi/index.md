---
title: 哈希表
date: 2024-8-16 21:20
tags:
  - 数据结构
  - 哈希
categories:
  - 技术
  - 学习
---

哈希表（hash table），又称散列表，它通过建立键  `key`  与值  `value`  之间的映射，实现高效的元素查询。具体而言，我们向哈希表中输入一个键  `key` ，则可以在  O(1)  时间内获取对应的值  `value` 。

如图 6-1 所示，给定  n  个学生，每个学生都有“姓名”和“学号”两项数据。假如我们希望实现“输入一个学号，返回对应的姓名”的查询功能

![haxi.png](/images/haxi.png)

## **哈希表简单实现**

### 除留余数法（Modulo Method）

- 哈希值通过将键除以哈希表的大小，然后取余数得到。
- 哈希函数形式：`hash(key) = key % table_size`
- 简单但容易产生冲突，尤其是在键的分布不均匀时。

```jsx
class Pair {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}
class ArrayHashMap {
  buckets;
  len;
  constructor(len = 100) {
    this.buckets = new Array(len).fill(null);
    this.len = len;
  }
  hashFunc(key) {
    return key % this.len;
  }
  set(key, val) {
    this.buckets[this.hashFunc(key)] = new Pair(key, val);
  }
  get(key) {
    let index = this.hashFunc(key);
    let pair = this.buckets[index];
    if (pair === null) return null;
    return pair.val;
  }
  delect(key) {
    let index = this.hashFunc(key);
    let pair = this.buckets[index];
    if (pair === null) return null;
    this.buckets[index] = null;
    return pair.val;
  }
  keys() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        arr.push(this.buckets[i].key);
      }
    }
    return arr;
  }
  values() {
    let arr = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] !== null) {
        arr.push(this.buckets[i].val);
      }
    }
    return arr;
  }
  size() {
    return this.buckets.filter((item) => item !== null).length;
  }
  has(key) {
    let index = this.hashFunc(key);
    let pair = this.buckets[index];
    if (pair === null) return false;
    return true;
  }
  forEach(callback) {
    this.buckets.filter((item) => item !== null).forEach(callback);
  }
}
```

## 动态实现

```jsx
class Pair {
  constructor(key, val) {
    this.key = key;
    this.val = val;
  }
}
class HashMapChaining {
  size; // 键值对数量
  capacity; // 容量
  loadThres; // 触发扩容的负载因子阈值
  extendRatio; // 扩容倍数
  buckets; // 桶数组
  constructor() {
    this.size = 0;
    this.capacity = 4;
    this.loadThres = 2.0 / 3.0;
    this.extendRatio = 2;
    this.buckets = new Array(this.capacity).fill(null).map((x) => []);
  }
  hashFunc(key) {
    const stringKey = JSON.stringify(key);
    let hash = 0;
    for (let i = 0; i < stringKey.length; i++) {
      hash = (hash + stringKey.charCodeAt(i) * i) % this.capacity;
    }
    return hash;
  }
  loadFactor() {
    return this.size / this.capacity;
  }
  set(key, val) {
    if (this.loadFactor() > this.loadThres) {
      this.extend();
    }
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair.key === key) {
        pair.val = val;
        return;
      }
    }
    bucket.push(new Pair(key, val));
    this.size++;
  }
  get(key) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    for (let pair of bucket) {
      if (pair.key === key) {
        return pair.val;
      }
    }
    return null;
  }
  extend() {
    const bucketsTmp = this.buckets;
    this.capacity *= this.extendRatio;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;
    for (let bucket of bucketsTmp) {
      for (const pair of bucket) {
        this.set(pair.key, pair.val);
      }
    }
  }
  delete(key) {
    const index = this.hashFunc(key);
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].key === key) {
        bucket.splice(i, 1);
        this.size--;
        break;
      }
    }
  }
  has(key) {
    return this.get(key) !== null;
  }
}
```

---
title: vue中watch和computed的区别
date: 2025-03-20 19:35
description: watch和computed的使用场景
tags:
  - 基础
categories:
  - vue
notion_id: 1bc841bd-614d-80a3-82f5-cc334e155ab7
---

在 Vue.js 中，`watch` 和 `computed` 都用于响应式数据的处理，但它们有不同的用途和使用场景。

### `computed` 属性

`computed` 属性用于声明计算属性。计算属性基于其他响应式数据进行计算，并且只有在其依赖的数据发生变化时才会重新计算。计算属性的结果会被缓存，直到其依赖的数据发生变化。

**使用场景：**

- 当你需要基于其他数据计算出一个新的值，并且希望这个值在其依赖的数据不变时保持不变。

**示例：**

```javascript
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
};

```

### `watch` 属性

`watch` 属性用于观察和响应数据的变化。与计算属性不同，`watch` 允许你在数据变化时执行异步操作或复杂逻辑。

**使用场景：**

- 当你需要在数据变化时执行异步操作（例如 API 请求）。

- 当你需要在数据变化时执行复杂的逻辑，而不仅仅是计算一个新值。

**示例：**

```javascript
export default {
  data() {
    return {
      query: '',
      results: []
    };
  },
  watch: {
    query(newQuery) {
      this.fetchResults(newQuery);
    }
  },
  methods: {
    fetchResults(query) {
      // 执行 API 请求或其他异步操作
      // 并更新 results 数据
    }
  }
};

```

### 总结

- **`computed`**：用于声明基于其他响应式数据计算出的新值，并且结果会被缓存。

- **`watch`**：用于在数据变化时执行异步操作或复杂逻辑。

选择使用 `computed` 还是 `watch` 取决于你的具体需求。如果只是简单的基于其他数据计算新值，使用 `computed` 更合适；如果需要在数据变化时执行复杂逻辑或异步操作，使用 `watch` 更合适。

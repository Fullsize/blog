---
title: vue3.0中watch和watchEffect的区别
date: 2025-03-19 22:30
description: 区别和用法
tags:
  - 基础
categories:
  - vue
notion_id: 1bb841bd-614d-800b-ba4d-f55d9cf8df15
---

## 前言

`watch` 和 `watchEffect` 是 Vue 3 中用于响应式数据变化的两个 API

## watch

用于监听特定的响应式数据源（如一个或多个状态变量、计算属性等）的变化，并在变化时执行回调函数。它适用于需要精确控制依赖关系的场景。

**特点：**

- 需要明确指定要监听的响应式数据源。

- 回调函数在依赖的数据源发生变化时执行。

- 可以访问新值和旧值。

- 适用于需要处理复杂逻辑或副作用的场景。

**示例：**

```typescript
<script setup>
import { ref, watch } from 'vue';
const count = ref(0);
watch(count, (newValue, oldValue) => {
  console.log(`count changed from ${oldValue} to ${newValue}`);
});
</script>
```

## watchEffect

是一个更自动化的 API，它会立即执行传入的回调函数，并在回调函数中使用的所有响应式数据源发生变化时重新执行。它适用于简单的副作用处理，不需要明确指定依赖关系。

**特点：**

- 不需要明确指定要监听的响应式数据源，自动追踪依赖。

- 回调函数会在组件挂载时立即执行一次。

- 适用于简单的副作用处理，如日志记录、DOM 操作等。

**示例：**

```typescript
<script setup>
import { ref, watchEffect } from 'vue';
const count = ref(0);
watchEffect(() => {
  console.log(`count is now ${count.value}`);
});
</script>
```

### **总结**

- 使用 `watch` 时，需要明确指定要监听的响应式数据源，适用于复杂逻辑或需要访问新旧值的场景。

- 使用 `watchEffect` 时，不需要指定依赖关系，适用于简单的副作用处理。

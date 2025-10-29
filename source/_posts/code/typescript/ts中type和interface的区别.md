---
title: ts 中 type 和 interface 的区别
date: 2025-04-02 15:21
tags:
  - typescript
categories:
  - typescript
---

# ts 中 type 和 interface 的区别

`type` 可以用于**基本类型、联合类型、元组**，但 `interface` 不能：

```jsx
// ✅ type 支持联合类型
type ID = string | number;

// ✅ type 支持元组
type Point = [number, number];

// ❌ interface 不能直接定义联合类型
// interface ID = string | number; // Error
```

### **什么时候用 `interface`？**

- 需要自动合并 (`declaration merging`)
- 需要继承时
- 适用于 `class` 实现接口

### **什么时候用 `type`？**

- 需要联合类型 (`string | number`)
- 需要元组 (`[number, string]`)
- 需要 `&` 交叉类型合并

在大多数情况下，**如果可以使用 `interface`，建议优先使用 `interface`** ，因为它更具可扩展性，并且 TypeScript 也推荐用于对象类型的描述。

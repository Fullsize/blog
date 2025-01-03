---
title: react key的作用
date: 2020-12-08
tags:
  - javascript
  - react
  - 基础
categories:
  - 技术
  - 学习
---

key 的主要作用用来减少没必要的 diff 算法对比,一个元素的 key 不需要在全局唯一,但在列表中需要保持唯一.

---

- **唯一性要求**： **`key`** 属性的值在同一列表中必须是唯一的。这样 React 才能准确地追踪每个列表项的变化。如果列表中的两个元素具有相同的 **`key`** ，React 将无法区分它们，可能会导致意外的行为或错误。
- **稳定性**： **`key`** 应该是稳定的，即在组件的生命周期内保持不变。在列表中重新排序或添加/删除元素时，React 会根据 **`key`** 来判断哪些元素被修改了。如果 **`key`** 值不稳定，React 可能会错误地重新创建组件，导致组件状态丢失或不一致。
- **性能优化**：React 使用 **`key`** 来确定何时对列表进行重新排序、添加或删除操作。通过提供稳定的 **`key`** ，React 可以最小化 DOM 操作，并在必要时仅对必要的部分进行更新，从而提高性能。
- **推荐用法**：通常，使用列表项的唯一标识符作为 **`key`** 是一个好的选择。例如，在从数据库检索的数据中，可以使用每个项的唯一 ID 作为 **`key`** 。如果没有唯一标识符可用，也可以使用列表项的索引作为 **`key`** ，但这种做法可能会导致性能问题，因为 React 需要在重新排序时重新渲染整个列表。
- **注意事项**：在使用 **`key`** 时，需要避免使用随机生成的 **`key`** ，因为这会导致不稳定的 **`key`** 值。此外，尽量避免在组件中依赖于 **`key`** 属性进行逻辑处理，因为 **`key`** 只是 React 的一个特殊属性，并不会传递给组件。

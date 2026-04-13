---
title: "CSS — BEM 命名规范"
date: 2021-06-17 12:08
description: css命名规范
tags:
  - css
categories:
  - [css]
notion_id: 84964f8c-1bdd-4dee-8065-a8e3f39b2712
---

BEM（Block, Element, Modifier）是一种流行的CSS命名约定，旨在提高代码的可维护性和可重用性。以下是BEM命名规范的主要要点：

1. **Block（块）**：

  - Block是组件的高级抽象，独立于其上下文的功能性部分。通常表示一个独立的UI组件。

  - Block的命名应该是简洁明了的描述性名称，用以表示它的目的或功能。例如：**`button`**, **`menu`**, **`card`**.

1. **Element（元素）**：

  - Element是Block的一部分，没有意义上的独立性，只有在特定的Block内有意义。它们不能单独使用，而是依赖于它们的Block。

  - Element的命名应该使用Block名称作为前缀，以便清晰地表明其所属的Block。例如：**`button__label`**, **`menu__item`**, **`card__title`**.

1. **Modifier（修饰符）**：

  - Modifier用于修改Block或Element的外观、状态或行为。它们可以使Block或Element具有不同的变体。

  - Modifier的命名应该使用Block或Element名称以及修饰符的描述性名称。例如：**`button--large`**, **`menu__item--active`**, **`card__title--highlighted`**.

1. **命名约定**：

  - 使用双下划线**`__`**来分隔Block和Element，使用双短横线**`-`**来分隔Block/Element和Modifier。

  - 使用类选择器来应用BEM命名约定。

  - 避免使用层叠选择器，因为这会增加特定性，降低了样式的可重用性和可维护性。

  - BEM的命名约定提倡使用长而具有描述性的名称，以便更清晰地表达其用途。

1. **示例**：

```html
<div class="button button--large">
    <span class="button__label">Click me</span>
</div>
```

1. **优点**：

  - BEM提供了一种结构清晰的命名约定，使得代码更易于理解和维护。

  - 通过明确地定义Block、Element和Modifier的关系，可以降低样式冲突的可能性，增加样式的可预测性和可靠性。

  - BEM鼓励重用组件和样式，提高了代码的可重用性。

BEM是一种灵活且功能强大的CSS命名约定，但在实际应用中，也要根据项目的特定需求和团队的实际情况做出适当的调整和变化。

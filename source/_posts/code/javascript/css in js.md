---
title: css in js
date: 2024-03-20 19:50
tags:
  - tool
categories:
  - 架构
---

# css in js

CSS-in-JS 是一种将 CSS 样式直接写在 JavaScript 代码中的技术。它有许多优点和缺点，以下是一些主要的优点和缺点：

### 优点

1. **样式作用域隔离**：
   - CSS-in-JS 可以确保样式只作用于特定的组件，避免了全局样式污染的问题。
2. **动态样式**：
   - 可以根据组件的状态或属性动态生成样式，使得样式更加灵活和可控。
3. **模块化**：
   - 样式和组件代码放在一起，增强了代码的模块化和可维护性。
4. **自动前缀**：
   - CSS-in-JS 库通常会自动添加浏览器前缀，确保样式在不同浏览器中的兼容性。
5. **避免命名冲突**：
   - 通过生成唯一的类名，避免了传统 CSS 中的命名冲突问题。
6. **更好的开发体验**：
   - 可以利用 JavaScript 的强大功能，如变量、循环和条件语句，来编写更复杂的样式逻辑。

### 缺点

1. **性能开销**：
   - 在运行时生成样式可能会带来一定的性能开销，尤其是在大型应用中。
2. **学习曲线**：
   - 对于习惯了传统 CSS 的开发者来说，CSS-in-JS 可能需要一些时间来适应。
3. **调试困难**：
   - 生成的类名通常是随机的，可能会增加调试的难度。
4. **文件大小**：
   - 由于样式是通过 JavaScript 生成的，可能会增加 JavaScript 文件的大小。
5. **工具链依赖**：
   - 需要依赖特定的库或工具链，如 styled-components 或 emotion，这可能会增加项目的复杂性。

### 示例

以下是一个使用 `styled-components` 的简单示例：

```jsx
import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: ${(props) => (props.primary ? "blue" : "gray")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: ${(props) => (props.primary ? "darkblue" : "darkgray")};
  }
`;

const App = () => (
  <div>
    <Button primary>Primary Button</Button>
    <Button>Secondary Button</Button>
  </div>
);

export default App;
```

在这个示例中，`Button` 组件的样式是动态生成的，并且根据 `primary` 属性的值来决定按钮的背景颜色。这样可以使样式更加灵活和可维护。

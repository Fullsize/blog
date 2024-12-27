---
title: 说说对React中类组件和函数组件的理解？有什么区别？
date: 2024-11-18
tags:
  - javascript
  - react
  - 基础
categories:
  - 技术
  - 学习
---

## 类组件

顾名思义，使用`es6`类的方式去编写组件,该类必须继承`React.Component`

```javascript
class Welcome extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 函数组件

通过函数编写的形式去实现一个 `React` 组件，是 `React` 中定义组件最简单的方式

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

## 区别

| 类别     | 类组件                                                                                           | 函数组件                                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 定义方式 | 使用 ES6 类语法                                                                                  | 使用函数表达式                                                                                                                                                             |
| 生命周期 | 支持生命周期,如 `componentDidMount`, `componentDidUpdate`, `componentWillUnmount` 等             | 没有直接的生命周期<br />通常使用 `useEffect` 和 `useReducer` 等 React Hooks 来代替类组件中的生命周期钩子                                                                   |
| 状态管理 | 可以使用 `this.state` 来管理内部状态。更适合需要复杂状态管理或需要对生命周期有更细粒度控制的场景 | 使用 `useState` 和 `useReducer` 等 React Hooks 来管理内部状态。                                                                                                            |
| 其他     | 类组件有更好继承性和扩展性的                                                                     | 函数组件是更简洁、更轻量的实现方式<br />优化了性能，因为它们本质上是无状态的。 <br /><br /> 函数组件可以直接使用 React Hooks，使得状态管理和副作用处理变得更加简洁和灵活。 |

## 总结

**类组件**：更适合复杂状态管理或需要使用生命周期钩子的场景。
**函数组件**：简洁、无状态，更推荐用于简单组件和现代 React 应用。

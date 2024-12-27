---
title: 常用的react hooks
date: 2024-02-23
tags:
  - javascript
  - react
  - 基础
categories:
  - 技术
  - 学习
---

React Hooks 提供了一系列常用的 API，这些 API 可以让你在函数组件中使用状态(state)、生命周期方法、上下文(context)等 React 特性。以下是一些常用的 React Hooks API：

1. **useState**: 用于在函数组件中添加状态。它返回一个包含状态值和更新状态值的函数。

```javascript
const [state, setState] = useState(initialState);
```

2. **useEffect**: 用于在组件渲染后执行副作用操作，如数据获取、订阅、手动 DOM 操作等。它在每次渲染后都会执行。

```javascript
useEffect(() => {
  // effect code
  return () => {
    // cleanup code
  };
}, [dependencies]);
```

3. **useContext**: 用于在函数组件中访问 React 上下文。

```javascript
const value = useContext(MyContext);
```

4. **useReducer**: 用于在函数组件中管理复杂的状态逻辑。它类似于 Redux 中的 reducer。

```javascript
const [state, dispatch] = useReducer(reducer, initialState);
```

5. **useCallback**: 用于缓存回调函数，以便在依赖项不变时不重新创建该函数。

```javascript
const memoizedCallback = useCallback(() => {
  // callback code
}, [dependencies]);
```

6. **useMemo**: 用于缓存计算结果，以便在依赖项不变时不重新计算。

```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```

7. **useRef**: 用于在函数组件之间保存可变值的引用，类似于 class 组件中的实例变量。

```jsx
const refContainer = useRef(initialValue);
```

8. **useImperativeHandle**: 用于自定义暴露给父组件的实例值

```jsx
useImperativeHandle(
  ref,
  () => ({
    // exposed instance methods/properties
  }),
  [dependencies]
);
```

9. **useLayoutEffect**: 类似于 useEffect，但会在所有 DOM 变更后同步调用 effect。它会在浏览器完成布局与绘制之后，但在任何新的渲染之前执行。

```jsx
useLayoutEffect(() => {
  // effect code
}, [dependencies]);
```

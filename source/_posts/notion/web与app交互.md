---
title: web与App交互
date: 2021-05-07 14:48
description: web与App的数据交互
tags:
  - app
categories:
  - [app]
notion_id: ac3e9a84-3e70-49fc-84d3-46783c0d0c93
---

## 1. 协议

App暴露的调用接口`xr://message?name=carson`

web端调用

```javascript
window.location.href=xr://message?name=carson
```

## 2. js方法

将所有属性和方法暴露在window上,供App和web进行调用,从而完成数据交互

```javascript
callNativeMethod = ({ methodName, params }) => {
    const { isAndroid, isIos } = this.os;
    if (!methodName) {
      return;
    }
    const _params = JSON.stringify(params);
    if (isAndroid && window.AndroidJs) {
      window.AndroidJs[methodName](_params);
    }
    if (isIos && window.webkit) {
      window.webkit.messageHandlers[methodName].postMessage(_params);
    }
  };
```

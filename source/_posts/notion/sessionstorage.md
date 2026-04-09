---
title: sessionStorage
date: 2021-06-04 10:14
description: 简易使用
tags:
  - javascript
categories:
  - javascript
notion_id: 2f1d9e68-51b6-4a59-9e90-99734c2fb916
---

```javascript
export const session = {
  get(key: string) {
    const data = sessionStorage[key]
    if (!data || data === "null") {
      return null;
    }
    return JSON.parse(data).value;
  },
  set(key: string, value) {
    const data = {
      value
    }
    sessionStorage[key] = JSON.stringify(data);
  },
  remove(key: string) {
    sessionStorage.removeItem(key);
  },
  clear() {
    sessionStorage.clear();
  }
}
```

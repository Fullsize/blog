---
title: localforage 简化封装
date: 2025-10-10 11:23
description: localforage的简化封装用于统一存储和加密本地数据
tags:
  - 基础
categories:
  - javascript
notion_id: 288841bd-614d-80ff-980a-c0e92416612b
---

```javascript
import localforage from "localforage";

// 配置 localforage 实例
const storage = localforage.createInstance({
  name: "default-storage-",
});

// 泛型化 getItem，提高类型安全
async function getItem<T>(key: string): Promise<T | null> {
  try {
    const value = await storage.getItem<string>(key);
    return value ? JSON.parse(value) as T : null;
  } catch (error) {
    console.error(`Failed to get item "${key}" from storage`, error);
    return null;
  }
}

async function setItem<T>(key: string, value: T): Promise<void> {
  try {
    await storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item "${key}" in storage`, error);
  }
}

async function removeItem(key: string): Promise<void> {
  try {
    await storage.removeItem(key);
  } catch (error) {
    console.error(`Failed to remove item "${key}" from storage`, error);
  }
}

// 导出接口
export default {
  getItem,
  setItem,
  removeItem,
};

```

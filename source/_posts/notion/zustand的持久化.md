---
title: zustand的持久化
date: 2025-10-10 11:23
description: 持久化存储状态
tags:
  - react
categories:
  - react
notion_id: 288841bd-614d-80fe-acf0-cf0a3c38749f
---

## store.ts

```javascript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import storage from '@/utils/storage'

const DEFAULT_STATE = {
  bears: 0 as number,
  a: 1 as number,
  hydrated: false as boolean, // 用于标记是否完成rehydrate
} as const

// 自动推断类型
type State = typeof DEFAULT_STATE

type BearStore = State & {
  setState: (value: Partial<State> | ((prev: State) => Partial<State>)) => void
}

const useBearStore = create<BearStore>()(
  persist(
    (set) => ({
      ...DEFAULT_STATE,
      setState: (value) =>
        set((prev) => ({ ...prev, ...(typeof value === 'function' ? value(prev) : value) })),
    }),
    {
      name: 'food-storage',
      storage,
      onRehydrateStorage: () => (state) => {
        useBearStore.getState().setState({ hydrated: true })
      },
    },
  ),
)

export default useBearStore

```

## storage.ts

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

## 应用

```javascript
"use client";
import React, { useEffect } from "react";
import { useSetState } from "react-use";
import useBearStore from "@/store/useGobal";
export default function Page({
  params,
}: {
  params: Promise<{ locale: string; level: string }>;
}) {
  const { bears, setState, hydrated } = useBearStore();
  useEffect(() => {
    console.log(16, hydrated);
  }, [hydrated]);
  return (
    <div>
      <div>{bears}</div>
      <button
        onClick={() => {
          setState({ bears: bears + 1 });
        }}
      >
        增加{" "}
      </button>
    </div>
  );
}

```

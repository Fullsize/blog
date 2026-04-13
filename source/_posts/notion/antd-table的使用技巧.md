---
title: antd table的使用技巧
date: 2024-07-10 16:49
description: 使用过程中需要注意的点
tags:
  - react
categories:
  - [react]
notion_id: 5b2394f0-3381-4542-8e62-65b6504aad66
---

## 排序

当**`columns`**的**`sorter`**为**`true`**时，需要搭配**`onChange`**方法来实现排序

当**`columns`**的**`sorter`**为特定排序方法时，**`onChange`**方法实现的排序则无效

## 表头

- 操作表头样式和属性的api为**`onHeaderCell`**

- 操作表头显示文字和使用指定Node来渲染的api为**`title`**

## 单元格

- 设置单元格属性和样式 **`onCell`**

- 操作单元格显示文字和使用指定Node来渲染的api为**`render`**

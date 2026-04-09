---
title: git tag
date: 2021-11-12 14:36
description: git tag 指令操作
tags:
  - git
categories:
  - git
notion_id: 2820de25-a94b-48c6-bb2f-67cff337a7c0
---

## 列出tag

```shell
git tag
```

## 显示tag信息

```shell
git show <tagname>
```

## 创建tag

### 当注释的标签

```shell
git tag -a <tagname> -m <message>
```

### 轻量创建

```shell
git tag <tagname>
```

## 删除

### 本地仓库

```shell
git tag -d <tagname>
```

### 远程仓库

```shell
git push origin --delete <tagname>
```

### 推送多个

```shell
git push origin --tags
```

## 文章来源

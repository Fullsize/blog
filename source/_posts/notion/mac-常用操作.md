---
title: mac 常用操作
date: 2021-12-29 10:10
description: mac常用指令操作或其他操作
tags:
  - mac
categories:
  - [mac]
notion_id: 9fa308f4-3b00-46aa-b697-5bc6ae89deb7
---

## **查看/关闭 端口**

### 查看

```shell
lsof i :prot
```

### 关闭

```shell
kill -9 :pid
```

## 删除指定文件

```shell
find ./ -name "*.xib" | xargs rm -rf
```

`find ./ -name "*.xib"` 找到当前文件夹下后缀为.xib的文件

`xargs rm -rf`删除找到的文件，`r`向下递归， `f`强制删除，没有提示

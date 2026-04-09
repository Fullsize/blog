---
title: docker error getting credentials 错误
date: 2023-12-26 10:09
description: 拉取镜像错误
tags:
  - docker
categories:
  - docker
notion_id: d102bf0f-86db-45c8-b978-05bfc584dfac
---

修改`.docker/config.json` 删除 `"credsStore": "desktop"` 或者 将值改为`"osxkeychain"`

### mac

```shell
sudo vim ~/.docker/config.json
```

### windows

```shell
sudo vim $home/.docker/config.json
```

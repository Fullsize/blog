---
title: spug
date: 2024-02-04 16:07
description: CD平台
tags:
  - 架构
  - 配置
  - 打包工具
categories:
  - tool
notion_id: 6ea9e84c-8710-4d84-b2b6-87340b600442
---

## 官方文档

## 打包配置(docker)

```shell
sudo DOCKER_BUILDKIT=1 docker build .  -t $SPUG_APP_KEY --progress=plain
sudo docker stop $SPUG_APP_KEY
sudo docker rm $SPUG_APP_KEY
sudo docker run -it -d -p 8100:80 --name $SPUG_APP_KEY  $SPUG_APP_KEY
```

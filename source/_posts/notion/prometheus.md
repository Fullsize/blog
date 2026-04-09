---
title: prometheus
date: 2023-12-28 18:29
description: 用于监控系统
tags:
  - tool
categories:
  - tool
notion_id: 6c2a4670-4c09-467b-9072-f2d1b3c6c24a
---

## 启动

```shell
docker run -d -p 9090:9090 -v /home/zhouyutao/prometheus:/etc/prometheus --name prometheus --add-host host.docker.internal=host-gateway prom/prometheus
```

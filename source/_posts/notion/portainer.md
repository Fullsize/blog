---
title: portainer
date: 2023-12-20 10:54
description: "portainer是doker的可视化平台，用于管理容器和镜像"
tags:
  - tool
categories:
  - [tool]
notion_id: d676ca19-e0c5-4614-aceb-2fcba28e5ae3
---

Portainer 是一个用户界面，用于管理 Docker 容器和 Kubernetes 集群。它提供了一个直观的 Web 界面，可以帮助用户查看和管理 Docker 容器、网络、 volumes、Swarm 网络和服务。Portainer 还支持 Kubernetes，可以查看和管理 Kubernetes 的 Namespace、Deployment、Service、Ingress、HPA 等资源。它可以帮助用户更轻松地管理 Docker 和 Kubernetes 集群，以及相关的资源和服务。Portainer 还提供了一些高级功能，如端口扫描、容器日志查看和容器安全扫描等。总之，Portainer 是一个功能强大且易于使用的容器管理工具。

## 安装

### 创建数据卷

```shell
docker volume create portainer_data
```

### 启动容器

```shell
docker run -d -p 8000:8000 -p 9443:9443 --name portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v portainer_data:/data portainer/portainer-ce:latest
```

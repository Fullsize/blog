---
title: docker
date: 2023-09-18 10:21
description: "docker 指令，使用方法"
tags:
  - docker
categories:
  - [docker]
notion_id: 51836b62-c3ab-40e9-8543-4cb6baf04f5f
---

# 简介

Docker是一个开源的引擎，可以轻松的为任何应用创建一个轻量级的、可移植的、自给自足的容器。开发者在笔记本上编译测试通过的容器可以批量地在生产环境中部署，包括VMs（虚拟机）、 [bare metal](http://www.whatis.com.cn/word_5275.htm)、OpenStack 集群和其他的基础应用平台。

## 镜像(image)

镜像是一个文件系统，提供了容器运行时需要用到的文件和参数配置。相当于平时在使用某个软件时需要下载的安装包，也相当于安装操作系统时需要用到 ISO 文件。

### 下载镜像

\[image\]需要下载的镜像名称,

```shell
docker pull [image]
```

### 导出镜像

将镜像导出为文件，用于上传服务器

```shell
docker save [imageid or imagename] > [name].tar
```

### 导入镜像

将导出的镜像包，导入docker

```shell
docker load <[name].tar
```

## 启动容器

```shell
docker run -it -p 8080:80 -v $PWD:/ww --name [custom constainer name] [image] 
```

### **`docker run`**

### **`docker ps`**

### **`docker images`**

### **`docker build`**

### **`docker pull`**

拉取远程镜像到本地。

### **`docker push`**

将本地镜像推送到远程仓库。

### **`docker exec`**

### **`docker stop`**

停止运行中的容器。

### **`docker start`**

启动已停止的容器。

### **`docker rm`**

### **`docker rmi`**

### **`docker network`**

### **`docker build`**

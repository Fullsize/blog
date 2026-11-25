---
title: Debian 安装 Nginx 与基本使用指南
date: 2026-06-17 18:23
tags:
  - system
categories:
  - [system]
notion_id: 382841bd-614d-801c-86c0-d256f7a8a8dc
---

# Debian 安装 Nginx 与基本使用指南

## 1. 更新系统

更新软件包索引并升级系统：

```bash
sudo apt update
sudo apt upgrade -y
```

---

## 2. 安装 Nginx

安装 Nginx：

```bash
sudo apt install nginx -y
```

查看安装版本：

```bash
nginx -v
```

示例输出：

```plain text
nginx version: nginx/1.22.1
```

---

## 3. 启动 Nginx

启动服务：

```bash
sudo systemctl start nginx
```

设置开机自启：

```bash
sudo systemctl enable nginx
```

查看状态：

```bash
sudo systemctl status nginx
```

正常状态：

```plain text
Active: active (running)
```

---

## 4. 验证安装

查看服务器 IP：

```bash
hostname -I
```

浏览器访问：

```plain text
<http://服务器IP>
```

如果看到：

```plain text
Welcome to nginx!
```

说明安装成功。

---

## 5. Nginx 目录结构

---

## 6. 发布静态网页

编辑默认首页：

```bash
sudo nano /var/www/html/index.html
```

写入：

```html
<!DOCTYPE html>
<html>
<head>
    <title>My First Nginx Site</title>
</head>
<body>
    <h1>Hello Nginx</h1>
    <p>部署成功！</p>
</body>
</html>
```

保存后刷新浏览器即可访问。

---

## 7. 创建独立网站

### 创建网站目录

```bash
sudo mkdir -p /var/www/demo
```

创建首页：

```bash
sudo nano /var/www/demo/index.html
```

内容：

```html
<h1>Demo Site</h1>
```

### 创建站点配置

```bash
sudo nano /etc/nginx/sites-available/demo
```

配置内容：

```plain text
server {
    listen 80;
    server_name demo.example.com;

    root /var/www/demo;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

### 启用站点

创建软链接：

```bash
sudo ln -s /etc/nginx/sites-available/demo /etc/nginx/sites-enabled/
```

检查配置：

```bash
sudo nginx -t
```

重新加载：

```bash
sudo systemctl reload nginx
```

---

## 8. 常用命令

### 启动

```bash
sudo systemctl start nginx
```

### 停止

```bash
sudo systemctl stop nginx
```

### 重启

```bash
sudo systemctl restart nginx
```

### 重载配置

```bash
sudo systemctl reload nginx
```

### 查看状态

```bash
sudo systemctl status nginx
```

### 检查配置

```bash
sudo nginx -t
```

### 查看完整配置

```bash
sudo nginx -T
```

---

## 9. HTTPS 配置（Let's Encrypt）

安装 Certbot：

```bash
sudo apt install certbot python3-certbot-nginx -y
```

申请证书：

```bash
sudo certbot --nginx
```

测试自动续期：

```bash
sudo certbot renew --dry-run
```

---

## 10. 日志查看

实时查看访问日志：

```bash
sudo tail -f /var/log/nginx/access.log
```

实时查看错误日志：

```bash
sudo tail -f /var/log/nginx/error.log
```

---

## 11. 常见问题

### 80 端口被占用

查看占用情况：

```bash
sudo ss -tlnp | grep :80
```

或：

```bash
sudo lsof -i:80
```

### 配置修改后不生效

检查配置：

```bash
sudo nginx -t
```

重新加载：

```bash
sudo systemctl reload nginx
```

### Nginx 无法启动

查看详细日志：

```bash
journalctl -u nginx -xe
```

---

## 12. 快速安装命令

```bash
sudo apt update
sudo apt install nginx -y

sudo systemctl enable nginx
sudo systemctl start nginx

sudo nginx -t
sudo systemctl status nginx
```

访问：

```plain text
<http://服务器IP>
```

看到 **Welcome to nginx!** 即表示部署成功。

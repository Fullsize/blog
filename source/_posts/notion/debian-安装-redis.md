---
title: Debian 安装 Redis
date: 2026-06-17 18:28
tags:
  - system
categories:
  - [system]
notion_id: 382841bd-614d-8023-a894-dd2b1f30cc4c
---

# Debian 安装 Redis

## 1. 更新软件源

```bash
sudo apt update
```

---

## 2. 安装 Redis

```bash
sudo apt install redis-server -y
```

查看版本：

```bash
redis-server --version
```

示例：

```plain text
Redis server v=7.x.x
```

---

## 3. 启动 Redis

启动服务：

```bash
sudo systemctl start redis-server
```

设置开机启动：

```bash
sudo systemctl enable redis-server
```

查看状态：

```bash
sudo systemctl status redis-server
```

正常显示：

```plain text
Active: active (running)
```

---

## 4. 测试 Redis

进入客户端：

```bash
redis-cli
```

执行：

```plain text
ping
```

返回：

```plain text
PONG
```

退出：

```plain text
exit
```

---

## 5. 查看监听端口

默认端口：

```plain text
6379
```

查看：

```bash
ss -tlnp | grep 6379
```

示例：

```plain text
LISTEN 0 511 127.0.0.1:6379
```

---

## 6. 修改配置文件

配置文件：

```bash
sudo nano /etc/redis/redis.conf
```

---

## 7. 设置密码

找到：

```plain text
# requirepass foobared
```

修改为：

```plain text
requirepass YourStrongPassword
```

例如：

```plain text
requirepass Redis@2025
```

保存退出。

重启：

```bash
sudo systemctl restart redis-server
```

---

## 8. 使用密码连接

登录：

```bash
redis-cli
```

认证：

```plain text
AUTH Redis@2025
```

返回：

```plain text
OK
```

或者直接连接：

```bash
redis-cli -a Redis@2025
```

---

## 9. 开启远程访问（生产环境谨慎）

编辑配置：

```bash
sudo nano /etc/redis/redis.conf
```

找到：

```plain text
bind 127.0.0.1 ::1
```

改为：

```plain text
bind 0.0.0.0
```

找到：

```plain text
protected-mode yes
```

改为：

```plain text
protected-mode no
```

重启：

```bash
sudo systemctl restart redis-server
```

---

## 10. 开放防火墙

如果需要远程访问：

```bash
sudo ufw allow 6379/tcp
```

查看：

```bash
sudo ufw status
```

---

## 11. 常用命令

查看 Redis 信息：

```bash
redis-cli INFO
```

查看内存：

```bash
redis-cli INFO memory
```

查看客户端：

```bash
redis-cli CLIENT LIST
```

查看所有键：

```bash
redis-cli KEYS '*'
```

清空当前库：

```bash
redis-cli FLUSHDB
```

清空全部库：

```bash
redis-cli FLUSHALL
```

---

## 12. Redis 服务管理

启动：

```bash
sudo systemctl start redis-server
```

停止：

```bash
sudo systemctl stop redis-server
```

重启：

```bash
sudo systemctl restart redis-server
```

查看状态：

```bash
sudo systemctl status redis-server
```

---

## 13. 一键安装

```bash
sudo apt update

sudo apt install redis-server -y

sudo systemctl enable redis-server

sudo systemctl start redis-server

redis-cli ping
```

返回：

```plain text
PONG
```

表示 Redis 安装成功。

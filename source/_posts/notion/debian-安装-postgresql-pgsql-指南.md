---
title: "Debian 安装 PostgreSQL（pgsql）指南"
date: 2026-06-17 18:12
description: debian系统上安装pqsql
tags:
  - system
categories:
  - [system]
notion_id: 382841bd-614d-8002-b017-e35b61a84652
---

# Debian 安装 PostgreSQL（pgsql）指南

## 方法一：使用 Debian 官方仓库安装

### 1. 更新软件包列表

```bash
sudo apt update
```

### 2. 安装 PostgreSQL

```bash
sudo apt install postgresql postgresql-contrib -y
```

### 3. 查看服务状态

```bash
sudo systemctl status postgresql
```

启动并设置开机自启：

```bash
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### 4. 查看版本

```bash
psql --version
```

示例输出：

```plain text
psql (PostgreSQL) 15.13
```

---

## 方法二：安装 PostgreSQL 官方最新版本

### 1. 安装依赖

```bash
sudo apt update
sudo apt install wget curl gnupg2 lsb-release -y
```

### 2. 导入 PostgreSQL 官方 GPG Key

```bash
curl -fsSL <https://www.postgresql.org/media/keys/ACCC4CF8.asc> | \
sudo gpg --dearmor -o /usr/share/keyrings/postgresql.gpg
```

### 3. 添加 PostgreSQL 官方仓库

```bash
echo "deb [signed-by=/usr/share/keyrings/postgresql.gpg] \
<http://apt.postgresql.org/pub/repos/apt> \
$(lsb_release -cs)-pgdg main" | \
sudo tee /etc/apt/sources.list.d/pgdg.list
```

### 4. 更新仓库并安装 PostgreSQL

安装 PostgreSQL 17：

```bash
sudo apt update
sudo apt install postgresql-17 postgresql-client-17 -y
```

安装 PostgreSQL 16：

```bash
sudo apt install postgresql-16 postgresql-client-16 -y
```

---

## 登录 PostgreSQL

切换到 postgres 用户：

```bash
sudo -i -u postgres
```

进入 PostgreSQL：

```bash
psql
```

查看数据库列表：

```sql
\l
```

退出：

```sql
\q
```

---

## 创建数据库用户

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
```

## 创建数据库

```sql
CREATE DATABASE mydb OWNER myuser;
```

## 授权

```sql
GRANT ALL PRIVILEGES ON DATABASE mydb TO myuser;
```

---

## 配置远程访问

### 修改 PostgreSQL 配置

编辑：

```bash
sudo vim /etc/postgresql/*/main/postgresql.conf
```

找到：

```plain text
#listen_addresses = 'localhost'
```

修改为：

```plain text
listen_addresses = '*'
```

### 修改访问控制配置

编辑：

```bash
sudo vim /etc/postgresql/*/main/pg_hba.conf
```

添加：

```plain text
host    all    all    0.0.0.0/0    scram-sha-256
```

### 重启 PostgreSQL

```bash
sudo systemctl restart postgresql
```

---

## 防火墙开放 5432 端口

使用 UFW：

```bash
sudo ufw allow 5432/tcp
```

---

## 常用命令

查看 PostgreSQL 集群：

```bash
pg_lsclusters
```

查看服务状态：

```bash
sudo systemctl status postgresql
```

重启服务：

```bash
sudo systemctl restart postgresql
```

停止服务：

```bash
sudo systemctl stop postgresql
```

查看监听端口：

```bash
ss -lntp | grep 5432
```

---

## 验证连接

本机连接：

```bash
psql -U myuser -d mydb -h localhost
```

远程连接：

```bash
psql -U myuser -d mydb -h <服务器IP> -p 5432
```

---
title: openvpn linux系统安装和使用
date: 2024-01-02 11:14
description: openvpn在Linux系统如何使用
tags:
  - tool
categories:
  - [tool]
notion_id: 8e3416ed-602d-4ff3-bd5c-bd1169193e88
---

### **安装 OpenVPN：**

### 使用包管理器安装：

在大多数 Linux 发行版上，你可以使用包管理器来安装 OpenVPN。以下是一些常见发行版的安装命令：

- **Ubuntu/Debian**：

```shell
sudo apt update
sudo apt install openvpn
```

- **CentOS/RHEL**：

```shell
sudo yum install epel-release
sudo yum install openvpn
```

- **Fedora**：

```shell
sudo dnf install openvpn
```

### **配置和使用 OpenVPN：**

1. **获取 OpenVPN 配置文件：**
通常，你需要从 OpenVPN 服务提供商或管理员处获得配置文件。这个文件通常以 **`.ovpn`** 结尾。

1. **使用 OpenVPN 连接：**
在终端中使用 **`sudo`** 权限运行 OpenVPN，指定你的配置文件。例如，假设你的配置文件是 **`client.ovpn`**：

```shell
sudo openvpn --config client.ovpn
```

这将启动 OpenVPN 并使用给定的配置文件连接到指定的服务器。连接成功后，你可以在终端中看到相关日志信息。

1. **身份验证：**
OpenVPN 连接可能需要用户名和密码或其他身份验证信息。有些配置文件会在连接时要求输入这些信息。

1. **使用 ****`Ctrl + C`**** 停止连接：**
当你想断开连接时，可以在终端上按下 **`Ctrl + C`** 来停止 OpenVPN 连接。

1. **管理 OpenVPN 连接：**
你可以使用 **`sudo systemctl start openvpn@config_file.service`**、**`sudo systemctl stop openvpn@config_file.service`**、**`sudo systemctl status openvpn@config_file.service`** 等命令来管理 OpenVPN 连接，其中 **`config_file`** 是你的配置文件名称。

## 执行脚本

需要先给脚本权限

### **权限**

```shell
chmod +x my_script.sh
```

## 脚本

```shell
#!/bin/bash

# 连接 OpenVPN 服务器的配置文件路径
CONFIG_FILE="path/to/your/openvpn/config.ovpn"

# 存储用户名和密码的文件路径
CREDENTIALS_FILE="path/to/your/openvpn/credentials.txt"
USERNAME="your_username"
PASSWORD="your_password"

# 创建包含用户名和密码的文件
echo -e "$USERNAME\n$PASSWORD" > "$CREDENTIALS_FILE"

# 检查是否已经安装 OpenVPN
if ! command -v openvpn &> /dev/null; then
    echo "OpenVPN is not installed. Please install it first."
    exit 1
fi

# 检查配置文件是否存在
if [ ! -f "$CONFIG_FILE" ]; then
    echo "OpenVPN configuration file not found."
    exit 1
fi

# 执行 OpenVPN 连接，使用存储的用户名和密码文件
sudo openvpn --config "$CONFIG_FILE" --auth-user-pass "$CREDENTIALS_FILE"

# 清除凭据文件
rm -f "$CREDENTIALS_FILE"
```

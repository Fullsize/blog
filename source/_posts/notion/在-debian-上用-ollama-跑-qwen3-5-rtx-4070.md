---
title: "在 Debian 上用 Ollama 跑 Qwen3.5（RTX 4070）"
date: 2026-03-23 10:17
description: 初步安装
tags:
  - system
categories:
  - system
notion_id: 32c841bd-614d-80bd-9509-d69900263878
---

# 在 Debian 上用 Ollama 跑 Qwen3.5（RTX 4070）

> 适用环境：Debian Linux + NVIDIA RTX 4070（12GB 显存）

---

## 第一步：确认 NVIDIA 驱动正常

```bash
nvidia-smi
```

正常输出应显示 `NVIDIA GeForce RTX 4070` 和 `12288MiB` 显存。

如果报错，先安装驱动：

```bash
sudo apt update
sudo apt install -y nvidia-driver firmware-misc-nonfree
sudo reboot
```

---

## 第二步：安装 Ollama

```bash
curl -fsSL <https://ollama.com/install.sh> | sh
```

验证安装：

```bash
ollama --version
systemctl status ollama   # 确认服务在运行
```

---

## 第三步：拉取并运行 Qwen3.5

RTX 4070（12GB）推荐版本：

```bash
# 首选：9b（约 6.6GB，12GB 显存轻松跑）
ollama run qwen3.5:9b

# 或者 4b（更快，效果也不错）
ollama run qwen3.5:4b
```

> `qwen3.5:latest` 默认为 9b，支持 256K 超长上下文，支持文字和图片输入。

第一次运行会自动下载模型，请保持网络畅通。

---

## 第四步：验证 GPU 是否在使用

另开一个终端运行：

```bash
watch -n 1 nvidia-smi
```

对话时看到 GPU 利用率上升、显存占用约 6-7GB，说明正在使用 GPU。

---

## 第五步：使用思考模式

Qwen3.5 支持深度思考模式，在对话中直接输入：

```plain text
/think      # 开启深度推理（慢但更准）
/no_think   # 关闭思考模式（快速回复）
```

---

## 可选：API 方式调用

Ollama 默认在 `localhost:11434` 提供 API：

```bash
curl <http://localhost:11434/api/chat> \\
  -d '{
    "model": "qwen3.5:9b",
    "messages": [{"role": "user", "content": "你好，介绍一下你自己"}]
  }'
```

---

## RTX 4070 显存对照表

---

## 常用命令速查

```bash
# 查看已下载的模型
ollama list

# 停止运行中的模型
ollama stop qwen3.5:9b

# 删除模型
ollama rm qwen3.5:9b

# 查看运行日志
journalctl -u ollama -f
```

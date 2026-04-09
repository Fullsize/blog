---
title: OpenClaw 连接本地 Ollama 模型
date: 2026-03-23 11:02
description: 本地运行open claw
tags:
  - system
  - ai
categories:
  - system
  - ai
notion_id: 32c841bd-614d-8002-a2f4-ca12b19a7e93
---

# OpenClaw 连接本地 Ollama 模型

## 方法一：官方一键启动（最简单）

Ollama 内置了 OpenClaw 的集成命令，会自动配置 provider、安装 gateway 守护进程、设置模型，并安装 web search 插件：

```bash
ollama launch clawdbot
```

---

## 方法二：手动配置（更灵活）

### 第一步：确保 Ollama 正在运行并拉取模型

```bash
# 验证 Ollama 运行状态
curl http://localhost:11434/api/tags

# 拉取推荐模型（按显存选择）
ollama pull llama3.3        # 8GB+ VRAM
ollama pull qwen2.5:14b     # 16GB+ VRAM，复杂任务更佳
ollama pull glm4-flash      # 25GB VRAM，推理+代码
```

> 推荐从 **Llama 3.3 8B** 开始，适合 8GB 内存，能可靠处理常规任务。复杂多步骤任务和代码场景推荐 **Qwen 2.5 14B**，需要 16GB 内存。

---

### 第二步：安装 OpenClaw

```bash
npm install -g openclaw
```

> ⚠️ OpenClaw 需要 **Node.js 22** 或更新版本。

---

### 第三步：修改配置文件

编辑 `~/.openclaw/openclaw.json`：

```json
{
  "models": {
    "providers": {
      "ollama": {
        "baseUrl": "http://127.0.0.1:11434/v1",
        "apiKey": "ollama-local",
        "api": "openai-responses",
        "models": [
          {
            "id": "llama3.3:latest",
            "name": "Llama 3.3",
            "contextWindow": 65536,
            "maxOutput": 8192
          }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "ollama/llama3.3:latest"
      }
    }
  }
}
```

---

### 第四步：重启 gateway 并验证

```bash
openclaw gateway restart
openclaw models list
openclaw models status
```

---

## ⚠️ 常见问题与解决办法

> 非 OpenAI 原生 provider 建议使用 `openai-completions` 而非 `openai-responses`，后者在系统提示的 role 处理上可能有兼容性问题。

> 建议本地模型的上下文窗口至少配置 **64k tokens**，以保证 agent 任务的正常运行。

---

## 硬件参考

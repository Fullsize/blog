---
title: OpenAI API Key 创建指南
date: 2026-03-23 18:06
description: 如何创建你的open ai key
tags:
  - ai
categories:
  - [ai]
notion_id: 32c841bd-614d-801a-83f4-eabe4be91695
---

# OpenAI API Key 创建指南

## 第一步：注册 / 登录账号

前往 [platform.openai.com](https://platform.openai.com/) 登录。

> ⚠️ **注意**：API 平台账号与 ChatGPT 账号是**完全独立**的两个系统。即使你已有 ChatGPT 订阅，也需要单独注册 API 平台账号。

---

## 第二步：创建 API Key

1. 登录后，点击左侧菜单的 **Settings（设置）**

1. 进入 **API Keys** 页面

1. 点击 **"Create new secret key"**

1. 为密钥指定一个有意义的名称（如 `MyApp-Prod`）

1. **立即复制**生成的密钥 — 关闭弹窗后将无法再次查看

> 生成的密钥以 `sk-...` 开头，是用于 API 请求认证的敏感凭证。

---

## 第三步：添加付款方式

1. 点击左侧菜单的 **Billing**

1. 添加信用卡或其他支付方式

1. 建议初次充值小额（如 **$5**），每次请求仅需几分钱甚至更少

---

## 安全注意事项

---

## 快速使用示例

```bash
# 设置环境变量
export OPENAI_API_KEY="sk-your-key-here"
```

```python
# Python 示例
from openai import OpenAI

client = OpenAI()  # 自动读取环境变量 OPENAI_API_KEY

response = client.chat.completions.create(
    model="gpt-4o",
    messages=[{"role": "user", "content": "Hello!"}]
)
print(response.choices[0].message.content)
```

---

## 直达链接

🔗 [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)

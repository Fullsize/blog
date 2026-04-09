---
title: OpenClaw 如何连接飞书
date: 2026-03-23 18:11
description: OpenClaw 如何连接飞书
tags:
  - ai
categories:
  - ai
notion_id: 32c841bd-614d-8091-b38a-ee54b10f56a2
---

# OpenClaw 如何连接飞书

## 一、在飞书开放平台创建应用

1. 访问 [https://open.feishu.cn/app](https://open.feishu.cn/app)，点击「创建企业自建应用」

1. 填写应用名称（如"我的 OpenClaw AI"）和描述

1. 进入「凭证与基础信息」页面，复制 **App ID**（格式如 `cli_xxx`）和 **App Secret**，后面要用到

---

## 二、配置应用权限

在左侧导航栏点击「权限管理」→「批量导入/导出权限」，粘贴所需的 JSON 权限配置，点击下一步并申请开通。

---

## 三、安装飞书插件并配置 Channel

> **注意：** OpenClaw ≥ 2026.2 已内置飞书插件（`@openclaw/feishu`），不需要手动 `openclaw plugins install`，直接配置即可。

在终端执行：

```bash
# 添加飞书渠道（交互式引导）
openclaw channels add
```

选择 **"Feishu/Lark (飞书)"**，依次输入 App Secret 和 App ID，设置连接模式并使用国内域名。群聊策略选择：

- **Open** — 响应所有群聊

- **Allowlist** — 只响应白名单群聊

选完后回到菜单选择 Finished，其他按默认回车即可。

---

## 四、开启机器人能力

回到飞书应用界面，左侧菜单 → 「添加应用能力」→「机器人」，点击「添加」按钮开启机器人能力。

---

## 五、配置事件订阅（长连接）

1. 在飞书开放平台左侧导航栏点击「事件与回调」→「事件配置」

1. 「订阅方式」选择 **使用长连接接收事件（WebSocket）**，保存

1. 点击「添加事件」，搜索 `im.message.receive_v1`（接收消息），确认添加

> **优势：** 使用 WebSocket 长连接，不需要公网 IP、不需要域名、不需要内网穿透。

---

## 六、重启网关并验证

```bash
openclaw gateway restart

# 查看日志确认连接成功
openclaw logs --follow
```

在「版本管理与发布」页面创建版本，填写版本号和更新说明，提交审核并发布。

发布后在飞书里给机器人发"你好"，正常收到回复说明流程跑通了。

---

## 常见问题

---

## 扩展：飞书官方 OpenClaw 插件

飞书还推出了官方 OpenClaw 插件，经用户 OAuth 授权后，OpenClaw 可以以"你的"身份：

- 读取文档

- 理解群聊上下文

- 核对日历

- 创建多维表格

> 如需安装此插件，请参考飞书开放平台文档进一步配置。

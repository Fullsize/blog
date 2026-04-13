---
title: 在 Win10 系统自带输入法上快速设置小鹤双拼方案
date: 2026-03-24 23:48
description: windows不安装输入法开启小鹤双拼
tags:
  - system
categories:
  - [system]
notion_id: 32d841bd-614d-80ce-9032-efcc141ffe1b
---

1. 打开 Powershell 命令行：运行 ( `Win` + `R` )，输入 `cmd`

1. 输入以下内容

```plain text
reg add HKCU\Software\Microsoft\InputMethod\Settings\CHS /v UserDefinedDoublePinyinScheme0 /t REG_SZ /d "小鹤双拼*2*^*iuvdjhcwfg^xmlnpbksqszxkrltvyovt"
```

>

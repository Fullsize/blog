---
title: Request header field Authorization is not allowed by Access-Control-Allow-Headers in preflight response
date: 2022-04-11 10:26
description: "发起请求时，提示自定义的某个header无法通过验证"
tags:
  - 注意
categories:
  - header
notion_id: cd15f475-b383-49a5-bfeb-965fe243f794
---

### 问题: 后端已设置Access-Control-Allow-Headers为\*（通配符）

### 原因:

- ** (wildcard)**

对于没有凭据的请求（没有HTTP cookie或HTTP认证信息的请求），值“ `*`”仅作为特殊的通配符值。 在具有凭据的请求中，它被视为没有特殊语义的文字标头名称“ \*”。 请注意，[`Authorization`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Authorization)标头不能使用通配符，并且始终需要明确列出。

### 解决:

单独加了`Authorization`

```shell
Access-Control-Allow-Headers:['*','Authorization']
```

### 来源:

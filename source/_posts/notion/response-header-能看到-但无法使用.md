---
title: "response header 能看到，但无法使用"
date: 2022-01-17 15:43
description: 如标题
tags:
  - javascript
  - header
categories:
  - javascript
  - header
notion_id: d8b3c1d8-146e-4534-882e-f29d2f3c0e16
---

默认情况下，header只有六种 simple response headers （简单响应首部）可以暴露给外部：

Cache-ControlContent-LanguageContent-TypeExpiresLast-ModifiedPragma这里的暴露给外部，意思是让客户端可以访问得到，既可以在Network里看到，也可以在代码里获取到他们的值。

上面问题提到的content-disposition不在其中，所以即使服务器在协议回包里加了该字段，但因没“暴露”给外部，客户端就“看得到，吃不到”。

而响应首部 Access-Control-Expose-Headers 就是控制“暴露”的开关，它列出了哪些首部可以作为响应的一部分暴露给外部。

所以如果想要让客户端可以访问到其他的首部信息，服务器不仅要在heade里加入该首部，还要将它们在 Access-Control-Expose-Headers 里面列出来

![](/images/notion/response-header-能看到-但无法使用/1.png)

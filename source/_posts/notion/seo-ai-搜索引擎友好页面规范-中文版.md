---
title: "SEO + AI 搜索引擎友好页面规范（中文版）"
date: 2026-06-09 10:22
tags:
  - seo
categories:
  - [seo]
notion_id: 37a841bd-614d-80b0-8453-ed1bc598554c
---

# SEO + AI 搜索引擎友好页面规范（中文版）

> 适用于 Google、Bing、ChatGPT Search、Perplexity、Gemini、Claude 等搜索引擎与 AI 搜索平台。

---

# 一、页面基础 SEO

## 1. Title（页面标题）

### 示例

```html
<title>AI SEO 完整指南：如何让内容被 ChatGPT 和 Google AI Overview 引用</title>
```

### 要求

- 包含核心关键词

- 长度控制在 50~60 个字符

- 明确表达页面主题

- 关键词尽量靠前

---

## 2. Meta Description（页面描述）

### 示例

```html
<meta name="description" content="学习 AI SEO 优化方法，提高内容在 ChatGPT、Perplexity、Gemini 和 Google AI Overview 中的曝光与引用率。">
```

### 要求

- 长度控制在 120~160 字符

- 概括页面核心价值

- 提升搜索结果点击率

---

## 3. H1 标题

每个页面仅保留一个 H1。

### 示例

```html
<h1>AI SEO 完整优化指南</h1>
```

---

# 二、内容结构优化

## 4. 开头直接给答案（最重要）

AI 搜索引擎喜欢直接提取明确答案。

### 错误示例

```plain text
随着人工智能的发展，越来越多企业开始关注搜索引擎优化...
```

### 正确示例

```plain text
AI SEO 是一种帮助内容被 ChatGPT、Perplexity 和 Google AI Overview 理解、引用和推荐的优化方法。
```

### 要求

- 前 100 字内出现答案

- 简洁明确

- 可以独立被引用

---

## 5. AI 摘要（AI Summary）

建议放在正文开始位置。

### 示例

```html
<h2>AI 摘要</h2>

<p>
AI SEO 的核心目标是帮助内容更容易被 AI 理解、提取和引用。
</p>
```

### 作用

- 提高 AI 抓取效率

- 提升 AI 引用概率

---

## 6. 重点总结（Key Takeaways）

### 示例

```html
<ul>
<li>建立清晰的页面结构</li>
<li>添加 FAQ 内容与 Schema</li>
<li>引用权威数据来源</li>
<li>明确页面实体信息</li>
</ul>
```

### 作用

- AI 更容易提取内容

- 用户快速理解核心观点

---

# 三、页面结构设计

推荐结构：

```plain text
H1

├── H2 什么是 AI SEO
├── H2 AI 搜索如何工作
├── H2 AI SEO 优化方法
├── H2 实际案例
├── H2 常见问题 FAQ
```

### 原则

- H1 仅一个

- H2 作为主要章节

- H3 作为子章节

- 结构清晰可读

---

# 四、FAQ 优化

## 页面必须有真实 FAQ

### 示例

```html
<h2>常见问题</h2>

<h3>什么是 AI SEO？</h3>
<p>AI SEO 是针对 AI 搜索引擎的内容优化方法。</p>

<h3>ChatGPT 如何选择引用来源？</h3>
<p>ChatGPT 更倾向于引用结构清晰、可信度高且内容完整的网站。</p>
```

---

## FAQ Schema

页面 FAQ 内容与 Schema 必须保持一致。

### 禁止

❌ 页面没有 FAQ

但添加了：

```json
FAQ Schema
```

这是 Google 明确不推荐的做法。

---

# 五、Schema 结构化数据

## Article Schema

```json
{
 "@context":"https://schema.org",
 "@type":"Article",
 "headline":"AI SEO 指南"
}
```

---

## FAQ Schema

```json
{
 "@context":"https://schema.org",
 "@type":"FAQPage"
}
```

---

## Organization Schema

```json
{
 "@context":"https://schema.org",
 "@type":"Organization",
 "name":"公司名称"
}
```

---

# 六、作者与 E-E-A-T

页面建议展示：

```plain text
作者：张三

SEO 从业经验：10年

LinkedIn

Github

个人主页
```

---

## E-E-A-T 四要素

### Experience（经验）

展示真实实践经验。

### Expertise（专业性）

展示行业知识与专业能力。

### Authoritativeness（权威性）

建立行业影响力。

### Trustworthiness（可信度）

增加用户与搜索引擎信任。

---

# 七、数据与引用

AI 搜索引擎更喜欢引用有数据支撑的内容。

### 示例

```plain text
根据 Semrush 数据，AI Overview 已出现在超过 40% 的信息类搜索结果中。
```

### 不推荐

```plain text
AI Overview 非常普遍。
```

缺少数据支撑。

---

# 八、表格优化

推荐大量使用表格。

### 示例

### 优势

- AI 容易提取

- 用户阅读效率高

---

# 九、图片优化

### 示例

```html
<img
 src="ai-seo-guide.png"
 alt="AI SEO 优化流程图"
/>
```

### 要求

- 文件名语义化

- Alt 文本准确描述图片

- 与页面主题相关

---

# 十、实体优化（Entity SEO）

页面中明确出现行业实体。

### 示例

```plain text
ChatGPT（OpenAI）

Gemini（Google）

Claude（Anthropic）

Perplexity AI
```

### 作用

帮助 AI 建立实体关联关系。

---

# 十一、内链体系

推荐建立 Topic Cluster。

```plain text
AI SEO 指南
↓
Schema 指南
↓
LLMs.txt 指南
↓
技术 SEO 指南
```

### 作用

- 提高页面权重传递

- 强化主题相关性

---

# 十二、页面速度

目标指标：

---

# 十三、AI 专属优化

## llms.txt

网站根目录建议增加：

```plain text
/llms.txt
```

示例：

```plain text
# 公司简介

AI SEO 优化平台

## 产品

https://example.com/product

## 文档

https://example.com/docs

## 定价

https://example.com/pricing
```

---

## pricing.md

示例：

```markdown
# 价格方案

## 基础版

¥99/月

## 专业版

¥299/月

## 企业版

联系销售
```

### 作用

帮助 AI Agent 理解产品和价格体系。

---

# 十四、隐藏内容规范

## 安全做法

以下内容可以折叠：

- FAQ 折叠面板

- Tab 标签页

- 移动端菜单

- 展开/收起内容

- 无障碍辅助文本

---

## 高风险做法

禁止以下方式：

- display:none 隐藏大量关键词

- 白字白底

- font-size:0

- 将内容移出屏幕

- 页面没有内容但 Schema 存在

---

## 最佳实践

✅ 用户能看到的内容可以折叠

❌ 用户看不到但搜索引擎能看到的 SEO 内容不要隐藏

---

# 页面上线检查清单

## SEO

Title 已优化

Meta Description 已配置

H1 唯一

H2/H3 结构合理

图片 Alt 已填写

页面加载速度达标

内链已建立

## AI SEO

开头直接回答问题

AI Summary 已添加

Key Takeaways 已添加

FAQ 已添加

FAQ Schema 已添加

Article Schema 已添加

Organization Schema 已添加

数据来源已引用

作者信息已展示

实体信息明确

llms.txt 已配置

pricing.md 已配置

---

# 最终目标

一个优秀的 SEO + AI SEO 页面应同时满足：

- Google 排名能力

- Bing 排名能力

- ChatGPT 引用能力

- Perplexity 引用能力

- Gemini 引用能力

- Claude 引用能力

做到「用户看得懂、搜索引擎读得懂、AI 能引用」。

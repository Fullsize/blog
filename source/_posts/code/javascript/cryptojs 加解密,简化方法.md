---
title: cryptojs 加解密,简化方法
date: 2025-10-10 13:39
tags:
  - javascript
categories:
  - 技术
  - 学习
  - 配置
---

```jsx
import crypto from "crypto";

const KEY = Buffer.from("12345678901234567890123456789012"); // 32 字节 AES-256

/**
 * AES 加密，返回 Hex 字符串
 * 格式: 前32字符 IV + 后面密文
 */
export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16); // 16 字节 IV
  const cipher = crypto.createCipheriv("aes-256-cbc", KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  // 拼接 IV + 密文，并转 Hex
  return iv.toString("hex") + encrypted.toString("hex");
}

/**
 * AES 解密 Hex 字符串
 * @param data Hex 字符串
 * @returns 明文
 */
export function decrypt(data: string): string {
  const iv = Buffer.from(data.slice(0, 32), "hex"); // 前32字符是 IV
  const encrypted = Buffer.from(data.slice(32), "hex");

  const decipher = crypto.createDecipheriv("aes-256-cbc", KEY, iv);
  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
}
```

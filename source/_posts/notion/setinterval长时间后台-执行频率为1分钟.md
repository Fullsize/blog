---
title: "setinterval长时间后台，执行频率为1分钟"
date: 2021-11-03 17:52
description: 定时器进入后台的节流
tags:
  - browser
categories:
  - [browser]
notion_id: f2d5b77e-c532-42dc-8fa2-206ce59ea1d5
---

### Intensive throttling

OK, here's the new bit in Chrome 88. Intensive throttling happens to timers that are scheduled when none of the *minimal throttling* or *throttling* conditions apply, and *all* of the following conditions are true:

- The page has been *hidden* for more than 5 minutes.

- The *chain count* is 5 or greater.

- The page has been silent for at least 30 seconds.

- WebRTC is not in use.

In this case, the browser will check timers in this group once per **minute**. Similar to before, this means timers will batch together in these minute-by-minute checks.

## 参考链接：

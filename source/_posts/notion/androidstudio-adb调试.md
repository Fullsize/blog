---
title: AndroidStudio ADB调试
date: 2021-05-11 16:10
description: ADB连接设备和指令
tags:
  - tool
categories:
  - [tool]
notion_id: 053d4524-b96d-47ca-9c74-f18d2a849b9a
---

### 什么是 ADB?

Android调试桥（ adb ）是一个开发工具，帮助安卓设备和个人计算机之间的通信。 这种通信大多是在USB电缆下进行，但是也支持Wi-Fi连接。 adb 还可被用来与电脑上运行的安卓模拟器交流通信。 adb 对于安卓开发来说就像一把“瑞士军刀”。

## 通过 Homebrew 安装

```javascript
brew cask install android-platform-tools
网友提醒 2021更新
brew install --cask android-platform-tools
```

## 测试是否正常安装

```javascript
adb devices
```

## 连接

```javascript
adb connect ip地址
```

## 指令

![](/images/notion/androidstudio-adb调试/1.png)

> （注： 在 macOS 下需要给 :W 这样以 \* 作为 tag 的参数加双引号，如 adb logcat ":W"，不然会报错 no matches found: \*:W。）

## 来源

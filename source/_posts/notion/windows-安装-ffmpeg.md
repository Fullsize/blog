---
title: Windows 安装 FFmpeg
date: 2026-03-30 09:53
tags:
  - system
categories:
  - [system]
notion_id: 333841bd-614d-80c7-9d0c-dcc77514cdcd
---

# Windows 安装 FFmpeg

## 方法一：使用 winget（推荐，Windows 10/11）

打开 PowerShell 或命令提示符，运行：

```bash
winget install ffmpeg
```

安装完成后重启终端即可使用。

---

## 方法二：手动安装

### 1. 下载

前往 [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)，点击 Windows 图标，选择 **gyan.dev** 或 **BtbN** 提供的构建版本，下载 `ffmpeg-release-full.zip`。

### 2. 解压

将压缩包解压到一个固定目录，例如：

```plain text
C:\ffmpeg
```

确保目录结构如下：

```plain text
C:\ffmpeg\bin\ffmpeg.exe
C:\ffmpeg\bin\ffplay.exe
C:\ffmpeg\bin\ffprobe.exe
```

### 3. 添加环境变量

1. 按 `Win + S` 搜索「环境变量」，打开「编辑系统环境变量」

1. 点击「环境变量」按钮

1. 在「系统变量」中找到 `Path`，双击编辑

1. 点击「新建」，输入 `C:\ffmpeg\bin`

1. 一路点击「确定」保存

### 4. 验证安装

打开新的命令提示符，运行：

```bash
ffmpeg -version
```

看到版本信息即表示安装成功。

---

## 方法三：使用 Chocolatey

```bash
choco install ffmpeg
```

## 方法四：使用 Scoop

```bash
scoop install ffmpeg
```

---

## 升级 FFmpeg

推荐使用 winget 或 Scoop，可以方便地后续升级：

```bash
# winget
winget upgrade ffmpeg

# Scoop
scoop update ffmpeg
```

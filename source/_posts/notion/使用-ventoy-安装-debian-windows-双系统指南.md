---
title: "使用 Ventoy 安装 Debian + Windows 双系统指南"
date: 2026-03-23 09:45
description: "使用 Ventoy 安装 Debian + Windows 双系统指南"
tags:
  - system
categories:
  - [system]
notion_id: 32c841bd-614d-80b1-96d0-edaaa54e7f96
---

# 使用 Ventoy 安装 Debian + Windows 双系统指南

> 适用场景：在同一台电脑上安装 Windows 和 Debian，使用 Ventoy 制作启动盘。

---

## 一、准备工作

### 1.1 所需材料

- U 盘（建议 ≥ 16GB，速度越快越好）

- Windows ISO 镜像（建议从微软官网下载）

- Debian ISO 镜像（建议 `netinst` 或完整 DVD 版）

- Ventoy 工具（[https://www.ventoy.net](https://www.ventoy.net/)）

### 1.2 确认固件类型

```bash
# 在 Linux 下查看是否支持 UEFI
ls /sys/firmware/efi
```

- 存在该目录 → **UEFI 模式**（现代电脑主流）

- 不存在 → **Legacy BIOS 模式**

> ⚠️ **关键原则**：Windows 和 Debian 必须使用**相同的启动模式**（同为 UEFI 或同为 Legacy），否则引导会出问题。

---

## 二、安装顺序（重要！）

```plain text
推荐顺序：先装 Windows → 再装 Debian
```

- Windows 安装程序会覆盖 MBR/EFI 分区，可能破坏 Grub

- Debian 的 Grub 能自动检测并添加 Windows 启动项

- 先装 Linux 后装 Windows，需要额外修复 Grub

---

## 三、Ventoy 制作启动盘

### 3.1 安装 Ventoy 到 U 盘

1. 下载 Ventoy，解压后运行 `Ventoy2Disk.exe`（Windows）或 `./VentoyGUI.x86_64`（Linux）

1. 选择 U 盘，注意分区类型：

  - UEFI 模式 → 选 **GPT**

  - Legacy BIOS → 选 **MBR**

1. 点击安装，U 盘会被格式化，分为 Ventoy 引导区 + 数据区

### 3.2 添加 ISO

直接将 ISO 文件复制到 U 盘数据分区根目录即可：

```plain text
U盘/
├── Win11_23H2_Chinese_x64.iso
└── debian-12.x.x-amd64-netinst.iso
```

> ✅ Ventoy 会在启动时列出所有 ISO，无需任何配置

---

## 四、磁盘分区规划

### 4.1 UEFI + GPT 分区方案（推荐）

> ⚠️ EFI 分区只需要一个，Windows 和 Debian 共用同一个 ESP

### 4.2 Legacy BIOS + MBR 分区方案

- MBR 最多支持 4 个主分区，建议用扩展分区

- Windows 需要一个主分区

- Debian 可安装在逻辑分区中

---

## 五、安装 Windows

1. 重启，从 Ventoy U 盘启动，选择 Windows ISO

1. 进入安装界面，选择"自定义安装"

1. 手动创建/选择分区（建议先只建 EFI + Windows 分区，留出 Debian 的空间）

1. 完成安装，激活 Windows

> ⚠️ **注意**：Windows 安装时不要占用全部磁盘空间，提前留出 Debian 的空间（至少 30GB）

---

## 六、安装 Debian

### 6.1 启动 Debian 安装程序

1. 重启，从 Ventoy 选择 Debian ISO

1. 选择 `Graphical Install` 或 `Install`

### 6.2 关键分区步骤

- 选择"手动分区"

- 使用 Windows 留出的空闲空间创建：

  - `/`（根分区，ext4）

  - `swap`（可选）

  - `/home`（可选，ext4）

- **不要格式化 EFI 分区**，只需挂载到 `/boot/efi`

### 6.3 Grub 安装位置

- UEFI 模式：安装到 EFI 分区（自动检测）

- Legacy 模式：安装到磁盘 MBR（如 `/dev/sda`），**不要安装到某个分区**

---

## 七、常见问题与注意事项

### ⚠️ 安全启动（Secure Boot）

- Windows 默认开启 Secure Boot

- Debian 支持 Secure Boot，但某些配置可能有问题

- 建议在 BIOS 中**暂时关闭 Secure Boot** 安装 Debian，安装完成后再视情况开启

### ⚠️ 快速启动（Fast Startup）

Windows 的快速启动会导致 NTFS 分区被锁定，Debian 无法挂载 Windows 分区：

```plain text
控制面板 → 电源选项 → 选择电源按钮的功能 → 关闭快速启动
```

### ⚠️ BitLocker

- 若 Windows 开启了 BitLocker，切换系统可能触发恢复密钥验证

- 建议安装双系统前暂停 BitLocker

### ⚠️ 时钟问题

Windows 使用本地时间，Linux 使用 UTC，双系统时钟会出现 ±8 小时偏差：

**方案一（推荐）：让 Linux 也用本地时间**

```bash
sudo timedatectl set-local-rtc 1 --adjust-system-clock
```

**方案二：让 Windows 用 UTC（需改注册表）**

### ⚠️ Windows 更新覆盖 Grub

Windows 大版本更新有时会覆盖 EFI 引导项，导致无法进入 Debian。

修复方法（用 Debian Live ISO 进入系统后）：

```bash
sudo mount /dev/sdaX /mnt          # 挂载根分区
sudo mount /dev/sda1 /mnt/boot/efi # 挂载 EFI 分区
sudo grub-install --target=x86_64-efi --efi-directory=/mnt/boot/efi
sudo update-grub
```

### ⚠️ NVME + Windows 驱动

部分电脑需要在 Windows 安装时手动加载 NVME 驱动，否则安装程序识别不到硬盘。

---

## 八、Ventoy 特别注意事项

---

## 九、安装后验证清单

重启后 Grub 菜单显示 Windows 和 Debian 两个选项

两个系统均能正常进入

Windows 时间显示正常

Debian 可以识别并（只读）挂载 Windows 分区

网络、声卡、显卡等硬件驱动正常

---

## 十、参考资源

- Ventoy 官方文档：[https://www.ventoy.net/cn/doc\_start.html](https://www.ventoy.net/cn/doc_start.html)

- Debian 安装手册：[https://www.debian.org/releases/stable/amd64/](https://www.debian.org/releases/stable/amd64/)

- ArchWiki 双系统指南（通用性强）：[https://wiki.archlinux.org/title/Dual\_boot\_with\_Windows](https://wiki.archlinux.org/title/Dual_boot_with_Windows)

---

> 💡 **最后提示**：操作前务必备份重要数据，分区操作有数据丢失风险。

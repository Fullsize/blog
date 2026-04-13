---
title: aws cli 使用
date: 2025-05-09 09:30
description: aws 命令行操作
tags:
  - tool
categories:
  - [tool]
notion_id: 1ee841bd-614d-800e-a53e-d466d286595b
---

## 📦 **安装 AWS CLI**

### 1️⃣ **检查是否已安装**

```shell
aws --version
```

### 2️⃣ **安装（以 macOS/Linux 为例）**

```shell
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

```

Windows 可以直接下载 [AWS CLI MSI 安装包](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2-windows.html)。

## 🔑 **配置 AWS CLI**

```bash
aws configure
```

系统会要求输入：

- **AWS Access Key ID**

- **AWS Secret Access Key**

- **默认区域（如：us-east-1、ap-northeast-1）**

- **默认输出格式（如：json、yaml、text）**

![](/images/notion/aws-cli-使用/1.png)

### 🛠 **常用命令示例**

✅ **S3**

- 列出存储桶：

```shell
aws s3 ls
```

- 上传文件：

```shell

aws s3 cp localfile.txt s3://your-bucket-name/

```

文件夹:

```bash
aws s3 cp /path/to/local/folder s3://your-bucket-name/ --recursive
```

- 下载文件：

```shell

aws s3 cp s3://your-bucket-name/remote.txt localfile.txt


```

✅ **EC2**

- 列出实例：

```bash
aws ec2 describe-instances
```

- 启动实例：

```shell

aws ec2 start-instances --instance-ids i-1234567890abcdef0


```

- 停止实例：

```shell
aws ec2 stop-instances --instance-ids i-1234567890abcdef0


```

✅ **Lambda**

- 列出函数：

```shell
aws lambda list-functions


```

- 调用函数：

```shell
aws lambda invoke --function-name my-function-name output.json

```

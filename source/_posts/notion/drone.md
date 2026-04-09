---
title: drone
date: 2023-10-27 10:51
description: "drone 安装，不太符合公司业务情况"
tags:
  - 架构
categories:
  - tool
notion_id: 5ef146a6-88e0-4fd9-9982-96dde9cb440a
---

```docker
docker run \
  --volume=/var/lib/drone:/data \
	# github or gitlab 地址
  --env=DRONE_GITLAB_SERVER=http://192.170.13.172:9980 \
	# OAuth 应用程序
  --env=DRONE_GITLAB_CLIENT_ID=cb1e4b10d09baaeff22687e6c09c77dfea2b8503f1f5ee0838f30699af5b40bf \
  --env=DRONE_GITLAB_CLIENT_SECRET=7b586102e15873334f09ef919ebb8217118c1f26fda4680239679d017a04f9bd \
  # 自生成ID
	--env=DRONE_RPC_SECRET=37742484fadbbd2dca5989510f975297 \
	# 生成的drone服务地址
  --env=DRONE_SERVER_HOST=192.170.13.183:3000 \
	# http or https
  --env=DRONE_SERVER_PROTO=http \
	--env=DRONE_USER_CREATE=username:octocat,admin:true
	# 端口号
  --publish=3000:80 \
  --publish=443:443 \
  --restart=always \
  --detach=true \
  --name=drone \
  drone/drone:2

  docker run --detach \
  --volume=/var/run/docker.sock:/var/run/docker.sock \
  --env=DRONE_RPC_PROTO=http \
	# 生成的drone服务地址
  --env=DRONE_RPC_HOST=192.170.13.183:3000 \
	# 自生成ID
  --env=DRONE_RPC_SECRET=37742484fadbbd2dca5989510f975297 \
  --env=DRONE_RUNNER_CAPACITY=2 \
  --env=DRONE_RUNNER_NAME=my-first-runner \、
	# 端口
  --publish=3001:3000 \
  --restart=always \
  --name=runner \
  drone/drone-runner-docker:1
	# 测试是否和runer链接成功
  docker logs runner
```

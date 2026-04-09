---
title: axios 封
date: 2021-11-23 16:01
description: axios的公用封装或处理
tags:
  - 配置
categories:
  - javascript
notion_id: 48753696-125f-42ea-be4d-6f20a26df508
---

```javascript
import axios from 'axios';
const instance = axios.create({
	baseURL: 'https://some-domain.com/api/',
	// timeout: 1000,
});
// 请求处理
instance.interceptors.request.use(
	requestConfig => {
		return {
			...requestConfig,
			params: {
				...requestConfig.params,
				debug: process.env.NODE_ENV === "production" ? undefined : 1
			}
		};
	},
	error => Promise.reject(error)
);
// 返回处理
instance.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		Promise.reject(error);
	}
);
export default instance;
```

## 减少重复请求

```javascript
import axios from "axios";
import qs from 'qs'

// 用于存储pending的请求（处理多条相同请求）
const pendingRequest = new Map()

// 生成request的唯一key
const generateRequestKey = (config:any = {}) => {
  // 通过url，method，params，data生成唯一key，用于判断是否重复请求
  // params为get请求参数，data为post请求参数
  const { url, method, params, data } = config
  return [url, method, qs.stringify(params), qs.stringify(data)].join('&')
}

// 将重复请求添加到pendingRequest中
const addPendingRequest = (config:any) => {
  const key = generateRequestKey(config)
  if (!pendingRequest.has(key)) {
    config.cancelToken = new axios.CancelToken(cancel => {
      pendingRequest.set(key, cancel)
    })
  }
}

// 取消重复请求
const removePendingRequest = (config:any) => {
  const key = generateRequestKey(config)
  if (pendingRequest.has(key)) {
    const cancelToken = pendingRequest.get(key)
    cancelToken(key) // 取消之前发送的请求
    pendingRequest.delete(key)// 请求对象中删除requestKey
  }
}

const instance = axios.create({
  baseURL,
  timeout: 1000 * 30,
  headers: {
    // '	Cache-Control': 'max-age=0',
    'Authorization': token,
    'x-auth-token': token
  }
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 处理重复请求
    removePendingRequest(config)
    addPendingRequest(config)

    return config
  },
  error => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  response => {
    // 移除重复请求
    removePendingRequest(response.config)
    
    return response 
  },
  error => {
    // 异常情况console，方便排查问题
    console.log('error', error)
    // 移除重复请求
    removePendingRequest(error.config || {})
    
    return Promise.reject(error)
  }
)
export default instance;
```

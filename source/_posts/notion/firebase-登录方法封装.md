---
title: firebase 登录方法封装
date: 2025-06-25 18:55
description: 封装firebase 的登录方法以便于使用和统一处理
tags:
  - javascript
categories:
  - [javascript]
notion_id: 21d841bd-614d-806a-8e3a-ee6d7e09eb09
---

在现代 Web 应用中，用户登录与身份验证是不可或缺的功能。Firebase 提供了完整的 Authentication 解决方案，支持多种登录方式（如 Google、Facebook、Apple、邮箱密码等），并与前端框架（如 React、Vue、Next.js）完美集成。

本文将封装一个通用的 **Firebase 登录方法**，支持多种登录方式、灵活的凭证输入，以及统一的类型定义。

## 一、准备工作

在开始之前，需要确保你已经完成以下步骤：

1. 已在 Firebase 控制台创建项目；

1. 启用了 Authentication 服务；

1. 添加了需要的登录提供商（如 Google、Facebook 等）；

1. 安装 Firebase SDK：

```shell
npm install firebase
```

## 二、封装

```typescript
import {
  getAuth,
  FacebookAuthProvider,
  signInWithPopup,
  GoogleAuthProvider,
  fetchSignInMethodsForEmail,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  OAuthProvider,
  linkWithPopup,
  EmailAuthProvider,
  linkWithCredential,
  AuthCredential
} from "firebase/auth";

type ProviderId = "google.com" | "facebook.com" | "apple.com" | 'password';
// 支持两种传参：一是 OAuthTokens，二是已经构造好的 AuthCredential
type CredentialInput = OAuthTokens | AuthCredential;
interface OAuthTokens {
  idToken: string;
  accessToken?: string;
}
/**
 * 使用 Google 异步登录函数
 *
 * 此函数通过 Google 身份验证提供程序初始化登录流程，尝试使用弹出窗口让用户登录
 * 如果登录成功，返回包含用户信息的结果如果登录失败，返回错误信息
 *
 * @returns {Promise} 返回一个 Promise 对象，包含登录结果或错误信息
 */
export async function loginWithGoogle() {
  const auth = getAuth();
  // auth.languageCode = 'it';
  // To apply the default browser preference instead of explicitly setting it.
  // auth.useDeviceLanguage();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { data: result };
  } catch (error: any) {

    const errorInfo = {
      code: error.code,
      message: error.message,
      email: error.customData?.email,
      credential: GoogleAuthProvider.credentialFromError(error)
    };
    return {
      error,
      errorInfo
    }
  }
}

export async function loginWithPassword(email: string, password: string) {
  const auth = getAuth();
  const methods = await fetchSignInMethodsForEmail(auth, email);
  let result = null;
  try {
    if (methods.length) {
      result = await signInWithEmailAndPassword(auth, email, password);
    } else {
      result = await createUserWithEmailAndPassword(auth, email, password);
    }

    return { data: result };
  } catch (error: any) {
    const errorInfo = {
      code: error.code,
      message: error.message,
      email: error.customData?.email,
      credential: { providerId: "password" }
    };
    return { error, errorInfo };
  }
}

export async function loginWithFacebook() {
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return { data: result };
  } catch (error: any) {
    const errorInfo = {
      code: error.code,
      message: error.message,
      email: error.customData?.email,
      credential: FacebookAuthProvider.credentialFromError(error)
    };
    return {
      error,
      errorInfo
    }
  }
}

export async function loginWithApple() {
  const auth = getAuth();
  const provider = new OAuthProvider('apple.com');
  try {
    const result = await signInWithPopup(auth, provider);
    return { data: result };
  } catch (error: any) {
    const errorInfo = {
      code: error.code,
      message: error.message,
      email: error.customData?.email,
      credential: OAuthProvider.credentialFromError(error)
    };
    return {
      error,
      errorInfo
    }
  }
}

export async function linkWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  if (!auth.currentUser) {
    return { error: 'No user currently signed in' };
  }
  try {
    const result = await linkWithPopup(auth.currentUser, provider)
    return { data: result };
  } catch (error) {
    return { error }
  }

}

export async function linkWithFacebook() {
  const provider = new FacebookAuthProvider();
  const auth = getAuth();
  if (!auth.currentUser) {
    return { error: 'No user currently signed in' };
  }
  try {
    const result = await linkWithPopup(auth.currentUser, provider)
    return { data: result };
  } catch (error) {
    return { error }
  }

}

export async function linkWithApple() {
  const provider = new OAuthProvider('apple.com');
  const auth = getAuth();
  if (!auth.currentUser) {
    return { error: 'No user currently signed in' };
  }
  try {
    const result = await linkWithPopup(auth.currentUser, provider)
    return { data: result };
  } catch (error) {
    return { error }
  }

}

export async function linkWithPassword(email: string, password: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) return { error: 'No user is currently signed in' };

  try {
    // 构造 email/password 凭证
    const credential = EmailAuthProvider.credential(email, password);

    // 链接凭证到当前用户
    const result = await linkWithCredential(user, credential);
    return { data: result };
  } catch (error) {
    return { error };
  }
}


export async function linkWithOAuthToken(
  providerId: ProviderId,
  credentialInput: CredentialInput
) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    return { error: "No user currently signed in" };
  }

  let credential: AuthCredential;

  // 如果传入的是 AuthCredential，直接用
  if ("providerId" in credentialInput && typeof (credentialInput as AuthCredential).signInMethod === "string") {
    credential = credentialInput as AuthCredential;
  } else {
    // 否则根据 providerId 和 tokens 生成凭证
    const tokens = credentialInput as OAuthTokens;

    switch (providerId) {
      case "google.com":
        credential = GoogleAuthProvider.credential(tokens.idToken!, tokens.accessToken);
        break;

      case "facebook.com":
        credential = FacebookAuthProvider.credential(tokens.accessToken!);
        break;

      case "apple.com":
        const appleProvider = new OAuthProvider("apple.com");
        credential = appleProvider.credential({
          idToken: tokens.idToken,
          accessToken: tokens.accessToken,
        });
        break;

      default:
        return { error: "Unsupported provider" };
    }
  }

  try {
    const result = await linkWithCredential(user, credential);
    return { data: result };
  } catch (error) {
    return { error };
  }
}
```

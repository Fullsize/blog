---
title: web 录音封装
date: 2025-6-25 18:37
tags:
  - Recorder
categories:
  - 配置
---

# web 录音封装

因为工作需求，需要一个录音功能，所以封装了一个录音类(库)

## 一、实现目标

我们希望封装一个具备以下特性的录音工具类：

- ✅ 支持 **开始** / **停止录音**
- ✅ 支持录音状态管理（`idle`、`recording`、`stopped`、`error`）
- ✅ 可通过回调函数监听录音状态与错误
- ✅ 录制结果可获取为 Blob 或 URL
- ✅ 自动清理媒体资源，防止内存泄漏
- ✅ 基于 TypeScript，类型安全、可扩展

---

## 二、核心实现思路

浏览器提供了两大关键 API：

1. **`navigator.mediaDevices.getUserMedia()`** ：请求麦克风权限并返回音频流（`MediaStream`）
2. **`MediaRecorder`** ：将音频流录制为二进制数据（Blob）

我们基于这两者构建一个面向对象封装，负责完整的录音生命周期管理。

---

## 三、完整代码实现

```tsx
// src/AudioRecorder.ts

// 定义录音器的状态类型，利用 TypeScript 的字面量类型提高代码可读性和健壮性
type RecorderStatus = "idle" | "recording" | "stopped" | "error";

// 定义构造函数中可以传入的选项
interface AudioRecorderOptions {
  onStatusChange?: (status: RecorderStatus) => void;
  onError?: (error: Error) => void;
}

export class AudioRecorder {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private audioBlob: Blob | null = null;
  private audioUrl: string | null = null;

  private status: RecorderStatus = "idle";

  // 回调函数
  private onStatusChange: ((status: RecorderStatus) => void) | null = null;
  private onError: ((error: Error) => void) | null = null;

  constructor(options?: AudioRecorderOptions) {
    if (options) {
      this.onStatusChange = options.onStatusChange || null;
      this.onError = options.onError || null;
    }
  }

  private setStatus(status: RecorderStatus) {
    this.status = status;
    this.onStatusChange?.(this.status);
  }

  /**
   * 开始录音
   */
  public async start(): Promise<void> {
    if (this.status === "recording") {
      console.warn("Recorder is already recording.");
      return;
    }

    try {
      // 1. 请求麦克风权限并获取媒体流
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      // 2. 创建 MediaRecorder 实例
      this.mediaRecorder = new MediaRecorder(this.mediaStream);

      // 3. 清空上一次的录音数据
      this.audioChunks = [];
      this.audioBlob = null;
      this.audioUrl = null;

      // 4. 定义 dataavailable 事件：当有音频数据块可用时触发
      this.mediaRecorder.addEventListener("dataavailable", (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      });

      // 5. 定义 stop 事件：当录音停止时触发
      this.mediaRecorder.addEventListener("stop", () => {
        // 将所有音频块合成为一个 Blob 对象
        this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" }); // 或者使用 'audio/webm' 等
        // 创建一个 URL 以便在 <audio> 标签中播放
        this.audioUrl = URL.createObjectURL(this.audioBlob);

        // 释放媒体流资源
        this.cleanup();
        this.setStatus("stopped");
      });

      // 6. 开始录音
      this.mediaRecorder.start();
      this.setStatus("recording");
    } catch (err) {
      const error = err as Error;
      console.error("Error starting recording:", error);
      this.onError?.(error);
      this.setStatus("error");
      // 清理以防部分初始化成功
      this.cleanup();
    }
  }

  /**
   * 停止录音
   */
  public stop(): void {
    if (!this.mediaRecorder || this.status !== "recording") {
      console.warn("Recorder is not recording or not initialized.");
      return;
    }
    // stop() 会触发上面定义的 'stop' 事件
    this.mediaRecorder.stop();
  }

  /**
   * 获取录音状态
   */
  public getStatus(): RecorderStatus {
    return this.status;
  }

  /**
   * 获取录音文件的 Blob 对象
   */
  public getAudioBlob(): Blob | null {
    return this.audioBlob;
  }

  /**
   * 获取可播放的录音文件 URL
   */
  public getAudioUrl(): string | null {
    return this.audioUrl;
  }

  /**
   * 清理资源，停止麦克风轨道
   */
  private cleanup(): void {
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach((track) => track.stop());
      this.mediaStream = null;
    }
    this.mediaRecorder = null;
  }
  /**
   * 公共的销毁方法，用于外部调用（例如 Vue 组件卸载时）
   */
  public dispose(): void {
    if (this.status === "recording") {
      this.stop();
    }
    this.cleanup();
    console.log("Recorder disposed.");
  }
}
```

## 四、功能拆解与设计亮点

### 1️⃣ 状态管理更清晰

使用 TypeScript 的 **字面量类型（`RecorderStatus`）** 来定义录音状态，有效避免硬编码和拼写错误：

```bash
type RecorderStatus = 'idle' | 'recording' | 'stopped' | 'error';
```

---

### 2️⃣ 生命周期安全管理

录音涉及硬件资源（麦克风），一旦不释放就可能占用系统设备或导致浏览器报错。

我们通过 `cleanup()` 方法统一释放资源：

```jsx
private cleanup(): void {
  if (this.mediaStream) {
    this.mediaStream.getTracks().forEach(track => track.stop());
    this.mediaStream = null;
  }
  this.mediaRecorder = null;
}

```

这在 Vue 或 React 组件卸载时尤为重要，可搭配：

```jsx
onUnmounted(() => recorder.dispose());
```

### 3️⃣ 录音结果可直接播放或上传

录音结束后，会自动生成一个可播放的本地 URL：

```tsx
this.audioBlob = new Blob(this.audioChunks, { type: "audio/wav" });
this.audioUrl = URL.createObjectURL(this.audioBlob);
```

你可以直接绑定到 `<audio>` 标签播放：

```html
<audio :src="recorder.getAudioUrl()" controls></audio>
```

或将 `audioBlob` 上传至服务器：

```tsx
const formData = new FormData();
formData.append("file", recorder.getAudioBlob(), "recording.wav");
await fetch("/upload", { method: "POST", body: formData });
```

## 五、使用实例

```tsx
// main.ts 或组件内逻辑中
import { AudioRecorder } from "./AudioRecorder";

// 创建实例
const recorder = new AudioRecorder({
  onStatusChange: (status) => {
    console.log("状态变化:", status);
    statusText.textContent = status;
  },
  onError: (err) => {
    console.error("录音错误:", err);
    alert("录音失败：" + err.message);
  },
});

// 获取 DOM 元素
const startBtn = document.getElementById("startBtn")!;
const stopBtn = document.getElementById("stopBtn")!;
const audioPlayer = document.getElementById("audioPlayer") as HTMLAudioElement;
const statusText = document.getElementById("statusText")!;

// 按钮事件
startBtn.addEventListener("click", async () => {
  await recorder.start();
});

stopBtn.addEventListener("click", () => {
  recorder.stop();
  // 延迟一点时间，确保 audioBlob 已生成
  setTimeout(() => {
    const url = recorder.getAudioUrl();
    if (url) {
      audioPlayer.src = url;
      audioPlayer.play();
    }
  }, 500);
});

<div>
  <p>
    录音状态：<span id="statusText">idle</span>
  </p>
  <button id="startBtn">开始录音</button>
  <button id="stopBtn">停止录音</button>
  <br />
  <br />
  <audio id="audioPlayer" controls></audio>
</div>;
```

## 六、扩展建议

1. 🎚️ **支持音量检测**：通过 `AudioContext` + `AnalyserNode` 实时绘制音量波形。
2. 🕐 **支持录音时长限制**：在 `start()` 时设置定时器自动停止。
3. 💾 **添加持久化功能**：可将 Blob 保存到 IndexedDB，实现断点续录。
4. 🧩 **支持多格式导出**：通过 `MediaRecorder.mimeType` 指定格式（如 `audio/webm`、`audio/mp3`）。
5. 🔒 **权限检测与降级提示**：在调用前检测 `navigator.mediaDevices` 是否存在。

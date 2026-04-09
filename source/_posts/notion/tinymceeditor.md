---
title: TinyMceEditor
date: 2021-04-20 15:56
description: "功能齐全,支持自定义插件的富文本编辑器"
tags:
  - 库
categories:
  - tool
notion_id: d92f048f-b129-4e38-9185-2791d32a8748
---

## 介绍

TinyMCE是一个轻量级的，基于浏览器的，所见即所得编辑器，支持目前流行的各种浏览器，由JavaScript写成。功能配置灵活简单（两行代码就可以将编辑器嵌入网页中），支持AJAX。另一特点是加载速度非常快，如果你的服务器采用的脚本语言是 PHP，那还可以进一步优化。最重要的是，TinyMCE是一个根据LGPL license发布的自由软件，你可以把它用于商业应用。

## 使用

### react

```javascript
import React from 'react';
 import { Editor } from '@tinymce/tinymce-react';

 class App extends React.Component {
   handleEditorChange = (content, editor) => {
     console.log('Content was updated:', content);
   }

   render() {
     return (
       <Editor
         initialValue="<p>This is the initial content of the editor</p>"
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={this.handleEditorChange}
       />
     );
   }
 }

 export default App;
```

### 参考文档

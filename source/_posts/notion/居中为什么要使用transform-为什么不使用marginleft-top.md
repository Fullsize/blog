---
title: "居中为什么要使用transform（为什么不使用marginLeft/Top）"
date: 2021-10-18 15:01
description: 受性能问题
tags:
  - css
categories:
  - css
notion_id: 3632d2d7-4bc4-42e9-a2a2-1d2f8a48a7be
---

transform 属于合成属性（composite property），对合成属性进行 transition/animation 动画将会创建一个合成层（composite layer），这使得被动画元素在一个独立的层中进行动画。通常情况下，浏览器会将一个层的内容先绘制进一个位图中，然后再作为纹理（texture）上传到 GPU，只要该层的内容不发生改变，就没必要进行重绘（repaint），浏览器会通过重新复合（recomposite）来形成一个新的帧。

top/left属于布局属性，该属性的变化会导致重排（reflow/relayout），所谓重排即指对这些节点以及受这些节点影响的其它节点，进行CSS计算-\>布局-\>重绘过程，浏览器需要为整个层进行重绘并重新上传到 GPU，造成了极大的性能开销。

---
title: echart提升渲染性能或速度
date: 2022-02-15 11:00
description: echart在低端设备或浏览器渲染过慢问题
tags:
  - javascript
categories:
  - javascript
notion_id: 29e3e4ef-4939-44e0-91ba-489857a1aeb2
---

# **选择哪种渲染器**

一般来说，Canvas 更适合绘制图形元素数量较多（这一般是由数据量大导致）的图表（如热力图、地理坐标系或平行坐标系上的大规模线图或散点图等），也利于实现某些视觉 [特效](https://echarts.apache.org//examples/editor.html?c=lines-bmap-effect)。但是，在不少场景中，SVG 具有重要的优势：它的内存占用更低（这对移动端尤其重要）、并且用户使用浏览器内置的缩放功能时不会模糊。

选择哪种渲染器，我们可以根据软硬件环境、数据量、功能需求综合考虑。

- 在软硬件环境较好，数据量不大的场景下，两种渲染器都可以适用，并不需要太多纠结。

- 在环境较差，出现性能问题需要优化的场景下，可以通过试验来确定使用哪种渲染器。比如有这些经验：

  - 在须要创建很多 ECharts 实例且浏览器易崩溃的情况下（可能是因为 Canvas 数量多导致内存占用超出手机承受能力），可以使用 SVG 渲染器来进行改善。大略得说，如果图表运行在低端安卓机，或者我们在使用一些特定图表如 [水球图](https://ecomfe.github.io/echarts-liquidfill/example/) 等，SVG 渲染器可能效果更好。

  - 数据量较大（经验判断 \> 1k）、较多交互时，建议选择 Canvas 渲染器。

```javascript
// 使用 Canvas 渲染器（默认）
var chart = echarts.init(containerDom, null, { renderer: 'canvas' });
// 等价于：
var chart = echarts.init(containerDom);

// 使用 SVG 渲染器
var chart = echarts.init(containerDom, null, { renderer: 'svg' });
```

# 关闭动画效果

echart默认开启动画效果，关闭动画效果会显著提升渲染(视觉效果)

```javascript
echart.setOption({...options,animation:false})
```

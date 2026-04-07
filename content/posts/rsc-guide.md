---
title: "React Server Components 实践指南"
date: 2026-03-15
draft: false
subtitle: "A Practical Guide to React Server Components"
description: "RSC 正在改变我们构建 React 应用的方式。"
tags: ["React", "前端"]
categories: ["技术"]
toc: true
---

RSC 正在改变我们构建 React 应用的方式。本文从零开始介绍 RSC 的核心概念、使用场景和最佳实践，帮助你在实际项目中落地这项技术。

<!--more-->

## 什么是 RSC

React Server Components 是 React 18 引入的新特性，允许组件在服务器端渲染，并将结果流式传输到客户端。这与传统的 SSR 不同，RSC 可以实现更细粒度的控制。

## 核心优势

- **更小的包体积**：服务端组件的代码不会发送到客户端
- **直接访问后端资源**：可以在组件中直接查询数据库
- **自动代码分割**：客户端组件天然实现代码分割
- **更好的用户体验**：流式渲染，渐进式加载

## 使用场景

### 适合服务端组件

- 数据获取组件
- 静态内容展示
- SEO 要求高的页面

### 必须是客户端组件

- 需要交互的组件（onClick 等）
- 使用浏览器 API 的组件
- 使用 hooks 的组件

## 最佳实践

1. **默认使用服务端组件**：只有需要交互时才转为客户端组件
2. **合理拆分**：将交互部分提取为独立的客户端组件
3. **数据获取就近原则**：在需要数据的组件中直接获取
4. **利用 Suspense**：实现优雅的加载状态

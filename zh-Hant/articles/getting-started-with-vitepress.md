---
title: VitePress 入門
---
# VitePress 入門

> ⚠️ 這是一個 AI 生成的測試頁面，僅用於版面測試。

## 簡介

VitePress 是一個專為創建快速、以內容為中心的網站而設計的靜態網站生成器。它建立在 Vite 和 Vue.js 之上。

## 特點

### 快速的開發伺服器

VitePress 利用 Vite 的即時熱模組替換（HMR），提供極速的開發體驗。

### Vue 驅動的自定義

使用 Vue 組件擴展 VitePress，完全掌控網站的外觀和功能。

### Markdown 擴展

VitePress 擴展了 Markdown，增加了自定義容器、代碼組等功能。

## 代碼示例

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '我的網站',
  description: '一個 VitePress 網站',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/' }
    ]
  }
})
```

## 數學公式支援

行內公式：$E = mc^2$

塊級公式：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## 結論

VitePress 是構建文檔網站、博客和以內容為中心的網站的絕佳選擇。
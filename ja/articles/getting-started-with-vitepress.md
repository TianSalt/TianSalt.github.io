---
title: VitePressを始めよう
---
# VitePressを始めよう

> ⚠️ これはレイアウトテスト用のAI生成ダミーページです。

## はじめに

VitePressは、高速でコンテンツ重視のウェブサイトを作成するために設計された静的サイトジェネレーターです。ViteとVue.jsの上に構築されています。

## 特徴

### 高速な開発サーバー

VitePressはViteの瞬時のホットモジュール置換（HMR）を活用し、信じられないほど高速な開発体験を提供します。

### Vueによるカスタマイズ

VueコンポーネントでVitePressを拡張し、サイトの外観と機能を完全に制御できます。

### Markdown拡張機能

VitePressは、カスタムコンテナ、コードグループなどの追加機能でMarkdownを拡張します。

## コード例

```javascript
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: '私のサイト',
  description: 'VitePressサイト',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/' }
    ]
  }
})
```

## 数式サポート

インライン数式：$E = mc^2$

ブロック数式：

$$
\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}
$$

## まとめ

VitePressは、ドキュメントサイト、ブログ、コンテンツ重視のウェブサイトを構築するための優れた選択肢です。
import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "TianSalt's Blog",
  description: '代码 · 思考 · 成长',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/hello' }
    ],

    sidebar: [
      {
        text: '文章',
        items: [
          { text: '你好，世界！', link: '/posts/hello' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com' }
    ],

    footer: {
      message: 'Made with ❤️ and VitePress',
      copyright: 'Copyright © 2024 TianSalt'
    }
  }
})

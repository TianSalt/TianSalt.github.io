export default {
  title: "鹽語屋",
  description: '理性・溫柔・可愛',
  lang: 'zh-Hant',
  label: '中文',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/zh-Hant/' },
      { text: '筆記', link: '/zh-Hant/notes/' },
      { text: '日誌', link: '/zh-Hant/posts/hello' },
      { text: '文章', link: '/zh-Hant/articles/' },
      { text: '教程', link: '/zh-Hant/tutorials/' },
      { text: '指南', link: '/zh-Hant/accessibility' }
    ],
    sidebar: {
      '/zh-Hant/notes/': [
        {
          text: '筆記',
          items: [
            { text: '筆記首頁', link: '/zh-Hant/notes/' }
          ]
        }
      ],
      '/zh-Hant/posts/': [
        {
          text: '日誌',
          items: [
            { text: '你好，世界！', link: '/zh-Hant/posts/hello' }
          ]
        }
      ],
      '/zh-Hant/articles/': [
        {
          text: '文章',
          items: [
            { text: '文章首頁', link: '/zh-Hant/articles/' },
            { text: 'VitePress 入門', link: '/zh-Hant/articles/getting-started-with-vitepress' }
          ]
        }
      ],
      '/zh-Hant/tutorials/': [
        {
          text: '教程',
          items: [
            { text: '教程首頁', link: '/zh-Hant/tutorials/' }
          ]
        },
        {
          text: '立直麻雀',
          collapsed: false,
          items: [
            { text: '序', link: '/zh-Hant/tutorials/riichi-mahjong/' },
            {
              text: '1. 規則',
              items: [
                { text: '1.1 基本機制', link: '/zh-Hant/tutorials/riichi-mahjong/chapter-01/1' }
              ]
            }

          ]
        }
      ]
    },
    editLink: {
      text: '在 GitHub 上編輯此頁',
      pattern: 'https://github.com/TianSalt/TianSalt.github.io/edit/main/:path'
    },
    lastUpdated: {
      text: '最後更新於',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: '上一頁',
      next: '下一頁'
    },
    outline: {
      label: '頁面導航'
    },
    returnToTopLabel: '返回頂部',
    sidebarMenuLabel: '菜單',
    darkModeSwitchLabel: '主題',
    lightModeSwitchTitle: '切換到淺色模式',
    darkModeSwitchTitle: '切換到深色模式',
    skipToContentLabel: '跳轉到主要內容',
    langMenuLabel: '多語言'
  }
}
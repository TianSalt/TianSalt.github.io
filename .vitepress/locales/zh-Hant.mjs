export default {
  title: "鹽語屋",
  description: 'DUMMY',
  lang: 'zh-Hant',
  label: '中文',
  themeConfig: {
    nav: [
      { text: '首頁', link: '/zh-Hant/' },
      { text: '文章', link: '/zh-Hant/posts/hello' },
      { text: '指南', link: '/zh-Hant/accessibility' }
    ],
    sidebar: [
      {
        text: '文章',
        items: [
          { text: '你好，世界！', link: '/zh-Hant/posts/hello' }
        ]
      }
    ],
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
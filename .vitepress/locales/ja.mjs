export default {
  title: "塩語屋",
  description: 'DUMMY',
  lang: 'ja-JP',
  label: '日本語',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: '投稿', link: '/ja/posts/hello' },
      { text: 'ガイド', link: '/ja/accessibility' }
    ],
    sidebar: [
      {
        text: '投稿',
        items: [
          { text: 'こんにちは、世界！', link: '/ja/posts/hello' }
        ]
      }
    ],
    editLink: {
      text: 'GitHubでこのページを編集',
      pattern: 'https://github.com/TianSalt/TianSalt.github.io/edit/main/:path'
    },
    lastUpdated: {
      text: '最終更新日',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: '前へ',
      next: '次へ'
    },
    outline: {
      label: 'このページの内容'
    },
    returnToTopLabel: 'トップに戻る',
    sidebarMenuLabel: 'メニュー',
    darkModeSwitchLabel: 'テーマ',
    lightModeSwitchTitle: 'ライトテーマに切り替え',
    darkModeSwitchTitle: 'ダークテーマに切り替え',
    skipToContentLabel: 'メインコンテンツへスキップ',
    langMenuLabel: '言語を変更'
  }
}
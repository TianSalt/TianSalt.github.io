export default {
  title: "塩語屋",
  description: 'ラティオーナリス・ミーティス・アマービリス',
  lang: 'ja-JP',
  label: '日本語',
  themeConfig: {
    nav: [
      { text: 'ホーム', link: '/ja/' },
      { text: 'ノート', link: '/ja/notes/' },
      { text: '日記', link: '/ja/posts/hello' },
      { text: '記事', link: '/ja/articles/' },
      { text: 'チュートリアル', link: '/ja/tutorials/' },
      { text: 'ガイド', link: '/ja/accessibility' }
    ],
    sidebar: {
      '/ja/notes/': [
        {
          text: 'ノート',
          items: [
            { text: 'ノートホーム', link: '/ja/notes/' }
          ]
        }
      ],
      '/ja/posts/': [
        {
          text: '日記',
          items: [
            { text: 'こんにちは、世界！', link: '/ja/posts/hello' }
          ]
        }
      ],
      '/ja/articles/': [
        {
          text: '記事',
          items: [
            { text: '記事ホーム', link: '/ja/articles/' },
            { text: 'VitePressを始めよう', link: '/ja/articles/getting-started-with-vitepress' }
          ]
        }
      ],
      '/ja/tutorials/': [
        {
          text: 'チュートリアル',
          items: [
            { text: 'チュートリアルホーム', link: '/ja/tutorials/' }
          ]
        },
        {
          text: 'リーチ麻雀',
          collapsed: false,
          items: [
            { text: '序', link: '/ja/tutorials/riichi-mahjong/' },
            {
              text: '1. ルール',
              items: [
                { text: '1.1 基本メカニズム', link: '/ja/tutorials/riichi-mahjong/chapter-01/1' },
                { text: '1.2 役・副露・局進行', link: '/ja/tutorials/riichi-mahjong/chapter-01/2' },
                { text: '1.3 リーチ', link: '/ja/tutorials/riichi-mahjong/chapter-01/3' }
              ]
            }
          ]
        }
      ]
    },
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
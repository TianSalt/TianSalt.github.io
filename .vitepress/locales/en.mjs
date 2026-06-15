export default {
  title: "Yányǔwū",
  description: 'Rationalis, Mitis, Amabilis',
  lang: 'en-US',
  label: 'English',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Notes', link: '/en/notes/' },
      { text: 'Journal', link: '/en/posts/hello' },
      { text: 'Articles', link: '/en/articles/' },
      { text: 'Tutorials', link: '/en/tutorials/' },
      { text: 'Guide', link: '/en/accessibility' }
    ],
    sidebar: {
      '/en/notes/': [
        {
          text: 'Notes',
          items: [
            { text: 'Notes Home', link: '/en/notes/' }
          ]
        }
      ],
      '/en/posts/': [
        {
          text: 'Journal',
          items: [
            { text: 'Hello, World!', link: '/en/posts/hello' }
          ]
        }
      ],
      '/en/articles/': [
        {
          text: 'Articles',
          items: [
            { text: 'Articles Home', link: '/en/articles/' },
            { text: 'Getting Started with VitePress', link: '/en/articles/getting-started-with-vitepress' }
          ]
        }
      ],
      '/en/tutorials/': [
        {
          text: 'Tutorials',
          items: [
            { text: 'Tutorials Home', link: '/en/tutorials/' }
          ]
        },
        {
          text: 'Riichi Mahjong',
          collapsed: false,
          items: [
            { text: 'Introduction', link: '/en/tutorials/riichi-mahjong/' },
            {
              text: '1. Rules',
              items: [
                { text: '1.1 Basic Mechanics', link: '/en/tutorials/riichi-mahjong/chapter-01/1' }
              ]
            }
          ]
        }
      ]
    },
    editLink: {
      text: 'Edit this page on GitHub',
      pattern: 'https://github.com/TianSalt/TianSalt.github.io/edit/main/:path'
    },
    lastUpdated: {
      text: 'Last updated',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    docFooter: {
      prev: 'Previous',
      next: 'Next'
    },
    outline: {
      label: 'On this page'
    },
    returnToTopLabel: 'Return to top',
    sidebarMenuLabel: 'Menu',
    darkModeSwitchLabel: 'Theme',
    lightModeSwitchTitle: 'Switch to light theme',
    darkModeSwitchTitle: 'Switch to dark theme',
    skipToContentLabel: 'Skip to main content',
    langMenuLabel: 'Change language'
  }
}
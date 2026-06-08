export default {
  title: "Yányǔwū",
  description: 'DUMMY',
  lang: 'en-US',
  label: 'English',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/en/' },
      { text: 'Posts', link: '/en/posts/hello' },
      { text: 'Accessibility', link: '/en/accessibility' }
    ],
    sidebar: [
      {
        text: 'Posts',
        items: [
          { text: 'Hello, World!', link: '/en/posts/hello' }
        ]
      }
    ],
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
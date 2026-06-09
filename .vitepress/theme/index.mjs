import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import NotFound from './NotFound.vue'
import './custom.css'

import '@fontsource/ibm-plex-sans/latin.css'
import '@fontsource/ibm-plex-sans/latin-italic.css'
import '@fontsource/ibm-plex-sans/latin-ext.css'
import '@fontsource/ibm-plex-sans/latin-ext-italic.css'
import '@fontsource/ibm-plex-sans-jp/japanese.css'
import '@fontsource/ibm-plex-sans-jp/latin.css'
import '@fontsource/ibm-plex-sans-jp/latin-ext.css'
import '@ibm/plex-sans-tc/css/ibm-plex-sans-tc-default.min.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { lang } = useData()
    
    return h(DefaultTheme.Layout, {
      'aria-label': lang.value === 'zh-Hant' ? '博客主要内容' : 
                    lang.value === 'ja-JP' ? 'ブログメインコンテンツ' : 
                    'Blog main content'
    }, {
      'not-found': () => h(NotFound)
    })
  },
  enhanceApp({ app }) {
    app.component('LanguageSwitcher', LanguageSwitcher)
    
    if (typeof window !== 'undefined') {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const target = document.activeElement
          if (target && target.getAttribute('role') === 'button') {
            target.click()
          }
        }
      })
    }
  }
}
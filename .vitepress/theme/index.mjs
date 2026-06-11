import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import { h } from 'vue'
import mediumZoom from 'medium-zoom'
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
    app.config.compilerOptions.isCustomElement = (tag) => {
      return tag === 'm-tehai' || tag === 'm-pai' || tag === 'l-ja'
    }

    app.component('LanguageSwitcher', LanguageSwitcher)

    if (typeof window !== 'undefined') {
      const zoom = mediumZoom({
        background: 'var(--vp-c-bg)',
        margin: 24
      })

      document.addEventListener('click', (e) => {
        const target = e.target
        if (target && target.tagName === 'IMG' && target.closest('.vp-doc')) {
          if (!target.classList.contains('medium-zoom-image')) {
            zoom.attach(target)
            target.click()
          }
        }
      })

      document.addEventListener('mouseenter', (e) => {
        const target = e.target
        if (target && target.tagName === 'A' && target.closest('.footnote-ref')) {
          if (target.hasAttribute('title')) {
            target.removeAttribute('title')
          }
          if (target.hasAttribute('data-title')) return
          const targetId = target.getAttribute('href')
          if (targetId) {
            const footnoteContent = document.querySelector(targetId)
            if (footnoteContent) {
              const text = (footnoteContent.textContent || '').replace('↩', '').trim()
              target.setAttribute('data-title', text)
            }
          }
        }
      }, true)

      customElements.define('m-tehai', class extends HTMLElement {
        constructor() { super(); this.style.display = this.style.display || 'inline' }
      })
      customElements.define('m-pai', class extends HTMLElement {
        constructor() { super(); this.style.display = this.style.display || 'inline' }
      })
      customElements.define('l-ja', class extends HTMLElement {
        constructor() { super(); this.style.display = this.style.display || 'inline' }
      })

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
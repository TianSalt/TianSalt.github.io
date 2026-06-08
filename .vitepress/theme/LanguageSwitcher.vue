<script setup>
import { useData } from 'vitepress'
import { ref } from 'vue'

const { lang } = useData()
const isOpen = ref(false)

const languages = [
  { code: 'en-US', label: 'English', path: '/en/' },
  { code: 'zh-Hant', label: '中文', path: '/zh-Hant/' },
  { code: 'ja-JP', label: '日本語', path: '/ja/' }
]

const currentLang = languages.find(l => l.code === lang.value) || languages[0]

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}
</script>

<template>
  <div class="VPNavBarLanguage" @mouseleave="closeMenu">
    <button
      class="VPNavBarLanguageButton"
      @click="toggleMenu"
      @keydown.enter="toggleMenu"
      @keydown.space.prevent="toggleMenu"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      aria-label="Change language"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path fill="currentColor" d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z"/>
      </svg>
      <span class="label">{{ currentLang.label }}</span>
      <svg class="chevron" :class="{ open: isOpen }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
        <path fill="currentColor" d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"/>
      </svg>
    </button>
    
    <ul v-if="isOpen" class="VPNavBarLanguageMenu" role="menu">
      <li v-for="language in languages" :key="language.code" role="none">
        <a
          :href="language.path"
          role="menuitem"
          :aria-current="language.code === lang.value ? 'true' : undefined"
          @click="closeMenu"
          @keydown.escape="closeMenu"
        >
          {{ language.label }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.VPNavBarLanguage {
  position: relative;
}

.VPNavBarLanguageButton {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0 12px;
  height: var(--vp-nav-height);
  color: var(--vp-c-text-1);
  font-size: 14px;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: color 0.25s;
}

.VPNavBarLanguageButton:hover {
  color: var(--vp-c-brand-1);
}

.VPNavBarLanguageButton:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.label {
  line-height: var(--vp-nav-height);
}

.chevron {
  transition: transform 0.25s;
}

.chevron.open {
  transform: rotate(180deg);
}

.VPNavBarLanguageMenu {
  position: absolute;
  inset-block-start: calc(var(--vp-nav-height) - 8px);
  inset-inline-end: 0;
  margin: 0;
  padding-block: 8px;
  padding-inline: 0;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  box-shadow: var(--vp-shadow-3);
  list-style: none;
  min-width: 128px;
  z-index: 999;
}

.VPNavBarLanguageMenu a {
  display: block;
  padding-block: 8px;
  padding-inline: 16px;
  line-height: 1.5;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: color 0.25s, background-color 0.25s;
}

.VPNavBarLanguageMenu a:hover,
.VPNavBarLanguageMenu a:focus {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}

.VPNavBarLanguageMenu a[aria-current="true"] {
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-soft);
}
</style>
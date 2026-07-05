---
layout: home
---

<script setup>
import { onBeforeMount } from 'vue'

onBeforeMount(() => {
  const userLang = navigator.language || navigator.userLanguage || 'en'
  let targetPath = '/en/'
  
  if (userLang.startsWith('zh')) {
    targetPath = '/zh-Hant/'
  } else if (userLang.startsWith('ja')) {
    targetPath = '/ja/'
  }
  
  const storedLang = localStorage.getItem('preferred-language')
  if (storedLang) {
    switch(storedLang) {
      case 'zh-Hant': targetPath = '/zh-Hant/'; break
      case 'ja-JP': targetPath = '/ja/'; break
      default: targetPath = '/en/'
    }
  }
  
  window.location.replace(targetPath)
})
</script>

<template>
  <div class="language-select">
    <h2>鹽語屋</h2>
    <p>Select your language:</p>
    <div class="language-buttons">
      <a href="/zh-Hant/" class="lang-btn">漢語</a>
      <a href="/en/" class="lang-btn">English</a>
      <a href="/ja/" class="lang-btn">日本語</a>
    </div>
  </div>
</template>

<style scoped>
.language-select {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  text-align: center;
}

.language-select h2 {
  font-size: 2rem;
  margin-block: 1rem;
}

.language-select p {
  font-size: 1.2rem;
  margin-block-end: 2rem;
  color: var(--vp-c-text-2);
}

.language-buttons {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.lang-btn {
  display: inline-block;
  padding-block: 0.75rem;
  padding-inline: 1.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.3s;
}

.lang-btn:hover,
.lang-btn:focus {
  background-color: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  border-color: var(--vp-c-brand-1);
}

.lang-btn:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}
</style>
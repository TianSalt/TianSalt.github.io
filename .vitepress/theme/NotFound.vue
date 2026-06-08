<script setup>
const messages = {
  zh: {
    title: '頁面未找到',
    description: '汝似涉乎無智之草莽',
    home: '返回首頁'
  },
  en: {
    title: 'Page Not Found',
    description: 'Methinks thou hast entered a wilderness where no knowledge dwelleth.',
    home: 'Back to Home'
  },
  ja: {
    title: 'ページが見つかりません',
    description: '汝知ナキ荒野ニ到レルガ如シ',
    home: 'ホームに戻る'
  }
}

const languages = [
  { code: 'zh', label: '中文', path: '/zh-Hant/' },
  { code: 'en', label: 'English', path: '/en/' },
  { code: 'ja', label: '日本語', path: '/ja/' }
]
</script>

<template>
  <div class="VPNotFound">
    <div class="container">
      <div class="content">
        <h1 class="code">404</h1>
        
        <div class="messages">
          <div class="message-item">
            <h2 class="title">{{ messages.zh.title }}</h2>
            <p class="description">{{ messages.zh.description }}</p>
          </div>
          
          <div class="message-item">
            <h2 class="title">{{ messages.en.title }}</h2>
            <p class="description">{{ messages.en.description }}</p>
          </div>
          
          <div class="message-item">
            <h2 class="title">{{ messages.ja.title }}</h2>
            <p class="description">{{ messages.ja.description }}</p>
          </div>
        </div>
        
        <div class="lang-buttons">
          <a
            v-for="language in languages"
            :key="language.code"
            :href="language.path"
            class="lang-link"
          >
            <span class="lang-label">{{ language.label }}</span>
            <span class="home-text">{{ messages[language.code].home }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.VPNotFound {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 64px - 128px);
  padding-block: 64px 96px;
  padding-inline: 24px;
  text-align: center;
}

.container {
  max-width: 800px;
}

.content {
  margin: 0 auto;
}

.code {
  font-size: 8rem;
  font-weight: 700;
  line-height: 1;
  margin-block-end: 2rem;
  color: var(--vp-c-brand-1);
  opacity: 0.5;
}

.messages {
  margin-block-end: 3rem;
}

.message-item {
  margin-block-end: 1.5rem;
}

.message-item:last-child {
  margin-block-end: 0;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-block-end: 0.25rem;
  color: var(--vp-c-text-1);
}

.description {
  font-size: 1rem;
  color: var(--vp-c-text-2);
}

.lang-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.lang-link {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding-block: 1rem;
  padding-inline: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.25s;
  min-width: 150px;
}

.lang-link:hover,
.lang-link:focus {
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.lang-link:focus {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: 2px;
}

.lang-label {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.home-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.lang-link:hover .home-text,
.lang-link:focus .home-text {
  color: var(--vp-c-text-1);
}
</style>
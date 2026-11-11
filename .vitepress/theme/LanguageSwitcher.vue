<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useData } from "vitepress";
import { articleLink, localeHome } from "../locale-paths.mjs";

defineProps({
  mobile: { type: Boolean, default: false },
});

const { site, localeIndex, page, frontmatter, hash, theme } = useData();
const isOpen = ref(false);
const root = ref(null);

// Explains, in the language of the option it sits under, that the article has
// no translation there and the link goes to that language's home page.
const HINTS = {
  root: "Not available in English · opens the English home",
  "zh-Hant": "暫無漢語版本 · 開啓漢語首頁",
  ja: "日本語版はありません · 日本語のホームへ",
};

const currentLabel = computed(
  () => site.value.locales[localeIndex.value]?.label ?? "English",
);

const currentLangAttr = computed(
  () => site.value.locales[localeIndex.value]?.lang ?? "en-US",
);

const items = computed(() => {
  const langs = frontmatter.value.langs;
  return Object.entries(site.value.locales)
    .filter(([key]) => key !== localeIndex.value)
    .map(([key, value]) => {
      // Without the build-time list, fall back to the plain counterpart link.
      const available = Array.isArray(langs) ? langs.includes(key) : true;
      const home = localeHome(key, value);
      return {
        key,
        label: value.label,
        // Lets :lang() pick the font stack and the punctuation table of the
        // language being offered, not of the page doing the offering.
        langAttr: value.lang,
        available,
        hint: HINTS[key] ?? "",
        link: available
          ? articleLink(key, page.value.relativePath) + hash.value
          : home,
      };
    });
});

function toggle() {
  isOpen.value = !isOpen.value;
}

function close() {
  isOpen.value = false;
}

function onDocClick(e) {
  if (!isOpen.value) return;
  if (!(e.target instanceof Node)) return;
  if (!root.value?.contains(e.target)) close();
}

function onKeydown(e) {
  if (e.key === "Escape" && isOpen.value) {
    close();
    root.value?.querySelector(".LanguageSwitcher-button")?.focus();
  }
}

onMounted(() => {
  document.addEventListener("click", onDocClick, true);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onDocClick, true);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div ref="root" class="LanguageSwitcher" :class="{ mobile }" @mouseleave="close">
    <button
      class="LanguageSwitcher-button"
      type="button"
      :aria-expanded="isOpen"
      aria-haspopup="true"
      :aria-label="theme.langMenuLabel || 'Change language'"
      @click="toggle"
    >
      <svg
        class="icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="18"
        height="18"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04M18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12m-2.62 7l1.62-4.33L19.12 17h-3.24Z"
        />
      </svg>
      <span class="label" :lang="currentLangAttr">{{ currentLabel }}</span>
      <svg
        class="chevron"
        :class="{ open: isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <path
          fill="currentColor"
          d="M7.41 8.58L12 13.17l4.59-4.59L18 10l-6 6-6-6 1.41-1.42z"
        />
      </svg>
    </button>

    <ul v-if="isOpen" class="LanguageSwitcher-menu" role="menu">
      <li v-for="item in items" :key="item.key" role="none">
        <a
          class="item"
          :class="{ untranslated: !item.available }"
          :href="item.link"
          :lang="item.langAttr"
          role="menuitem"
          :aria-describedby="item.available ? undefined : `ls-hint-${item.key}`"
          @click="close"
        >
          <span class="name">{{ item.label }}</span>
          <span v-if="!item.available" :id="`ls-hint-${item.key}`" class="hint">
            {{ item.hint }}
          </span>
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.LanguageSwitcher {
  position: relative;
  display: none;
}

@media (min-width: 768px) {
  .LanguageSwitcher:not(.mobile) {
    display: flex;
    align-items: center;
  }

  /* Matches the divider the built-in menu carried on its leading side. */
  .LanguageSwitcher:not(.mobile)::before {
    content: "";
    width: 1px;
    height: 24px;
    margin-inline: 8px;
    background-color: var(--vp-c-divider);
  }
}

.LanguageSwitcher.mobile {
  display: block;
  margin-top: 24px;
}

.LanguageSwitcher-button {
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

.mobile .LanguageSwitcher-button {
  height: 24px;
  padding: 0;
  font-size: 14px;
}

.LanguageSwitcher-button:hover {
  color: var(--vp-c-brand-1);
}

.LanguageSwitcher-button:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}

.icon {
  font-size: 16px;
}

.mobile .icon {
  margin-right: 4px;
}

.label {
  line-height: var(--vp-nav-height);
}

/* The per-language stacks live in --vp-font-family-base and :lang() rewrites
   that variable, so the menu has to read it itself instead of inheriting the
   page's already-resolved family. */
.label,
.item {
  font-family: var(--vp-font-family-base);
}

.mobile .label {
  line-height: 24px;
}

.chevron {
  transition: transform 0.25s;
}

.chevron.open {
  transform: rotate(180deg);
}

.LanguageSwitcher-menu {
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

.mobile .LanguageSwitcher-menu {
  position: static;
  inset: auto;
  padding-block: 4px 0;
  border: none;
  border-radius: 0;
  box-shadow: none;
  background: transparent;
  min-width: 0;
  padding-inline-start: 24px;
}

.item {
  display: block;
  padding-block: 8px;
  padding-inline: 16px;
  text-decoration: none;
  transition: color 0.25s, background-color 0.25s;
}

.mobile .item {
  padding-block: 0;
  padding-inline: 0;
}

.mobile .name {
  line-height: 32px;
}

.name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-1);
}

.item:hover .name,
.item:focus-visible .name {
  color: var(--vp-c-brand-1);
}

.item:hover,
.item:focus-visible {
  background: var(--vp-c-bg-soft);
}

.mobile .item:hover,
.mobile .item:focus-visible {
  background: transparent;
}

.hint {
  display: block;
  margin-top: 2px;
  font-size: 12px;
  line-height: 1.4;
  color: var(--vp-c-text-3);
}

.mobile .hint {
  margin-top: -4px;
  padding-bottom: 8px;
}

.mobile .item.untranslated .name {
  color: var(--vp-c-text-2);
}

.item:focus-visible {
  outline: 2px solid var(--vp-c-brand-1);
  outline-offset: -2px;
}
</style>

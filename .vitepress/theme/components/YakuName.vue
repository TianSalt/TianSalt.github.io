<template>
  <span class="yaku-stick-container" :lang="lang">
    <span class="yaku-stick">
      <span class="red-dot"></span>
    </span>
    <span class="yaku-text" :class="{ 'is-english': lang === 'en' }">
      <ruby>
        {{ base }}
        <rt v-if="ruby" :class="{ 'is-english': lang === 'en' }">
          {{ ruby }}
        </rt>
      </ruby>
    </span>
  </span>
</template>

<script setup>
defineProps({
  base: { type: String, required: true },
  ruby: { type: String, default: "" },
  lang: { type: String, default: "ja" },
});
</script>

<style scoped>
.yaku-stick-container {
  --yaku-component-size: 1.15rem;

  display: inline-flex;
  align-items: baseline;
  font-size: var(--yaku-component-size);
}

.yaku-stick {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;

  inline-size: 1.6em;
  /* 💡 Increased from 0.05em to 0.12em for a more substantial typographic weight */
  block-size: 0.12em;

  background: linear-gradient(to right,
      rgba(161, 161, 161, 0.15),
      rgba(161, 161, 161, 0.85));

  /* A microscopic radius to take away the raw digital harshness while keeping it crisp */
  border-radius: 0.04em;

  margin-inline-end: 0.6em;
  box-sizing: border-box;
  align-self: center;
  margin-block-start: 0.22em;
}

.red-dot {
  position: absolute;
  inline-size: 0.3em;
  block-size: 0.3em;
  background: #dc2626;
  border-radius: 50%;
  box-shadow: 0 0 0 0.06em var(--vp-c-bg, #ffffff);
}

.yaku-text {
  font-size: 1.15em;
  font-weight: 700;
  color: var(--vp-c-text-1);
  font-family:
    "Hiragino Mincho ProN", "Hiragino Mincho Pro", "Yu Mincho", "YuMincho",
    "BIZ UDPMincho", "BIZ PMincho", "MS PMincho", "MS Mincho", serif;
}

.yaku-text.is-english {
  font-size: 1em;
}

.yaku-text ruby {
  ruby-align: center;
}

rt {
  font-size: 0.5em;
  color: var(--vp-c-text-1);
  padding-block-end: 0.1em;
}

rt.is-english {
  font-style: italic;
  font-size: 1rem;
  font-feature-settings: "ccmp" 0, "mark" 0;
  font-family: "PT Serif", serif;
}
</style>

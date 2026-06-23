<script setup>
defineProps({
  tutorials: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="tutorial-grid">
    <a
      v-for="tutorial in tutorials"
      :key="tutorial.link"
      :href="tutorial.link"
      class="tutorial-card"
    >
      <div class="tutorial-card-image">
        <img :src="tutorial.image" :alt="tutorial.imageAlt" data-no-zoom />
      </div>
      <div class="tutorial-card-content">
        <h3 class="tutorial-card-title" v-html="tutorial.title"></h3>
        <span class="tutorial-card-arrow" aria-hidden="true">→</span>
      </div>
    </a>
  </div>
</template>

<style scoped>
.tutorial-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  margin-top: 24px;
}

@media (min-width: 640px) {
  .tutorial-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 960px) {
  .tutorial-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.tutorial-card {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  overflow: hidden;
  transition: box-shadow 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
  text-decoration: none;
  color: var(--vp-c-text-1);
}

.tutorial-card:hover,
.tutorial-card:focus-visible {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  border-color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

:global(.dark) .tutorial-card:hover,
:global(.dark) .tutorial-card:focus-visible {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.tutorial-card-image {
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.tutorial-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  pointer-events: none;
}

.tutorial-card:hover .tutorial-card-image img {
  transform: scale(1.05);
}

.tutorial-card-content {
  padding: 20px 24px 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tutorial-card-title {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.4;
}

.tutorial-card-arrow {
  display: inline-flex;
  align-items: center;
  margin-top: 16px;
  font-size: 1.1rem;
  color: var(--vp-c-brand-1);
  transition: transform 0.25s ease;
}

.tutorial-card:hover .tutorial-card-arrow {
  transform: translateX(4px);
}
</style>

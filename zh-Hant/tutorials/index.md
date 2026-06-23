---
title: 教程
---
<script setup>
const tutorials = [
  {
    title: '立直麻雀',
    link: '/zh-Hant/tutorials/riichi-mahjong/',
    image: '/src/images/mahjong/mahjong-set.webp',
    imageAlt: '麻雀牌具'
  }
]
</script>

# 教程

<TutorialCardGrid :tutorials="tutorials" />

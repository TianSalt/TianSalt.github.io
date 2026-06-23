---
title: チュートリアル
---
<script setup>
const tutorials = [
  {
    title: 'リーチ麻雀',
    link: '/ja/tutorials/riichi-mahjong/',
    image: '/src/images/mahjong/mahjong-set.webp',
    imageAlt: '麻雀セット'
  }
]
</script>

# チュートリアル

<TutorialCardGrid :tutorials="tutorials" />

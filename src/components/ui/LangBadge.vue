<script setup>
import colors from '@/assets/github-data/colors.json'

const props = defineProps({
  lang: String,
})

const color = colors[props.lang]?.color || '#4b5563' // default gray-600
const opacity20 = color + '33' // 20% opacity
</script>

<template>
  <span
    v-if="lang"
    class="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-sm font-medium"
    :style="{ backgroundColor: opacity20, color: color }"
  >
    <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: color }"></span>
    <span>{{ lang }}</span>
  </span>

  <span v-else class="text-gray-400 italic text-sm"> unknown </span>
</template>

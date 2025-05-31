<script setup>
import colors from '@/assets/github-data/colors.json'

const props = defineProps({
  lang: String,
  percent: Number, // pour le mode 'bar'
  mode: {
    type: String,
    default: 'badge', // ou 'bar'
  },
})

const color = colors[props.lang]?.color || '#4b5563' // default gray-600
const opacity20 = color + '33' // 20% opacity
</script>

<template>
  <div
    v-if="mode === 'badge'"
    class="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-sm font-medium"
    :style="{ backgroundColor: opacity20, color: color }"
  >
    <span class="w-2.5 h-2.5 rounded-full" :style="{ backgroundColor: color }"></span>
    <span>{{ lang }}</span>
  </div>

  <div v-else-if="mode === 'bar'">
    <div class="flex justify-between items-center mb-2">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" :style="{ backgroundColor: color }"></div>
        <span class="font-medium gh-text">{{ lang }}</span>
      </div>
      <span class="text-sm gh-text-secondary">{{ percent.toFixed(1) }}%</span>
    </div>
    <div class="w-full rounded-full h-2 bg-gh-border-muted">
      <div class="h-2 rounded-full" :style="{ width: percent + '%', backgroundColor: color }"></div>
    </div>
  </div>
</template>

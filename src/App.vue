<script setup>
import { RouterView } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
const route = useRoute()

useSeoMeta({
  ogUrl: computed(() => {
    return `https://${import.meta.env.VITE_GITHUB_USERNAME}.github.io/#/${route.path.replace('/', '')}`
  }),
  canonical: computed(() => {
    return `https://${import.meta.env.VITE_GITHUB_USERNAME}.github.io/#/${route.path.replace('/', '')}`
  }),
})
</script>

<template>
  <RouterView />
</template>

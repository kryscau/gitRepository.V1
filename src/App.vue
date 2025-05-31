<script setup>
import { RouterView } from 'vue-router'
import { useSeoMeta } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import Navigation from '@/components/Navigation.vue'
const route = useRoute()
const USERNAME = import.meta.env.VITE_GITHUB_USERNAME

useSeoMeta({
  ogUrl: computed(() => {
    return `https://${USERNAME}.github.io/#/${route.path.replace('/', '')}`
  }),
  canonical: computed(() => {
    return `https://${USERNAME}.github.io/#/${route.path.replace('/', '')}`
  }),
  twitterCard: 'summary_large_image',
})

const username = USERNAME.charAt(0).toUpperCase() + USERNAME.slice(1)
</script>

<template>
  <!-- Navigation.vue -->
  <Navigation :username="username" />
  <!-- // -->
  <!-- RouterView -->
  <!-- Main Content -->
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Section -->
    <div
      class="gh-bg-secondary border rounded-2xl p-6 sm:p-8 mb-8"
      style="border: 1px solid var(--gh-border)"
    >
      <RouterView />
    </div>
    <!-- // -->
  </div>
  <!-- // -->
  <!-- // -->
</template>

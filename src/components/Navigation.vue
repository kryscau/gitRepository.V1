<template>
  <nav
    class="gh-bg-secondary border-b gh-border sticky top-0 z-50"
    style="border-bottom: 1px solid var(--gh-border)"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" rel="noopener nofollow">
          <div class="flex items-center space-x-3">
            <i class="fab fa-github text-2xl text-gh-text"></i>
            <span class="text-xl font-semibold text-gh-text">
              <span id="username">{{ username }}</span
              >'s Repositories
            </span>
          </div>
        </a>
        <div v-if="isRepositoryPage" class="flex items-center space-x-3 text-white">
          <button
            @click="goBack"
            class="flex items-center space-x-2 gh-accent hover:opacity-80 transition-colors text-white"
          >
            <i class="fas fa-arrow-left"></i>
            <span class="hidden sm:inline text-white">Back to Repositories</span>
          </button>
        </div>
        <!--<button
          class="md:hidden p-2 rounded-lg bg-gh-bg-tertiary hover:bg-gh-border transition-colors"
        >
          <i class="fas fa-bars text-gh-text-secondary"></i>
        </button>-->
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

defineProps({
  username: String,
})

const isRepositoryPage = computed(() => {
  return route.hash.startsWith('#/repository/') || route.path.startsWith('/repository/')
})

const goBack = () => {
  history.back()
}

/* Mobile menu toggle
document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('button')
  if (menuButton) {
    menuButton.addEventListener('click', function () {
      console.log('Mobile menu clicked')
    })
  }
}) */
</script>

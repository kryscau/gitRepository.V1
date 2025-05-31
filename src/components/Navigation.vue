<template>
  <nav
    class="gh-bg-secondary border-b gh-border sticky top-0 z-50"
    style="border-bottom: 1px solid var(--gh-border)"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <a href="/" rel="noopener nofollow"
          ><div class="flex items-center space-x-3">
            <i class="fab fa-github text-2xl text-gh-text"></i>
            <span class="text-xl font-semibold text-gh-text">
              <span id="username">{{ username }}</span
              >'s Repositories
            </span>
          </div></a
        >
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
defineProps({
  username: String,
})

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

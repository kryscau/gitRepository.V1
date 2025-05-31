<template>
  <!-- Repositories Section -->
  <div
    class="gh-bg-secondary border rounded-2xl p-6 sm:p-8"
    style="border: 1px solid var(--gh-border)"
  >
    <div class="flex items-center space-x-3 mb-6">
      <i class="fas fa-folder-open text-gh-accent text-xl"></i>
      <h2 class="text-xl sm:text-2xl font-bold text-gh-text">Public Repositories</h2>
    </div>
    <div class="space-y-4">
      <!-- Repository Card  -->
      <div
        v-for="repo in repositories"
        :key="repo.id"
        class="border rounded-xl p-4 sm:p-6 transition-all duration-300 repo-card"
        style="border: 1px solid var(--gh-border); background-color: rgba(33, 38, 45, 0.5)"
      >
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center space-x-2 mb-2">
              <router-link
                :to="
                  '/repository/' +
                  (repo.full_name.toLowerCase() ||
                    repo.owner.login.toLowerCase() + '/' + repo.name.toLowerCase())
                "
                :title="
                  'See ' +
                  (repo.full_name.toLowerCase() ||
                    repo.owner.login.toLowerCase() + '/' + repo.name.toLowerCase()) +
                  ' details'
                "
                rel="noopener"
              >
                <h3 class="text-lg font-semibold text-gh-accent hover:underline cursor-pointer">
                  {{ repo.full_name || repo.owner.login + '/' + repo.name }}
                </h3>
              </router-link>
              <div class="flex items-center space-x-2">
                <span class="flex items-center space-x-1 text-sm text-gh-text-secondary">
                  <i class="fas fa-star text-gh-attention"></i>
                  <span>{{ repo.stargazers_count || '0' }}</span>
                </span>
                <span class="flex items-center space-x-1 text-sm text-gh-text-secondary">
                  <i class="fas fa-code-branch"></i>
                  <span>{{ repo.forks_count || '0' }}</span>
                </span>
              </div>
            </div>
            <p class="text-gh-text-secondary mb-3">
              {{ repo.description || 'No description has been set.' }}
            </p>
            <div class="flex flex-wrap items-center gap-3 text-sm text-gh-text-secondary">
              <span class="flex items-center space-x-1" v-if="repo.language">
                <div class="w-3 h-3 rounded-full" :class="getLanguageClass(repo.language)"></div>
                <span>{{ repo.language }}</span>
              </span>
              <span v-else class="flex items-center space-x-1">
                <!-- No primary language found -->
              </span>
              <span v-if="repo.updated_at">Updated {{ formatDate(repo.updated_at) }}</span>
              <span v-if="repo.created_at">Created {{ formatDate(repo.created_at) }}</span>
            </div>
          </div>
        </div>
        <div class="flex flex-col sm:flex-row gap-3" v-if="repo.html_url || repo.homepage">
          <a v-if="repo.html_url" :href="repo.html_url" target="_blank" rel="noopener noreferrer">
            <button
              class="flex items-center justify-center space-x-2 px-4 py-2 gh-bg-tertiary hover:bg-gray-600 border rounded-lg transition-colors gh-text"
              style="border: 1px solid var(--gh-border)"
            >
              <i class="fas fa-code"></i>
              <span>View Code</span>
            </button>
          </a>
          <a v-if="repo.homepage" :href="repo.homepage" target="_blank" rel="noopener noreferrer">
            <button
              class="flex items-center justify-center space-x-2 px-4 py-2 bg-gh-accent-emphasis hover:bg-gh-accent text-white rounded-lg transition-colors"
              v-if="repo.homepage"
            >
              <i class="fas fa-external-link-alt"></i>
              <span>View Site</span>
            </button>
          </a>
        </div>
        <!-- //-->
      </div>
    </div>
  </div>
  <!-- // -->
</template>

<style>
.repo-card:hover {
  border-color: var(--gh-accent) !important;
  border-opacity: 0.5;
}
</style>

<script setup>
import { formatDistanceToNow } from 'date-fns'

defineProps({
  repositories: {
    type: Array,
    required: true,
  },
})

const getLanguageClass = (language) => {
  const classes = {
    HTML: 'bg-orange-500/20 text-orange-300',
    CSS: 'bg-blue-500/20 text-blue-300',
    Svelte: 'bg-orange-500/20 text-orange-300',
    PHP: 'bg-emerald-500/20 text-emerald-300',
    Astro: 'bg-red-500/20 text-red-300',
    JavaScript: 'bg-yellow-500/20 text-yellow-300',
    TypeScript: 'bg-blue-500/20 text-blue-300',
    Vue: 'bg-green-500/20 text-green-300',
    Python: 'bg-blue-400/20 text-blue-200',
    default: 'bg-gray-600/50 text-gray-300',
  }

  return classes[language] || classes.default
}

const formatDate = (date) => {
  if (!date) return 'Unknown date'
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}
</script>

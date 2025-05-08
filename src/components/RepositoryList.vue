<template>
  <div class="px-6 pt-3 pb-2 flex-grow flex flex-col min-h-0">
    <h2 class="text-base font-medium text-white mb-3 flex items-center sticky top-0">
      <svg
        class="w-4 h-4 mr-2 text-blue-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
        ></path>
      </svg>
      Public Repositories
    </h2>

    <div class="custom-scrollbar overflow-y-auto flex-grow pr-2 min-h-0">
      <div class="space-y-3 pb-2">
        <div
          v-for="repo in repositories"
          :key="repo.id"
          class="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
        >
          <div class="p-3">
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                {{ repo.full_name }}
              </h3>
              <div class="flex items-center space-x-3 text-xs text-gray-400">
                <span class="flex items-center">
                  <svg
                    class="w-3.5 h-3.5 mr-1 text-yellow-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    ></path>
                  </svg>
                  {{ repo.stargazers_count }}
                </span>
                <span class="flex items-center">
                  <svg
                    class="w-3.5 h-3.5 mr-1 text-purple-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    ></path>
                  </svg>
                  {{ repo.forks_count }}
                </span>
              </div>
            </div>

            <p class="mt-1.5 text-xs text-gray-300 line-clamp-2">{{ repo.description }}</p>

            <div class="mt-2 flex justify-between items-center">
              <span
                v-if="repo.language"
                class="px-2 py-0.5 text-xs font-medium rounded-full"
                :class="getLanguageClass(repo.language)"
              >
                {{ repo.language }}
              </span>
              <span v-else class="px-2 py-0.5"><!-- No primary language found --></span>
              <span v-if="repo.created_at" class="text-xs text-gray-400">
                <span v-if="repo.updated_at"> Upd {{ formatDate(repo.updated_at) }} </span>, Created
                {{ formatDate(repo.created_at) }}
              </span>
            </div>
          </div>

          <div class="flex border-t border-gray-700/50">
            <a
              :href="repo.html_url"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-2 text-center text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center justify-center"
            >
              <svg
                class="w-3.5 h-3.5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                ></path>
              </svg>
              View Code
            </a>

            <a
              v-if="repo.homepage"
              :href="repo.homepage"
              target="_blank"
              rel="noopener noreferrer"
              class="flex-1 py-2 text-center text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center justify-center border-l border-gray-700/50"
            >
              <svg
                class="w-3.5 h-3.5 mr-1.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                ></path>
              </svg>
              View Site
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

<style>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background-color: rgba(55, 65, 81, 0.3); /* gray-700 with opacity */
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: rgba(107, 114, 128, 0.5); /* gray-500 with opacity */
  border-radius: 9999px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background-color: rgba(156, 163, 175, 0.5); /* gray-400 with opacity */
}

/* For Firefox */
.custom-scrollbar {
  scrollbar-width: thin;
  scrollbar-color: rgba(107, 114, 128, 0.5) rgba(55, 65, 81, 0.3); /* thumb track */
}
</style>

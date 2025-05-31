<template>
  <router-link to="/" title="Back to Repositories" rel="noopener">
    <button
      class="absolute top-4 left-4 px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-800/70 text-white hover:bg-gray-700 transition-colors flex items-center border border-gray-700/50 backdrop-blur-sm shadow-lg"
    >
      <svg
        class="w-4 h-4 mr-1.5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        ></path>
      </svg>
      Back to Repositories
    </button></router-link
  >
  <div
    class="w-full max-w-3xl backdrop-blur-sm bg-gray-800/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-2rem)] border border-gray-700/50"
  >
    <div
      class="relative flex flex-col pt-6 pb-4 px-6 bg-gradient-to-b from-gray-800/80 to-gray-800/30 border-b border-gray-700/50"
    >
      <div class="flex items-start justify-between mb-3">
        <div>
          <h1 class="text-2xl font-bold text-white tracking-wide flex items-center">
            <svg
              class="w-5 h-5 mr-2 text-blue-400"
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
            {{ data.repository.full_name }}
          </h1>
          <div class="flex items-center mt-1 space-x-2">
            <span class="px-2 py-0.5 text-xs font-medium rounded-full bg-blue-500/20 text-blue-300">
              {{ data.repository.visibility }}
            </span>
            <span
              v-if="data.repository.archived"
              class="px-2 py-0.5 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300"
            >
              Archived
            </span>
          </div>
        </div>

        <div class="flex space-x-2">
          <a
            :href="data.repository.html_url"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3 py-1.5 text-sm font-medium rounded-lg bg-gray-700/50 text-white hover:bg-gray-700 transition-colors flex items-center"
          >
            <svg
              class="w-4 h-4 mr-1.5"
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
            v-if="data.repository.homepage"
            :href="data.repository.homepage"
            target="_blank"
            rel="noopener noreferrer"
            class="px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600/50 text-white hover:bg-blue-600 transition-colors flex items-center"
          >
            <svg
              class="w-4 h-4 mr-1.5"
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

      <p class="text-gray-300 text-sm mb-4">{{ data.repository.description }}</p>
      <div class="flex items-center space-x-4 text-xs text-gray-400">
        <div class="flex items-center">
          <svg
            class="w-4 h-4 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
          Created {{ formatDate(data.repository.created_at) }}
        </div>
        <div class="flex items-center">
          <svg
            class="w-4 h-4 mr-1 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          Updated {{ formatDate(data.repository.updated_at) }}
        </div>
      </div>
    </div>

    <div class="flex-grow overflow-y-auto custom-scrollbar">
      <div class="px-6 py-4 border-b border-gray-700/50">
        <h2 class="text-base font-medium text-white mb-3 flex items-center">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            ></path>
          </svg>
          Statistics
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div class="bg-gray-700/30 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
            <div class="flex items-center mb-1">
              <svg
                class="w-4 h-4 mr-1 text-yellow-400"
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
              <span class="text-sm font-medium text-white">Stars</span>
            </div>
            <span class="text-lg font-semibold text-white">{{
              data.repository.stargazers_count
            }}</span>
          </div>

          <div class="bg-gray-700/30 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
            <div class="flex items-center mb-1">
              <svg
                class="w-4 h-4 mr-1 text-purple-400"
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
              <span class="text-sm font-medium text-white">Forks</span>
            </div>
            <span class="text-lg font-semibold text-white">{{ data.repository.forks_count }}</span>
          </div>

          <div class="bg-gray-700/30 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
            <div class="flex items-center mb-1">
              <svg
                class="w-4 h-4 mr-1 text-teal-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                ></path>
              </svg>
              <span class="text-sm font-medium text-white">Watchers</span>
            </div>
            <span class="text-lg font-semibold text-white">{{
              data.repository.watchers_count
            }}</span>
          </div>

          <div class="bg-gray-700/30 backdrop-blur-sm rounded-xl p-3 flex flex-col items-center">
            <div class="flex items-center mb-1">
              <svg
                class="w-4 h-4 mr-1 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span class="text-sm font-medium text-white">Issues</span>
            </div>
            <span class="text-lg font-semibold text-white">{{
              data.repository.open_issues_count
            }}</span>
          </div>
        </div>
      </div>

      <div class="px-6 py-4 border-b border-gray-700/50">
        <h2 class="text-base font-medium text-white mb-3 flex items-center">
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
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            ></path>
          </svg>
          Languages
        </h2>

        <div class="space-y-3">
          <div v-for="(percentage, language) in data.languages" :key="language" class="space-y-1">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-300">{{ language }}</span>
              <span class="text-xs text-gray-400">{{ percentage }}%</span>
            </div>
            <div class="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
              <div
                class="h-full rounded-full"
                :class="getLanguageClass(language)"
                :style="{ width: `${percentage}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="px-6 py-4">
        <h2 class="text-base font-medium text-white mb-3 flex items-center">
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
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            ></path>
          </svg>
          Contributors ({{ data.length.contributors }})
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div v-for="contributor in data.contributors" :key="contributor.id">
            <a
              :href="contributor.html_url"
              title="See him on GitHub"
              target="_blank"
              rel="noopener"
            >
              <div
                class="bg-gray-700/30 backdrop-blur-sm rounded-xl p-3 flex items-center space-x-3 hover:bg-gray-700/50 transition-colors"
              >
                <img
                  :src="contributor.avatar_url"
                  :alt="contributor.login"
                  class="w-10 h-10 rounded-full object-cover border border-gray-700/50"
                />
                <div>
                  <h3 class="text-sm font-medium text-white">
                    {{ contributor.login }}
                    <span v-if="contributor.type != 'User'">[{{ contributor.type }}]</span>
                  </h3>
                  <p class="text-xs text-gray-400">{{ contributor.contributions }} contributions</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import { useRoute } from 'vue-router'
import { formatDistanceToNow } from 'date-fns'

const route = useRoute()
const owner = computed(() => route.params.owner)
const repo = computed(() => route.params.repo)

const data = ref({
  repository: [],
  languages: [],
  contributors: [],
  length: { contributors: 0 },
})

async function fetchRepositoryDetails(owner, repo) {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKENS
  const BASE_URL = import.meta.env.VITE_GITHUB_API_URL

  try {
    // Récupérer les données générales du dépôt
    const repoResponse = await fetch(`${BASE_URL}/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (!repoResponse.ok) throw new Error('Error retrieving repository data')
    const repoData = await repoResponse.json()

    // Récupérer les langages utilisés dans le dépôt
    const languagesResponse = await fetch(`${BASE_URL}/repos/${owner}/${repo}/languages`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (!languagesResponse.ok) throw new Error('Error retrieving languages data')
    const languagesData = await languagesResponse.json()

    // Calculer les pourcentages des langages
    const totalLines = Object.values(languagesData).reduce((sum, lines) => sum + lines, 0)
    const languagesWithPercentages = Object.entries(languagesData).reduce((acc, [lang, lines]) => {
      acc[lang] = parseFloat(((lines / totalLines) * 100).toFixed(1))
      return acc
    }, {})

    // Récupérer les contributeurs du dépôt
    const contributorsResponse = await fetch(`${BASE_URL}/repos/${owner}/${repo}/contributors`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })

    if (!contributorsResponse.ok) throw new Error('Error retrieving contributors data')
    const contributorsData = await contributorsResponse.json()

    data.value.repository = repoData
    data.value.languages = languagesWithPercentages
    data.value.contributors = contributorsData
    data.value.length.contributors = computed(() => {
      return contributorsData.length
    })

    return {
      repoData,
      languagesData,
      contributorsData,
    }
  } catch (error) {
    console.error('Error retrieving repository details:', error)
  }
}

const getLanguageClass = (language) => {
  const classes = {
    JavaScript: 'bg-yellow-500',
    TypeScript: 'bg-blue-500',
    Vue: 'bg-green-500',
    Python: 'bg-blue-400',
    Go: 'bg-cyan-500',
    Rust: 'bg-orange-500',
    Dart: 'bg-teal-500',
    CSS: 'bg-purple-500',
    HTML: 'bg-red-500',
    default: 'bg-gray-500',
  }

  return classes[language] || classes.default
}

const formatDate = (date) => {
  if (!date) return 'Unknown date'
  return formatDistanceToNow(new Date(date), { addSuffix: true })
}

onMounted(() => {
  fetchRepositoryDetails(owner.value, repo.value)
})

useSeoMeta({
  // Basic SEO
  title: computed(() => `${owner.value}/${repo.value} — Repository Details`),
  description: computed(
    () =>
      `Explore the ${owner.value}/${repo.value} repository on GitHub. Discover its features, contributors, and more.`,
  ),

  // Open Graph
  ogTitle: computed(() => `${owner.value}/${repo.value} — Repository Details`),
  ogDescription: computed(
    () =>
      `Explore the ${owner.value}/${repo.value} repository on GitHub. Discover its features, contributors, and more.`,
  ),

  // Twitter
  twitterTitle: computed(() => `${owner.value}/${repo.value} — Repository Details`),
  twitterDescription: computed(
    () =>
      `Explore the ${owner.value}/${repo.value} repository on GitHub. Discover its features, contributors, and more.`,
  ),
})
</script>

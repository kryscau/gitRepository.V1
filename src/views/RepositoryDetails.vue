<template>
  <div
    class="gh-bg-secondary border rounded-2xl p-6 sm:p-8 mb-8"
    style="border: 1px solid var(--gh-border)"
  >
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
      <div class="flex items-center space-x-3 mb-4 sm:mb-0">
        <i class="fas fa-folder-open gh-accent text-2xl"></i>
        <div>
          <h1 class="text-2xl sm:text-3xl font-bold gh-text">{{ data.repository.full_name }}</h1>
          <span
            class="inline-block text-xs px-2 py-1 rounded-full mt-3 border gh-success"
            style="background-color: rgba(63, 185, 80, 0.2); border-color: rgba(63, 185, 80, 0.3)"
          >
            {{ data.repository?.visibility?.toUpperCase() }}
          </span>
          <span
            class="ml-2 inline-block text-xs px-2 py-1 rounded-full mt-3 border text-orange-500 bg-orange-700/25"
            v-if="data.repository.archived"
          >
            ARCHIVED
          </span>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-3">
        <a
          :href="data.repository.html_url"
          target="_blank"
          rel="noopener noreferrer"
          v-if="data.repository.html_url"
        >
          <button
            class="flex items-center justify-center space-x-2 px-4 py-2 gh-bg-tertiary hover:bg-gray-600 border rounded-lg transition-colors gh-text"
            style="border: 1px solid var(--gh-border)"
          >
            <i class="fas fa-code"></i>
            <span>View Code</span>
          </button>
        </a>
        <a
          :href="data.repository.homepage"
          target="_blank"
          rel="noopener noreferrer"
          v-if="data.repository.homepage"
        >
          <button
            class="flex items-center justify-center space-x-2 px-4 py-2 bg-gh-accent-emphasis hover:bg-gh-accent text-white rounded-lg transition-colors"
          >
            <i class="fas fa-external-link-alt"></i>
            <span>View Site</span>
          </button>
        </a>
      </div>
    </div>

    <p class="gh-text-secondary mb-4">
      {{ data.repository.description || 'No description has been set.' }}
    </p>

    <div
      class="flex flex-wrap items-center gap-4 text-sm gh-text-secondary"
      v-if="data.repository.created_at || data.repository.updated_at"
    >
      <div class="flex items-center space-x-1" v-if="data.repository.created_at">
        <i class="fas fa-calendar-plus gh-text-muted"></i>
        <span>Created {{ formatDate(data.repository.created_at) }}</span>
      </div>
      <div class="flex items-center space-x-1" v-if="data.repository.updated_at">
        <i class="fas fa-sync-alt gh-text-muted"></i>
        <span>Updated {{ formatDate(data.repository.updated_at) }}</span>
      </div>
    </div>
  </div>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <!-- Statistics -->
    <div class="lg:col-span-2">
      <div
        class="gh-bg-secondary border rounded-2xl p-6 sm:p-8 mb-8"
        style="border: 1px solid var(--gh-border)"
      >
        <div class="flex items-center space-x-3 mb-6">
          <i class="fas fa-chart-bar gh-accent text-xl"></i>
          <h2 class="text-xl font-bold gh-text">Statistics</h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            class="gh-bg-tertiary border border-[var(--gh-border)] rounded-xl p-4 text-center transition-colors stat-card stars hover:border-yellow-400"
          >
            <i class="fas fa-star gh-attention text-2xl mb-2"></i>
            <div class="text-2xl font-bold gh-text">{{ data.repository.stargazers_count }}</div>
            <div class="text-sm gh-text-secondary">Stars</div>
          </div>
          <div
            class="gh-bg-tertiary border border-[var(--gh-border)] rounded-xl p-4 text-center transition-colors stat-card forks hover:border-blue-400"
          >
            <i class="fas fa-code-branch gh-accent text-2xl mb-2"></i>
            <div class="text-2xl font-bold gh-text">{{ data.repository.forks_count }}</div>
            <div class="text-sm gh-text-secondary">Forks</div>
          </div>
          <div
            class="gh-bg-tertiary border border-[var(--gh-border)] rounded-xl p-4 text-center transition-colors stat-card watchers hover:border-green-400"
          >
            <i class="fas fa-eye gh-success text-2xl mb-2"></i>
            <div class="text-2xl font-bold gh-text">{{ data.repository.watchers_count }}</div>
            <div class="text-sm gh-text-secondary">Watchers</div>
          </div>
          <div
            class="gh-bg-tertiary border border-[var(--gh-border)] rounded-xl p-4 text-center transition-colors stat-card issues hover:border-red-400"
          >
            <i class="fas fa-exclamation-triangle gh-danger text-2xl mb-2"></i>
            <div class="text-2xl font-bold gh-text">{{ data.repository.open_issues_count }}</div>
            <div class="text-sm gh-text-secondary">Issues</div>
          </div>
        </div>
      </div>

      <!-- Languages -->
      <div
        class="gh-bg-secondary border rounded-2xl p-6 sm:p-8"
        style="border: 1px solid var(--gh-border)"
      >
        <div class="flex items-center space-x-3 mb-6">
          <i class="fas fa-code gh-accent text-xl"></i>
          <h2 class="text-xl font-bold gh-text">Languages</h2>
        </div>

        <div class="space-y-4">
          <div v-for="(percentage, language) in data.languages" :key="language">
            <LangBadge :key="language" :lang="language" :percent="percentage" mode="bar" />
          </div>
        </div>
      </div>
    </div>
    <!-- // -->

    <!-- Contributors -->
    <div class="lg:col-span-1">
      <div
        class="gh-bg-secondary border rounded-2xl p-6 sm:p-8"
        style="border: 1px solid var(--gh-border)"
      >
        <div class="flex items-center space-x-3 mb-6">
          <i class="fas fa-users gh-accent text-xl"></i>
          <h2 class="text-xl font-bold gh-text">Contributors ({{ data.length.contributors }})</h2>
        </div>

        <div class="space-y-4">
          <div
            class="flex items-center space-x-3 p-3 rounded-xl gh-bg-tertiary hover:bg-gray-600 transition-colors border"
            style="border: 1px solid var(--gh-border-muted)"
            v-for="contributor in data.contributors"
            :key="contributor.id"
          >
            <img
              :src="contributor.avatar_url || '/assets/img/placeholder.jpg'"
              :alt="contributor.login"
              class="w-10 h-10 rounded-full border-2"
              style="border-color: var(--gh-border)"
            />

            <div class="flex-1">
              <a
                :href="contributor.html_url"
                title="See him on GitHub"
                target="_blank"
                rel="noopener"
              >
                <div class="font-medium gh-text">{{ contributor.login }}</div>
              </a>
              <div class="text-sm gh-text-secondary">
                {{ contributor.contributions }} contributions
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- // -->
  </div>
</template>

<script setup>
import LangBadge from '@/components/ui/LangBadge.vue'
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

<template>
  <div>
    <div
      class="w-full max-w-md backdrop-blur-sm bg-gray-800/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-2rem)] border border-gray-700/50"
    >
      <ProfileHeader
        :nickname="user.nickname"
        :username="user.username"
        :avatar-url="user.avatarUrl"
        :stats="{
          repositories: user.stats.repositories,
          followers: user.stats.followers,
          following: user.stats.following,
        }"
        :bio="user.bio"
        :location="user.location"
        :blog="user.blog"
        :company="user.company"
      />

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

        <RepositoryList v-if="repositories.length > 0" :repositories="repositories" />
        <div
          v-else
          class="bg-gray-800/80 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 group"
        >
          <div class="p-3">
            <div class="flex justify-between items-start">
              <h3 class="font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                Loading...
              </h3>
            </div>
            <p class="mt-1.5 text-xs text-gray-300 line-clamp-2">
              The repositories are loading, please wait a moment...
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import RepositoryList from '@/components/RepositoryList.vue'

const user = ref({
  nickname: import.meta.env.VITE_GITHUB_USERNAME,
  username: import.meta.env.VITE_GITHUB_USERNAME,
  bio: null,
  location: null,
  blog: null,
  company: null,
  avatarUrl: '/assets/img/placeholder.jpg',
  stats: { repositories: 0, followers: 0, following: 0 },
})
const repositories = ref([])

async function fetchGitHubData() {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKENS
  const BASE_URL = 'https://api.github.com'

  try {
    const userResponse = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (!userResponse.ok) throw new Error('Error recovering user data')
    const userData = await userResponse.json()

    user.value.nickname = userData.name || userData.login[0].toUpperCase() + userData.login.slice(1)
    user.value.username = userData.login
    user.value.avatarUrl = userData.avatar_url
    user.value.stats = {
      repositories: userData.public_repos + userData.owned_private_repos,
      followers: userData.followers,
      following: userData.following,
    }
    user.value.bio = userData.bio
    user.value.location = userData.location
    user.value.blog = userData.blog
    user.value.company = userData.company

    const reposResponse = await fetch(`${BASE_URL}/user/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (!reposResponse.ok) throw new Error('Error retrieving repositories')
    const reposData = await reposResponse.json()

    repositories.value = reposData.filter((repo) => {
      const forbiddenNames = ['.github', 'DiscussionsHost']
      const hasForbiddenWordInName = ['demo', 'backup', 'test', 'old'].some((word) =>
        repo.name.toLowerCase().includes(word),
      )
      const hasForbiddenDescription =
        repo.description && repo.description.toLowerCase().includes('just a redirect')

      return (
        !forbiddenNames.includes(repo.name) && !hasForbiddenWordInName && !hasForbiddenDescription
      )
    })
  } catch (error) {
    console.error('Error retrieving GitHub data :', error)
  }
}

useSeoMeta({
  // Basic SEO
  title: computed(() => `Repository — ${user.value.nickname} (@${user.value.username})`),
  description: computed(
    () =>
      `Discover all the GitHub repos and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),

  // Open Graph
  ogTitle: computed(() => `Repository — ${user.value.nickname} (@${user.value.username})`),
  ogDescription: computed(
    () =>
      `Discover all the GitHub repos and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),

  // Twitter
  twitterTitle: computed(() => `Repository — ${user.value.nickname} (@${user.value.username})`),
  twitterDescription: computed(
    () =>
      `Discover all the GitHub repos and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),
  twitterCard: 'summary_large_image',
})

onMounted(() => {
  fetchGitHubData()
})
</script>

<style>
/* Hide scrollbar for the main page */
html,
body {
  overflow: hidden;
  background-color: #111827; /* bg-gray-900 */
}

/* Add line clamp utility */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

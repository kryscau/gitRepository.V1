<template>
  <div
    class="h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4 overflow-hidden"
  >
    <div
      class="w-full max-w-md backdrop-blur-sm bg-gray-800/70 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-2rem)] border border-gray-700/50"
    >
      <ProfileHeader
        :nickname="nickname"
        :username="username"
        :avatar-url="avatarUrl"
        :stats="{
          repositories: stats.repositories,
          followers: stats.followers,
          following: stats.following,
        }"
      />

      <RepositoryList v-if="repositories.length > 0" :repositories="repositories" />
      <p v-else class="text-center text-gray-400 mt-4">Chargement des repositories...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import RepositoryList from '@/components/RepositoryList.vue'

// Reactive variables for storing data
const nickname = ref('')
const username = ref('')
const avatarUrl = ref('')
const stats = ref({ repositories: 0, followers: 0, following: 0 })
const repositories = ref([])

// Function to retrieve data from the GitHub API
async function fetchGitHubData() {
  const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_API_TOKENS
  const BASE_URL = 'https://api.github.com'

  try {
    // Retrieve user information
    const userResponse = await fetch(`${BASE_URL}/user`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (!userResponse.ok) throw new Error('Error recovering user data')
    const userData = await userResponse.json()

    nickname.value = userData.name || userData.login[0].toUpperCase() + userData.login.slice(1)
    username.value = userData.login
    avatarUrl.value = userData.avatar_url
    stats.value = {
      repositories: computed(() => userData.public_repos + userData.owned_private_repos),
      followers: userData.followers,
      following: userData.following,
    }

    // Recover repositories
    const reposResponse = await fetch(`${BASE_URL}/user/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    })
    if (!reposResponse.ok) throw new Error('Error retrieving repositories')
    const reposData = await reposResponse.json()

    repositories.value = reposData.filter((repo) => {
      const forbiddenNames = ['.github', 'DiscussionsHost']

      const hasForbiddenWordInName =
        repo.name.includes('demo') ||
        repo.name.includes('backup') ||
        repo.name.includes('test') ||
        repo.name.includes('old')

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

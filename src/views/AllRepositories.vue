<template>
  <ProfileSection
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
    class="mb-5"
  />
  <RepositorySection v-if="repositories.length > 0" :repositories="repositories" />
  <div v-else>
    <div
      class="gh-bg-secondary border rounded-2xl p-6 sm:p-8"
      style="border: 1px solid var(--gh-border)"
    >
      <div class="flex items-center space-x-3 mb-6">
        <i class="fas fa-folder-open text-gh-accent text-xl"></i>
        <h2 class="text-xl sm:text-2xl font-bold text-gh-text">Repositories loading...</h2>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useSeoMeta } from '@unhead/vue'
import ProfileSection from '@/components/ProfileSection.vue'
import RepositorySection from '@/components/RepositorySection.vue'

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
  const BASE_URL = import.meta.env.VITE_GITHUB_API_URL

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

    console.log(repositories.value)
  } catch (error) {
    console.error('Error retrieving GitHub data :', error)
  }
}

useSeoMeta({
  // Basic SEO
  title: computed(() => `Repositories — ${user.value.nickname} (@${user.value.username})`),
  description: computed(
    () =>
      `Discover all the GitHub Repositories and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),

  // Open Graph
  ogTitle: computed(() => `Repositories — ${user.value.nickname} (@${user.value.username})`),
  ogDescription: computed(
    () =>
      `Discover all the GitHub Repositories and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),

  // Twitter
  twitterTitle: computed(() => `Repositories — ${user.value.nickname} (@${user.value.username})`),
  twitterDescription: computed(
    () =>
      `Discover all the GitHub Repositories and primary statistics for ${user.value.nickname} (@${user.value.username}) on this page.`,
  ),
})

onMounted(() => {
  fetchGitHubData()
})
</script>

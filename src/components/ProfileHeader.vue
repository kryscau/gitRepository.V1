<template>
  <div class="relative flex flex-col items-center pt-8 pb-5 px-6">
    <div class="absolute top-8 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>

    <div class="relative mb-4 z-10">
      <div
        class="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-sm opacity-70"
      ></div>
      <img
        :src="avatarUrl || '/assets/img/placeholder.jpg'"
        :alt="`${username}'s avatar`"
        draggable="false"
        class="relative w-20 h-20 rounded-full object-cover border-2 border-gray-700/50 shadow-lg z-10"
      />
    </div>

    <div class="text-center mb-4 z-10">
      <div class="flex items-center justify-center space-x-2">
        <h1 class="text-xl font-bold text-white tracking-wide">{{ nickname }}</h1>
        <span class="text-xs text-gray-400">@{{ username }}</span>
      </div>

      <div
        class="flex items-center justify-center space-x-4 text-gray-400 text-sm mt-2"
        v-if="location"
      >
        <div class="flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 2a6 6 0 00-6 6c0 4.2 6 10 6 10s6-5.8 6-10a6 6 0 00-6-6zm0 8a2 2 0 110-4 2 2 0 010 4z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ location }}</span>
        </div>

        <div class="flex items-center" v-if="blog">
          <svg
            class="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7-7 7M5 5h9v14H5z" />
          </svg>
          <a
            :href="blog"
            target="_blank"
            title="Visit my blog"
            rel="noopener noreferrer"
            class="hover:text-blue-500 transition-colors duration-300"
          >
            Blog
          </a>
        </div>

        <div class="flex items-center" v-if="company">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 2a1 1 0 00-1 1v14h2v-2h6v2h2V3a1 1 0 00-1-1H6zm1 3h6v2H7V5zm0 4h6v2H7V9z" />
          </svg>
          <span class="hover:text-blue-500 transition-colors duration-300">{{ company }}</span>
        </div>
      </div>

      <p class="mt-2 text-sm text-gray-300 line-clamp-2" :title="bio" v-if="bio">
        {{ bio }}
      </p>
    </div>

    <div class="flex justify-between w-full max-w-xs z-10">
      <div
        class="flex flex-col items-center px-3 py-1.5 rounded-xl bg-gray-700/30 backdrop-blur-sm"
      >
        <span class="text-base font-semibold text-white">{{ stats.repositories }}</span>
        <span class="text-xs text-gray-400">Owned Repos</span>
      </div>
      <div
        class="flex flex-col items-center px-3 py-1.5 rounded-xl bg-gray-700/30 backdrop-blur-sm"
      >
        <span class="text-base font-semibold text-white">{{ stats.followers }}</span>
        <span class="text-xs text-gray-400">Followers</span>
      </div>
      <div
        class="flex flex-col items-center px-3 py-1.5 rounded-xl bg-gray-700/30 backdrop-blur-sm"
      >
        <span class="text-base font-semibold text-white">{{ stats.following }}</span>
        <span class="text-xs text-gray-400">Following</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nickname: String,
  username: String,
  avatarUrl: String,
  stats: Object,
  bio: String,
  location: String,
  blog: String,
  company: String,
})
</script>

<template>
  <div class="relative flex flex-col items-center pt-8 pb-5 px-6">
    <!-- Effet de halo derrière la photo -->
    <div class="absolute top-8 w-20 h-20 bg-blue-500/20 rounded-full blur-xl"></div>

    <!-- Photo de profil -->
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

    <!-- Username et nickname -->
    <div class="text-center mb-4 z-10">
      <h1 class="text-xl font-bold text-white tracking-wide">{{ nickname }}</h1>
      <div class="flex items-center justify-center text-gray-400 mt-0.5">
        <span class="text-xs font-light">@</span>
        <span class="text-sm ml-0.5 font-light">{{ username }}</span>
      </div>
    </div>

    <!-- Stats avec design moderne -->
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
  handle: String,
  avatarUrl: String,
  stats: Object,
})
</script>

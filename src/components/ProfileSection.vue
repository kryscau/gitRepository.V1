<template>
  <!-- Profile Section -->
  <div
    class="gh-bg-secondary border rounded-2xl p-6 sm:p-8 mb-8"
    style="border: 1px solid var(--gh-border)"
  >
    <div
      class="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8"
    >
      <!-- Left side: Avatar + Info -->
      <div
        class="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6 flex-1"
      >
        <!-- Avatar -->
        <div class="relative">
          <img
            :src="avatarUrl || '/assets/img/placeholder.jpg'"
            :alt="`${username || 'Placeholder'}'s avatar`"
            draggable="false"
            class="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4"
            style="border-color: var(--gh-border)"
          />
          <div
            class="absolute -bottom-2 -right-2 w-8 h-8 bg-gh-success rounded-full border-4 gh-bg-secondary"
            style="border-color: var(--gh-bg-secondary)"
          ></div>
        </div>
        <!-- // -->

        <!-- Profile Info -->
        <div class="flex-1 text-center sm:text-left">
          <h1 class="text-2xl sm:text-3xl font-bold text-gh-text mb-2" v-if="nickname">
            {{ nickname }}
          </h1>
          <p class="text-gh-text-secondary mb-3" v-if="username">@{{ username }}</p>

          <div
            class="flex flex-wrap justify-center sm:justify-start items-center gap-4 mb-4 text-sm gh-text-secondary"
            v-if="location || blog"
          >
            <div class="flex items-center space-x-1" v-if="location">
              <i class="fas fa-map-marker-alt gh-text-muted"></i>
              <span>{{ location }}</span>
            </div>
            <div class="flex items-center space-x-1" v-if="company">
              <i class="fas fa-building gh-text-muted"></i>
              <span>{{ company }}</span>
            </div>
            <div class="flex items-center space-x-1" v-if="blog">
              <i class="fas fa-blog gh-text-muted"></i>
              <a
                :href="blog"
                target="_blank"
                title="Visit my blog"
                rel="noopener noreferrer"
                class="hover:text-white transition-colors duration-300"
              >
                <span>{{
                  blog.replace('https://', '').replace('http://', '').replace('www.', '')
                }}</span>
              </a>
            </div>
          </div>

          <p class="text-gh-text-secondary mb-6 max-w-md" :title="bio" v-if="bio">
            {{ bio }}
          </p>
        </div>
        <!-- // -->
      </div>
      <!-- // -->

      <!-- Right side: Stats boxes -->
      <div class="flex flex-col space-y-3 lg:min-w-[200px]">
        <!-- Repos Box -->
        <div
          class="gh-bg-tertiary border rounded-lg p-1 text-center hover:border-gh-accent transition-colors"
          style="border: 1px solid var(--gh-border)"
        >
          <div class="text-2xl font-bold gh-text">{{ stats.repositories }}</div>
          <div class="text-sm gh-text-secondary">Owned Repos</div>
        </div>
        <!-- // -->

        <!-- Followers Box -->
        <div
          class="gh-bg-tertiary border rounded-lg p-1 text-center hover:border-gh-accent transition-colors"
          style="border: 1px solid var(--gh-border)"
        >
          <div class="text-2xl font-bold gh-text">{{ stats.followers }}</div>
          <div class="text-sm gh-text-secondary">Followers <3</div>
        </div>
        <!-- // -->

        <!-- Following Box -->
        <div
          class="gh-bg-tertiary border rounded-lg p-1 text-center hover:border-gh-accent transition-colors"
          style="border: 1px solid var(--gh-border)"
        >
          <div class="text-2xl font-bold gh-text">{{ stats.following }}</div>
          <div class="text-sm gh-text-secondary">Following</div>
        </div>
        <!-- // -->
      </div>
      <!-- // -->
    </div>
  </div>
  <!-- // -->
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

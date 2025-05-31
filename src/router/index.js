import { createRouter, createWebHashHistory } from 'vue-router'
import AllRepositories from '../views/AllRepositories.vue'
import RepositoryDetails from '@/views/RepositoryDetails.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'repository-all',
      component: AllRepositories,
    },
    {
      path: '/repository/:owner/:repo',
      name: 'repository-details',
      component: RepositoryDetails,
    },
  ],
})

export default router

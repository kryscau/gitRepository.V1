import { createRouter, createWebHashHistory } from 'vue-router'
import RepositoryView from '../views/RepositoryView.vue'
import RepositoryDetailsView from '@/views/RepositoryDetailsView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'repository',
      component: RepositoryView,
    },
    {
      path: '/repository/:owner/:repo',
      name: 'repository-details',
      component: RepositoryDetailsView,
    },
  ],
})

export default router

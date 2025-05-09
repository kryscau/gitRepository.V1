import { createRouter, createWebHashHistory } from 'vue-router'
import RepositoryView from '../views/RepositoryView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'repository',
      component: RepositoryView,
    },
  ],
})

export default router

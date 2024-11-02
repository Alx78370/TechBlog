import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/about', component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/users', component: () => import('../views/UserListView.vue'),
    },
    {
      path: '/user/:id', component: () => import('../views/UserView.vue'),
    }
  ]
})

export default router

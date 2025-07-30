import { createRouter, createWebHistory, type NavigationGuardNext, type RouteLocationNormalized, type RouteRecordRaw } from 'vue-router'
import { globalStartupGuard, authGuard } from '@/utils/global/session-helper'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('@/layouts/applayout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { keepAlive: true }
      },
    ],
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/views/Checkout.vue'),
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/Success.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  globalStartupGuard(to).then(() => {
    authGuard(to, from, next)
  })
})
export default router

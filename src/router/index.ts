import { createRouter, createWebHashHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import { firstMenu } from '@/utils/map-menus';
import localCache from '@/utils/cache';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
  },
]
const router = createRouter({
    routes,
    history: createWebHashHistory()
})

// 路由跳转规则

router.beforeEach((to) => {
  if (to.path !== 'login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
    if (to.path === '/main') {
      return firstMenu.path;
    }
  }
})
export default router;

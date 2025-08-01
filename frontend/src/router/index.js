import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/train/basic_cal',
      name: 'TrainBasicCal',
      // 使用路由懶加載，只有在訪問這個頁面時，才會加載對應的程式碼
      component: () => import('../views/TrainBasicCalView.vue')
    }
  ]
});

export default router;
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("../views/SignUp.view.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/counter",
      name: "counter",
      component: () => import("../views/CounterView.vue")
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("../views/CategoriesView.vue")
    }
  ],
})

export const redicrectToHome = () => router.replace("/")

export default router

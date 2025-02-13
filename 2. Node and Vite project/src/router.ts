import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/views/HomeView.vue'

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
      component: () => import("./components/views/LoginView.vue")
    },
    {
      path: "/signup",
      name: "signup",
      component: () => import("./components/views/SignUpView.vue")
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./components/views/AboutView.vue'),
    },
    {
      path: "/counter",
      name: "counter",
      component: () => import("./components/views/CounterView.vue")
    },
    {
      path: "/categories",
      name: "categories",
      component: () => import("./components/views/CategoriesView.vue")
    }
  ],
})

export const redirectToHome = () => router.replace("/")

export default router

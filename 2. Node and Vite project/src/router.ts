import { createRouter, createWebHistory, type RouteLocationRaw } from 'vue-router'
import HomeView from './components/views/HomeView.vue'

export const Routes = {
  SignupEmailVerification: 'signup-email-verification',
  ResetPassword: 'reset-password',
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    /*{
      path: "/login",
      name: "login",
      component: () => import("./components/views/LoginView.vue")
    },*/
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./components/views/SignUpView.vue'),
    },
    {
      path: '/signup-email-verification',
      name: Routes.SignupEmailVerification,
      component: () => import('./components/views/Signup_EmailVerificationView.vue'),
    },
    {
      path: '/signup-email-verified',
      name: 'signup-email-verified',
      component: () => import('./components/views/Signup_EmailVerifiedView.vue'),
    },
    {
      path: 'reseet-password',
      name: Routes.ResetPassword,
      component: () => import('./components/views/ResetPasswordView.vue'),
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
      path: '/categories',
      name: 'categories',
      component: () => import('./components/views/CategoriesView.vue'),
    },
  ],
})

export const redirectToHome = () => router.replace('/')
export const goTo = (path: string) => router.push({ name: path })

export default router

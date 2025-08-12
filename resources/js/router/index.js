import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Importez vos composants de vue
import HomeView from '@/components/Home.vue'
import LoginView from '@/components/auth/Login.vue'
import RegisterView from '@/components/auth/Register.vue'
import TaskListView from '@/components/tasks/List.vue'
import NotFoundView from '@/components/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Accueil',
        requiresAuth: false
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        title: 'Connexion',
        guestOnly: true
      }
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
      meta: {
        title: 'Inscription',
        guestOnly: true
      }
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TaskListView,
      meta: {
        title: 'Mes tâches',
        requiresAuth: true
      }
    },

    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
      meta: {
        title: 'Page non trouvée'
      }
    }
  ]
})


router.beforeEach(async (to, from, next) => {
 const authStore = useAuthStore()


  if (to.meta.requiresAuth) {

    if (!authStore.isAuthenticated) {
      try {

        await authStore.fetchUser()
      } catch (error) {
        return next({ name: 'login'})
      }
    }

    if (!authStore.isAuthenticated) {
      return next({ name: 'login'})
    }
  }

  if (to.meta.guestOnly && authStore.isAuthenticated) {
    return next({ name: 'home' })
  }

  document.title = to.meta.title ? `${to.meta.title} | TodoApp` : 'TodoApp'

  next()
})

export default router

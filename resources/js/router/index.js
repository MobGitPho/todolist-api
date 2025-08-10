import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// Importez vos composants de vue
import HomeView from '@/components/Home.vue'
import LoginView from '@/components/auth/Login.vue'
import RegisterView from '@/components/auth/Register.vue'
import TaskListView from '@/components/tasks/List.vue'
import TaskItemView from '@/components/tasks/Item.vue'
import TaskFormView from '@/components/tasks/Form.vue'
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
    // Gestion des erreurs 404
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
  const userStore = useUserStore()


  if (to.meta.requiresAuth) {

    if (!userStore.isAuthenticated) {
      try {

        await userStore.fetchUser()
      } catch (error) {
        // Redirection vers la page de connexion si échec
        return next({ name: 'login', path:'/login'  })
      }
    }

    // Si l'utilisateur est toujours non connecté après le fetch
    if (!userStore.isAuthenticated) {
      return next({ name: 'login', path:'/login' })
    }
  }

  // Si la route est réservée aux invités (login/register)
  if (to.meta.guestOnly && userStore.isAuthenticated) {
    return next({ name: 'home', path:'/login'  }) // Redirige vers le dashboard si déjà connecté
  }

  // Met à jour le titre de la page
  document.title = to.meta.title ? `${to.meta.title} | TodoApp` : 'TodoApp'

  next()
})

export default router

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
      path: '/form',
      name: 'formulaire',
      component: TaskFormView,
      meta: {
        title: 'Formulaire TasK',
        requiresAuth: true
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

/**
 * Gestion des guards de navigation
 */
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Si la route nécessite une authentification
  if (to.meta.requiresAuth) {
    // Si l'utilisateur n'est pas connecté
    if (!userStore.isAuthenticated) {
      try {
        // Tentative de récupération de l'utilisateur
        await userStore.fetchUser()
      } catch (error) {
        // Redirection vers la page de connexion si échec
        return next({ name: 'login', query: { redirect: to.fullPath } })
      }
    }

    // Si l'utilisateur est toujours non connecté après le fetch
    if (!userStore.isAuthenticated) {
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }
  }

  // Si la route est réservée aux invités (login/register)
  if (to.meta.guestOnly && userStore.isAuthenticated) {
    return next({ name: 'dashboard' }) // Redirige vers le dashboard si déjà connecté
  }

  // Met à jour le titre de la page
  document.title = to.meta.title ? `${to.meta.title} | TodoApp` : 'TodoApp'

  next()
})

export default router

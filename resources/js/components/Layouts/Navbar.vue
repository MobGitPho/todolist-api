<script setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = () => {
    authStore.logout()
    router.push('/')
}
</script>

<template>
  <nav>
    <h1>Todo List</h1>
    <ul>
      <li><router-link to="/">Accueil</router-link></li>
      <li v-if="authStore.isAuthenticated"><router-link to="/tasks">Mes Tâches</router-link></li>
      <li v-if="!authStore.token"><router-link to="/login">Connexion</router-link></li>
      <li v-else>
        <button @click="handleLogout" class="logout-btn">Déconnexion</button>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
    nav {
        background-color: #42b983;
        padding: 1rem;
        color: white;
        margin-bottom: 20px;
    }

    nav h1 {
        margin: 0;
    }

    nav ul {
        list-style: none;
        padding: 0;
    }

    nav ul li {
        display: inline;
        margin-right: 15px;
    }

    nav ul li a {
        color: white;
        text-decoration: none;
    }

    .logout-btn {
        background: none;
        border: none;
        color: white;
        font: inherit;
        cursor: pointer;
        padding: 0;
        text-decoration: none;
    }

    .logout-btn:hover {
        text-decoration: none;
        border: 1px solid #fff;
        padding: 0.5rem;
        border-radius: 5px;
    }
</style>

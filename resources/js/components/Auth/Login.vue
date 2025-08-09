<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errors = ref({

})

const handleLogin = async () => {
  try {
    await authStore.login(form.value)
    router.push('/task')
  } catch (error) {
    errors.value = error.response?.data?.errors || {}
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input v-model="form.email" type="email" placeholder="email" required>
        <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
      </div>

      <div class="form-group">

        <input v-model="form.password" type="password" placeholder="mot de passe" required>
        <span v-if="errors.password" class="error">{{ errors.password[0] }}</span>
      </div>

      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<style scoped>
.auth-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.form-group {
  margin-bottom: 1rem;
}

.error {
  color: red;
  font-size: 0.875rem;
}
</style>

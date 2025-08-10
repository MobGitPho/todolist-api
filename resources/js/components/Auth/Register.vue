<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  name:'',
  email: '',
  password: ''
})

const errorMsg = ref('')
const errors = ref({})
const loading = ref(false)

const handleLogin = async () => {
  errorMsg.value = ''
  errors.value = {}
  loading.value = true

  try {
    await authStore.register(form.value)
    window.location.href = '/tasks'//
  } catch (error) {
    const res = error.response?.data
    errorMsg.value = res?.message || 'Veuillew remplir tous les champs; mot de passe superieur à 8 caratères!'
    errors.value = res?.errors || {}
  } finally {
    loading.value = false
  }
}

// Focus automatique sur le champ email au chargement
const emailInput = ref(null)
onMounted(() => {
  emailInput.value?.focus()
})
</script>

<template>
  <div class="auth-container">
    <div class="auth-card">
      <!-- Header -->
      <div class="auth-header">
        <h1 class="auth-title">Bienvenue</h1>
        <p class="auth-subtitle">S'inscire sur TodoApp</p>
      </div>

      <!-- Error Global -->
      <div v-if="errorMsg" class="alert alert-error">
        {{ errorMsg }}
      </div>

      <!-- Form -->
      <form @submit.prevent="handleLogin" class="auth-form">

        <div class="form-group">
          <!-- <label for="name" class="form-label">Nom</label> -->
          <input
            id="name"
            ref="nameInput"
            v-model="form.name"
            type="text"
            class="form-input"
            :class="{ 'form-input-error': errors.name }"
            placeholder="John Doe"
            required
          />
          <span v-if="errors.name" class="form-error">{{ errors.name[0] }}</span>
        </div>
        <div class="form-group">
          <input
            id="email"
            ref="emailInput"
            v-model="form.email"
            type="email"
            class="form-input"
            :class="{ 'form-input-error': errors.email }"
            placeholder="vous@exemple.com"
            required
          />
          <span v-if="errors.email" class="form-error">{{ errors.email[0] }}</span>
        </div>
        <div class="form-group">
          <input
            id="password"
            v-model="form.password"
            type="password"
            class="form-input"
            :class="{ 'form-input-error': errors.password }"
            placeholder="••••••••"
            required
          />
          <span v-if="errors.password" class="form-error">{{ errors.password[0] }}</span>
        </div>
        <button
          type="submit"
          class="btn btn-primary"
          :disabled="loading"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>{{ form.password ? 'Se connecter' : 'Continuer' }}</span>
        </button>
        <p class="auth-footer">
          Vous avez déjà un compte ?
          <router-link to="/login" class="link">Se connecter</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f9f9f9 0%, #eef2f6 100%);
  padding: 1rem;
}

.auth-card {
  width: 100%;
  max-width: 420px;
  padding: 2rem;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(4px);
  border: 1px solid #e0e0e0;
}

.auth-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.auth-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.auth-subtitle {
  color: #6b7280;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.alert-error {
  background: #fee2e2;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  text-align: center;
  border: 1px solid #fecaca;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.5rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.form-input-error {
  border-color: #ef4444 !important;
}

.form-error {
  font-size: 0.75rem;
  color: #ef4444;
  margin-top: 0.5rem;
  display: block;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.btn-primary {
  background: #3b82f6;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2563eb;
}

.btn:disabled {
  background: #9ca3af;
  cursor: not-allowed;
  opacity: 0.8;
}

.loader {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #ffffff;
  border-radius: 50%;
  border-top-color: transparent;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.auth-footer {
  text-align: center;
  font-size: 0.875rem;
  color: #4b5563;
  margin-top: 1.5rem;
}

.link {
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* Responsive */
@media (max-width: 480px) {
  .auth-card {
    padding: 1.5rem;
  }
  .auth-title {
    font-size: 1.5rem;
  }
}
</style>

<!-- <script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  email: '',
  password: ''
})

const errorMsg = ref()

const errors = ref({})

const handleLogin = async () => {
  try {
    await authStore.login(form.value)
    window.location.href = '/tasks'
  } catch (error) {
    errorMsg.value = 'Email ou mot de passe incorrect'
    errors.value = error.response?.data?.errors || {}
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Connexion</h2>
    <span v-if="errors" class="error">{{ errorMsg }}</span>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <input v-model="form.email" type="email" placeholder="email" required>

      </div>

      <div class="form-group">

        <input v-model="form.password" type="password" placeholder="mot de passe" required>

      </div>


      <button type="submit">Se connecter</button>
      <p> Vous n'avez pas de compte? veuillez vous <router-link to="/register"> s'inscrire</router-link></p>
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
  text-align: justify;


form{
  padding-top: 20px;
}
}

a {
  color: black;
  text-decoration: none;
}
</style> -->


<!-- <script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const form = ref({
  name: '',
  email: '',
  password: ''
})

const errors = ref({})
const passwordMsg = 'le mot de passe doit contenir au moins 8 caractère'
const handleLogin = async () => {
  try {
    await authStore.register(form.value)
    router.push('/login')
  } catch (error) {
    errors.value = error.response?.data?.errors || {}
  }
}
</script>

<template>
  <div class="auth-form">
    <h2>Inscription</h2>
    <form @submit.prevent="handleLogin">
        <div class="form-group">

        <input v-model="form.name" type="text" placeholder="Nom" required>
        <span v-if="errors.name" class="error">{{ errors.name[0] }}</span>
      </div>

      <div class="form-group">

        <input v-model="form.email" type="email" placeholder="email" required>
        <span v-if="errors.email" class="error">{{ errors.email[0] }}</span>
      </div>

      <div class="form-group">

        <input v-model="form.password" type="password" placeholder="mot de passe" required>
        <span v-if="errors.password" class="error">{{ passwordMsg }}</span>
      </div>

      <button type="submit">S'inscrire</button>
       <p> Vous avez déjà un compte? veuillez vous <router-link to="/login"> connecter</router-link></p>
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

a {
  color: black;
  text-decoration: none;
}
</style> -->

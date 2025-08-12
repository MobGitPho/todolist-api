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
const succesMsg = ref('')
const errors = ref({})
const loading = ref(false)
const emailInput = ref(null)

const handleRegister = async () => {
    errorMsg.value = ''
    succesMsg.value = ''
    errors.value = {}
    loading.value = true

    try {
        const res = await authStore.register(form.value)

        if (!res.success) {
            errorMsg.value = res.message
            errors.value = res.errors
            return
        }

        succesMsg.value = 'Inscription réussie ! Veuillez vous reconnecter.'

        form.value = {
            name: '',
            email: '',
            password: ''
        }

        setTimeout(() => {
            router.push('/login')
        }, 3000)

    } catch (error) {
        errorMsg.value = 'Une erreur inattendue est survenue.'
        console.error('Register error:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
  emailInput.value?.focus()
})
</script>

<template>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <h1 class="auth-title">Bienvenue</h1>
                <p class="auth-subtitle">S'inscire sur TodoApp</p>
            </div>

            <div v-if="errorMsg " class="alert alert-error">
                {{ errorMsg }}
            </div>
            <div v-if="succesMsg " class="alert alert-succes">
                {{ succesMsg }}
            </div>

            <form @submit.prevent="handleRegister" class="auth-form">

                <div class="form-group">

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
                    <span v-else>{{ form.password ? 'S\'inscrire' : 'Inscription' }}</span>
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

.alert-succes {
  background: #114603;
  color: #fff;
  padding: 0.75rem;
  border-radius: 8px;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  text-align: center;
  border: 1px solid #082201;
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

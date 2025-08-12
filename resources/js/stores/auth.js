import { defineStore } from 'pinia'
import axios from '@/composable/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    userData: localStorage.getItem('userData') || null,
    isAuthenticated: false
  }),
  actions: {
    async register(credentials) {
        try {
            const response = await axios.post('/api/auth/register', credentials)
            return { success: true, data: response.data }
        } catch (error) {
            const message = error.response?.data?.message || 'Échec de l\'inscription'
            const errors = error.response?.data?.errors || {}
            return { success: false, message, errors }
        }
    },

    async login(credentials) {
        try {
            const response = await axios.post('/api/auth/login', credentials)

            if (response.data.token && response.data.data) {
            const { token, data: userData } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('userData', JSON.stringify(userData))

            this.token = token
            this.userData = userData
            this.isAuthenticated = true

            return { success: true, data: response.data }
            } else {
            return { success: false, message: 'Token manquant dans la réponse' }
            }
        } catch (error) {
            const message = error.response?.data?.message || 'Identifiants incorrects'
            const errors = error.response?.data?.errors || {}

            return { success: false, message, errors }
        }
    },

    async fetchUser() {
        try {
            const response = await axios.get(`/api/user`)
            this.user = response.data.data
            this.userData = (response.data.data)
            this.isAuthenticated = true
        } catch (error) {
            this.error = error.response?.data?.message || 'Failed to fetch tasks'
            throw error
        }

    },

    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      this.token = null
      this.userData = null
      this.user = null
      this.isAuthenticated = false

    },

  }
})


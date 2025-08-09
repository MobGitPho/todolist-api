import { defineStore } from 'pinia'
import axios from '@/composable/axios.js'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null
  }),
  actions: {
    async register(credentials) {
      const response = await axios.post('/api/auth/register', credentials)
      localStorage.setItem('token', response.data.token)
      this.token = response.data.token
      await this.fetchUser()

    },
    async login(credentials) {
      const response = await axios.post('/api/auth/login', credentials)
      localStorage.setItem('token', response.data.token)
      this.token = response.data.token
      await this.fetchUser()
    },
    async fetchUser() {
      const response = await axios.get('/api/user')
      this.user = response.data
    },
    logout() {
      localStorage.removeItem('token')
      this.token = null
      this.user = null
    }
  }
})

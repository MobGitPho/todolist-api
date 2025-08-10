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
      const response = await axios.post('/api/auth/register', credentials)
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userData',JSON.stringify(response.data.data))
      this.token = response.data.token
      await this.fetchUser()

    },
    async login(credentials) {
      const response = await axios.post('/api/auth/login', credentials)

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('userData', JSON.stringify(response.data.data))
      this.token = response.data.token
      this.isAuthenticated = true
      await this.fetchUser()
    },
    async fetchUser() {
      const response = await axios.get('/api/user')
      this.user = response.data.data
      this.userData = (response.data.data)
      this.isAuthenticated = true
    },
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('userData')
      this.token = null
      this.userData = null
      this.user = null
      this.isAuthenticated = false

    }
  }
})


import { defineStore } from 'pinia'
import axios from '@/composable/axios.js'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    userId: (state) => state.user?.id || null
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      try {
        const response = await axios.post('/api/login', credentials)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async register(userData) {
      this.isLoading = true
      try {
        const response = await axios.post('/api/register', userData)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUser() {
      this.isLoading = true
      try {
        const response = await axios.get('/api/user')
        this.user = response.data
      } catch (error) {
        this.clearAuth()
        throw error
      } finally {
        this.isLoading = false
      }
    },

    logout() {
      this.clearAuth()
    },

    clearAuth() {
      this.user = null
      this.token = null
      localStorage.removeItem('token')
      delete axios.defaults.headers.common['Authorization']
    },

    initialize() {
      if (this.token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.fetchUser()
      }
    }
  }
})

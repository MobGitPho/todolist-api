import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour les requêtes
axiosInstance.interceptors.request.use(config => {
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.withCredentials = true
  return config
})

// Intercepteur pour les réponses
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      const userStore = useUserStore()
      userStore.clearAuth()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosInstance

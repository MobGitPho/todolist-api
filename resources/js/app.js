import { createApp } from 'vue'
import App from '@/views/App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import axiosInstance from '@/composable/axios.js'
import { useAuthStore } from '@/stores/auth.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

app.mount('#app')

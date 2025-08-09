import { createApp } from 'vue'
import App from '@/views/App.vue'
import router from '@/router/index.js'
import { createPinia } from 'pinia'
import axiosInstance from '@/composable/axios.js'
import { useUserStore } from '@/stores/user.js'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

const userStore = useUserStore()
userStore.initialize()

app.mount('#app')

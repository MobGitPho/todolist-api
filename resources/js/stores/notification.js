import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const message = ref('')
  const type = ref('success') // success | error | info
  const visible = ref(false)

  function show(msg, msgType = 'success', timeout = 3000) {
    message.value = msg
    type.value = msgType
    visible.value = true
    setTimeout(() => {
      visible.value = false
    }, timeout)
  }

  return { message, type, visible, show }
})

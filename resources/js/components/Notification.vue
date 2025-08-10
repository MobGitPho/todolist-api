<script setup>
import { useNotificationStore } from '@/stores/notification'
const { message, type, visible } = useNotificationStore()
</script>

<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="notification"
      :class="type"
    >
      {{ message }}
    </div>
  </transition>
</template>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 20px;
  border-radius: 6px;
  color: white;
  font-weight: bold;
  z-index: 9999;
}
.success { background-color: #4caf50; }
.error { background-color: #f44336; }
.info { background-color: #2196f3; }

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

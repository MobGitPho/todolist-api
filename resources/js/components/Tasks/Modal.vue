<script setup>
import { ref } from 'vue'
import TaskForm from '@/components/Tasks/Form.vue' // ton code plus haut
import { useNotificationStore } from '@/stores/notification'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  task: {
    type: Object,
    default: null
  }
})

const notification = useNotificationStore()
const emit = defineEmits(['update:modelValue'])

const close = () => {
  emit('update:modelValue', false)

}

const handleSubmit = () => {
    if(props?.task){
        notification.show('Tâche mis à jour avec succès !', 'success')
    }else{
        notification.show('Tâche créée avec succès !', 'success')
    }
  close()


}
</script>

<template>
  <div v-if="modelValue" class="modal-overlay" @click.self="close">
    <div class="modal-content">
      <h2>{{ task ? 'Modifier la tâche' : 'Nouvelle tâche' }}</h2>

      <TaskForm
        :task="task"
        @submit="handleSubmit"
        @cancel="close"
      />
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
}

.modal-content {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}
</style>

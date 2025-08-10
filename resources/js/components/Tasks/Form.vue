<script setup>
import { ref, computed } from 'vue'
import { useTaskStore } from '@/stores/task'
import { useUserStore } from '@/stores/user'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps({
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'cancel'])

const notification = useNotificationStore()
const taskStore = useTaskStore()
const userStore = useUserStore()

const form = ref({
  title: props.task?.title || '',
  description: props.task?.description || '',
  duration: props.task?.duration || null
})

const editMode = computed(() => props.task !== null)

const handleSubmit = async () => {
  try {
    const taskData = {
      ...form.value,
      user_id: userStore.userId
    }

    if (editMode.value) {
      await taskStore.updateTask({
        id: props.task.id,
        data: taskData
      })
      notification.show('Tâche mise à jour.', 'info')
    } else {
      await taskStore.createTask(taskData)
      notification.show('Tâche créée avec succès !', 'success')
    }

    emit('submit')
    resetForm()
    init()

  } catch (error) {
    console.error("Erreur lors de l'enregistrement", error)
  }
}

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    duration: null
  }
}

const cancel = () => {
  resetForm()
  emit('cancel')
}

const init = async()=> {
     await taskStore.fetchTasks()
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="task-form">
    <div class="form-group">
      <label>Titre *</label>
      <input
        v-model="form.title"
        type="text"
        required
        placeholder="Entrez un titre"
      >
    </div>

    <div class="form-group">
      <label>Description</label>
      <textarea
        v-model="form.description"
        rows="3"
        placeholder="Ajoutez une description"
      ></textarea>
    </div>

    <div class="form-group">
      <label>Durée (minutes)</label>
      <input
        v-model.number="form.duration"
        type="number"
        min="1"
        placeholder="Durée estimée"
      >
    </div>

    <div class="form-actions">
      <button type="button" @click="cancel" class="btn secondary">
        Annuler
      </button>
      <button type="submit" class="btn primary">
        {{ editMode ? 'Mettre à jour' : 'Créer' }}
      </button>
    </div>
  </form>
</template>

<style scoped>
.task-form {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn.primary {
  background-color: #4f46e5;
  color: white;
  border: none;
}

.btn.primary:hover {
  background-color: #4338ca;
}

.btn.secondary {
  background: white;
  border: 1px solid #ddd;
}

.btn.secondary:hover {
  background: #f5f5f5;
}
</style>

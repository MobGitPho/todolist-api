<script setup>
import { ref, onMounted, computed } from 'vue'
import TaskItem from '@/components/Tasks/Item.vue'
import TaskModal from '@/components/Tasks/Modal.vue'
import { useTaskStore } from '@/stores/task'
import { useNotificationStore } from '@/stores/notification'

const notification = useNotificationStore()
const taskStore = useTaskStore()
const showForm = ref(false)
const loading = ref(true)
const showModal = ref(false)
const selectedTask = ref(null)
const selectedFilter = ref('all')


const openCreateModal = () => {
  selectedTask.value = null
  showModal.value = true
}

const openEditModal = (task) => {
  selectedTask.value = task
  showModal.value = true
}

const filteredTasks = computed(() => {
    if (selectedFilter.value === 'active') {
        return taskStore.tasks.filter(t => !t.completed && !t.archived && t.deleted_at == null)
    }
    if (selectedFilter.value === 'completed') {
        return taskStore.tasks.filter(t => t.completed && !t.archived && t.deleted_at == null)
    }
    if (selectedFilter.value === 'archived') {
        return taskStore.tasks.filter(t => t.archived && t.deleted_at == null)
    }
    if (selectedFilter.value === 'trashed') {
        return taskStore.tasks.filter(t => t.deleted_at != null)
    }

    return taskStore.tasks.filter(t => t.deleted_at == null)
})

const filterTitle = computed(() => {
    switch (selectedFilter.value) {
        case 'active':
            return 'Tâches actives'
        case 'completed':
            return 'Tâches terminées'
        case 'archived':
            return 'Tâches archivées'
        case 'trashed':
            return 'Tâches en corbeille'
        default:
            return 'Toutes les tâches'
    }
})

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } finally {
    loading.value = false
  }
})
</script>

<template>
    <div class="task-list">
        <div class="list-header">
        <h2>Mes tâches</h2>
        <select v-model="selectedFilter">
            <option value="all">Toutes</option>
            <option value="active">Actives</option>
            <option value="completed">Terminées</option>
            <option value="archived">Archivées</option>
            <option value="trashed">Corbeille</option>
        </select>
        <button @click="openCreateModal" class="add-btn">+ Nouvelle tâche</button>
        </div>

        <TaskModal
        v-model="showModal"
        :task="selectedTask"
        />

        <div v-if="loading" class="loading">
        Chargement des tâches...
        </div>

        <div v-else>
            <div v-if="filteredTasks.length > 0" class="task-section">
                <h3>{{filterTitle}}</h3>
                <TaskItem
                    v-for="task in filteredTasks"
                    :key="task?.id"
                    :task="task"
                    @edit="openEditModal"
                />
            </div>

            <div v-if="filteredTasks.length === 0" class="empty-state">
                <p>Aucune tâche à afficher</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.task-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.add-btn {
  padding: 0.75rem 1.5rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.add-btn:hover {
  background-color: #4338ca;
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.task-section {
  margin-bottom: 2rem;
}

.task-section h3 {
  color: #4f46e5;
  margin-bottom: 1rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 0.5rem;
}

.task-section.completed h3 {
  color: #10b981;
}

.task-section.archived h3 {
  color: #9ca3af;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #9ca3af;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import TaskItem from '@/components/Tasks/Item.vue'
import TaskForm from '@/components/Tasks/Form.vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const showForm = ref(false)
const loading = ref(true)

onMounted(async () => {
  try {
    await taskStore.fetchTasks()
  } finally {
    loading.value = false
  }
})

const activeTasks = computed(() =>
  taskStore.tasks.filter(t => !t.completed && !t.archived)
)

const completedTasks = computed(() =>
  taskStore.tasks.filter(t => t.completed && !t.archived)
)

const archivedTasks = computed(() =>
  taskStore.tasks.filter(t => t.archived)
)
</script>

<template>
  <div class="task-list">
    <div class="list-header">
      <h2>Mes tâches</h2>
      <button
        @click="showForm = true"
        class="add-btn"
      >
        + Nouvelle tâche
      </button>
    </div>

    <TaskForm
      v-if="showForm"
      @submit="showForm = false"
      @cancel="showForm = false"
    />

    <div v-if="loading" class="loading">
      Chargement des tâches...
    </div>

    <div v-else>
      <div v-if="activeTasks.length > 0" class="task-section">
        <h3>Tâches actives</h3>
        <TaskItem
          v-for="task in activeTasks"
          :key="task.id"
          :task="task"
        />
      </div>

      <div v-if="completedTasks.length > 0" class="task-section completed">
        <h3>Tâches terminées</h3>
        <TaskItem
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
        />
      </div>

      <div v-if="archivedTasks.length > 0" class="task-section archived">
        <h3>Tâches archivées</h3>
        <TaskItem
          v-for="task in archivedTasks"
          :key="task.id"
          :task="task"
        />
      </div>

      <div v-if="taskStore.tasks.length === 0" class="empty-state">
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

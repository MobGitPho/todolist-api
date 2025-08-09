<script setup>
import { useTaskStore } from '@/stores/task'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const taskStore = useTaskStore()

const toggleCompletion = async () => {
  if (props.task?.completed) {
    await taskStore.updateTask({
      id: props.task?.id,
      data: { completed: false, completed_at: null }
    })
  } else {
    await taskStore.updateTask({
      id: props.task?.id,
      data: { completed: true, completed_at: new Date() }
    })
  }
}

const archiveTask = async () => {
  await taskStore.updateTask({
    id: props.task?.id,
    data: { archived: true }
  })
}
</script>

<template>
  <div class="task-item" :class="{ completed: task?.completed, archived: task?.archived }">
    <div class="task-content">
      <div class="task-header">
        <h4>{{ task?.title }}</h4>
        <span class="duration" v-if="task?.duration">
          {{ task?.duration }} min
        </span>
      </div>

      <p v-if="task?.description" class="description">
        {{ task?.description }}
      </p>

      <div class="task-meta">
        <span v-if="task?.completed_at" class="completed-at">
          Terminé le {{ new Date(task?.completed_at).toLocaleDateString() }}
        </span>
      </div>
    </div>

    <div class="task-actions">
      <button
        @click="toggleCompletion"
        :class="['status-btn', task?.completed ? 'completed' : 'incomplete']"
      >
        {{ task?.completed ? '✓' : '○' }}
      </button>

      <button
        @click="archiveTask"
        class="archive-btn"
        v-if="!task?.archived"
      >
        Archiver
      </button>
    </div>
  </div>
</template>

<style scoped>
.task-item {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  margin-bottom: 1rem;
  background: white;
}

.task-item.completed {
  opacity: 0.7;
  background-color: #f0fdf4;
}

.task-item.archived {
  opacity: 0.5;
  background-color: #f5f5f5;
}

.task-content {
  flex: 1;
}

.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.task-header h4 {
  margin: 0;
  font-size: 1.1rem;
}

.duration {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.description {
  color: #666;
  margin-bottom: 0.5rem;
}

.task-meta {
  font-size: 0.8rem;
  color: #888;
}

.task-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.status-btn {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 2px solid #4f46e5;
  background: transparent;
  font-weight: bold;
}

.status-btn.completed {
  background: #4f46e5;
  color: white;
}

.archive-btn {
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  cursor: pointer;
}

.archive-btn:hover {
  background: #f5f5f5;
}
</style>

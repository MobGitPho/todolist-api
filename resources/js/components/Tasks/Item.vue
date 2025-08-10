<script setup>
import { useTaskStore } from '@/stores/task'
import { useNotificationStore } from '@/stores/notification'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const notification = useNotificationStore()

const emit = defineEmits(['edit'])

const taskStore = useTaskStore()

const toggleCompletion = async () => {
    try {
        // On inverse l'état actuel
        const newStatus = !props.task.completed;

        const response = await taskStore.completeTask(props.task, newStatus);

        // Le store met déjà à jour `tasks`, mais si tu veux mettre à jour `props.task` ici :
        // (selon ton système de réactivité)

        notification.show(
            newStatus
                ? 'Tâche complétée avec succès !'
                : 'Tâche marquée comme incomplète.',
            'success'
        );
    } catch (error) {
        notification.show('Erreur lors de la mise à jour de la tâche.', 'error');
    }
};

const archiveTask = async () => {
  try {
    await taskStore.archiveTask(props.task);
    notification.show('Tâche archivée avec succès !', 'success');
  } catch (error) {
    notification.show('Erreur lors de l\'archivage de la tâche.', 'error');
  }
}

const showTask = () => {
  emit('edit', props.task)
}

const deleteTask = async (task)=>{
   if (confirm(`Supprimer la tâche "${task?.title}" ?`)) {
    await taskStore.deleteTask(task?.id)
    notification.show('Tâche supprimée.', 'error')
  }
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

      <!-- <p v-if="task?.description" class="description">
        {{ task?.description }}
      </p> -->

      <div class="task-meta">
        <span v-if="task?.completed_at" class="completed-at">
          Terminé le {{ new Date(task?.completed_at).toLocaleDateString() }}
        </span>
      </div>
    </div>

    <div class="task-actions">
      <!-- <button
        @click.prevent="toggleCompletion"
        :class="['status-btn', task?.completed ? 'completed' : 'incomplete']"
      >
        {{ task?.completed ? '✓' : '○' }}
      </button> -->
      <button
            @click.prevent="toggleCompletion"
            :class="['status-btn', task?.completed ? 'completed' : 'incomplete']"
            :title="task?.completed ? 'Marquer comme incomplète' : 'Marquer comme complétée'"
        >
            {{ task?.completed ? '✓' : '○' }}
        </button>
      <button
        @click.prevent="archiveTask"
        class="archive-btn"
        v-if="!task?.archived"
      >
        Archiver
      </button>

      <button
        @click.prevent="showTask"
        class="voir-btn"
      >
        Voir
      </button>

      <button
        @click.prevent="deleteTask(props.task)"
        class="del-btn"
      >
       X
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

.voir-btn {
  padding: 0.5rem 1rem;
  background: #4f46e5;
  border: 1px solid #e5e7eb;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.del-btn {
  padding: 0.5rem 1rem;
  background: red;
  border: 1px solid #e5e7eb;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

.archive-btn:hover {
  background: #f5f5f5;
}
</style>

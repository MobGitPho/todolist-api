import { defineStore } from 'pinia'
import axios from '@/composable/axios.js'

export const useTaskStore = defineStore('task', {

  state: () => ({
    tasks: [],
    loading: false,
    error: null
  }),

  getters: {
    activeTasks: (state) => state.tasks.filter(t => !t.completed && !t.archived),
    completedTasks: (state) => state.tasks.filter(t => t.completed && !t.archived),
    archivedTasks: (state) => state.tasks.filter(t => t.archived)
  },

  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await axios.get('/api/tasks')
        console.log('TT', response)
        this.tasks = response.data.reverse() || []
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch tasks'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createTask(taskData) {
      this.loading = true
      try {
        const response = await axios.post('/api/tasks', taskData)
        this.tasks.push(response.data)
        return response.data
         notification.show(' la tâche est créée avec succes', 'succes');
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask({ id, data }) {
      this.loading = true
      try {
        const response = await axios.put(`/api/tasks/${id}`, data)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = response.data.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },

     async showTask(task) {
        console.log('SST', task)
      this.loading = true
      try {
        const response = await axios.get(`/api/tasks/${task}`)

        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tasks[index] = response.data.data
        }
        return response.data
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async completeTask(task, completed = true) {
        this.loading = true;
        try {
            const response = await axios.put(`/api/tasks/${task.id}/complete`, { completed });
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
                this.tasks[index] = response.data;
            }
            return response.data;
        } catch (error) {
            this.error = error.response?.data?.message || 'Failed to complete task';
            throw error;
        } finally {
            this.loading = false;
        }
    },

    async archiveTask(task) {
        this.loading = true
        try {
            const response = await axios.put(`/api/tasks/${task?.id}/archive`, { archived: true });
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
            this.tasks[index] = response.data; // Mettez à jour la tâche dans le store
            }
            return response.data;
        } catch (error) {
            this.error = error.response?.data?.message || 'Failed to archive task';
            throw error;
        } finally {
            this.loading = false;
        }
    },

    async deleteTask(taskId) {
      this.loading = true
      try {
        await axios.delete(`/api/tasks/${taskId}`)
        this.tasks = this.tasks.filter(t => t.id !== taskId)
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete task'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})

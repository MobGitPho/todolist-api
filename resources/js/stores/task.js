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
        this.tasks = response.data.data || []
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
        this.tasks.push(response.data.data)
        return response.data
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

    async toggleTaskCompletion(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (!task) return

      const newStatus = !task.completed
      return this.updateTask({
        id: taskId,
        data: {
          completed: newStatus,
          completed_at: newStatus ? new Date().toISOString() : null
        }
      })
    },

    async archiveTask(taskId) {
      return this.updateTask({
        id: taskId,
        data: { archived: true }
      })
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

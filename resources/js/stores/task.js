import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    activeTasks: [],
    completedTasks: [],
    archivedTasks: []
  }),
  actions: {
    async fetchTasks() {
      const response = await axios.get('/api/tasks')
      this.tasks = response.data.data

      this.activeTasks = this.tasks.filter(task => !task.completed)
      this.completedTasks = this.tasks.filter(task => task.completed)
    },
    async createTask(taskData) {
      await axios.post('/api/tasks', taskData)
      await this.fetchTasks()
    },
    async updateTask({ id, updatedData }) {
      await axios.put(`/api/tasks/${id}`, updatedData)
      await this.fetchTasks()
    },
    async toggleComplete(taskId) {
      await axios.post(`/api/tasks/${taskId}/complete`)
      await this.fetchTasks()
    },
    async archiveTask(taskId) {
      await axios.post(`/api/tasks/${taskId}/archive`)
      await this.fetchTasks()
    }
  }
})

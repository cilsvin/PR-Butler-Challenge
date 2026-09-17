import { Task, TaskFilter } from './types'
import { t } from './i18n'

export class TaskManager {
  private tasks: Task[] = []
  private filter: TaskFilter = 'all'
  private nextId = 1

  constructor() {
    this.loadFromStorage()
  }

  /** Adds a task, persists it, and refreshes the task list. */
  addTask(text: string, priority: 'low' | 'medium' | 'high') {
    const task: Task = {
      id: this.nextId++,
      text,
      priority,
      completed: false,
      createdAt: new Date()
    }
    this.tasks.push(task)
    this.saveToStorage()
    this.render()
  }

  /** Toggles a task's completed state when the task exists. */
  toggleTask(id: number) {
    const task = this.tasks.find(taskItem => taskItem.id === id)
    if (task) {
      task.completed = !task.completed
      this.saveToStorage()
      this.render()
    }
  }

  /** Deletes a task by id, then persists and renders the remaining tasks. */
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(t => t.id !== id)
    this.saveToStorage()
    this.render()
  }

  /** Sets the active task filter and refreshes the rendered list. */
  setFilter(filter: TaskFilter) {
    this.filter = filter
    this.render()
  }

  /** Renders the filtered tasks and updates the task counters. */
  render() {
    const taskList = document.getElementById('tasks')
    if (!taskList) return

    taskList.innerHTML = ''
    this.getFilteredTasks().forEach(task => taskList.appendChild(this.createTaskElement(task)))

    this.updateStats()
  }

  /** Returns the tasks matching the currently selected filter. */
  private getFilteredTasks() {
    if (this.filter === 'active') {
      return this.tasks.filter(task => !task.completed)
    }

    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed)
    }

    return this.tasks
  }

  private createTaskElement(task: Task) {
    const listItem = document.createElement('li')
    listItem.className = `task-item ${task.completed ? 'completed' : ''}`

    const content = document.createElement('div')
    content.className = 'task-content'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'task-checkbox'
    checkbox.checked = task.completed
    checkbox.addEventListener('change', () => this.toggleTask(task.id))

    const text = document.createElement('span')
    text.className = 'task-text'
    text.textContent = task.text

    const badge = document.createElement('span')
    badge.className = `priority-badge priority-${task.priority}`
    badge.textContent = t(`priority.${task.priority}`)

    content.append(checkbox, text, badge)

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-btn'
    deleteButton.textContent = t('button.delete')
    deleteButton.addEventListener('click', () => this.deleteTask(task.id))

    listItem.append(content, deleteButton)
    return listItem
  }

  private updateStats() {
    const totalCount = document.getElementById('total-count')
    const completedCount = document.getElementById('completed-count')
    
    if (totalCount) totalCount.textContent = String(this.tasks.length)
    if (completedCount) {
      completedCount.textContent = String(this.tasks.filter(t => t.completed).length)
    }
  }

  private saveToStorage() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks))
  }

  private loadFromStorage() {
    const stored = localStorage.getItem('tasks')
    if (stored) {
      try {
        this.tasks = JSON.parse(stored)
      } catch {
        this.tasks = []
      }
      this.nextId = Math.max(...this.tasks.map(t => t.id), 0) + 1
    }
  }

  /** Returns all tasks currently held by the manager. */
  getTasks() {
    return this.tasks
  }

  /** Returns the number of completed tasks. */
  getCompletedCount() {
    return this.tasks.filter(t => t.completed).length
  }
}

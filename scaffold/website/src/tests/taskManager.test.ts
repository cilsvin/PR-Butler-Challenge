import { describe, it, expect, beforeEach } from 'vitest'
import { TaskManager } from '../taskManager'

describe('TaskManager', () => {
  let manager: TaskManager

  beforeEach(() => {
    localStorage.clear()
    document.body.innerHTML = `
      <ul id="tasks"></ul>
      <span id="total-count"></span>
      <span id="completed-count"></span>
    `
    manager = new TaskManager()
  })

  it('should add a task', () => {
    manager.addTask('Test task', 'low')
    expect(manager.getTasks()).toHaveLength(1)
  })

  it('should get completed count', () => {
    manager.addTask('Task 1', 'low')
    expect(manager.getCompletedCount()).toBe(0)
  })

  it('should toggle a task and ignore an unknown id', () => {
    manager.addTask('Test task', 'low')

    manager.toggleTask(1)
    manager.toggleTask(999)

    expect(manager.getTasks()[0].completed).toBe(true)
    expect(manager.getCompletedCount()).toBe(1)
  })

  it('should delete a task', () => {
    manager.addTask('First task', 'low')
    manager.addTask('Second task', 'high')

    manager.deleteTask(1)

    expect(manager.getTasks().map(task => task.text)).toEqual(['Second task'])
  })

  it('should filter active and completed tasks', () => {
    manager.addTask('Active task', 'low')
    manager.addTask('Completed task', 'medium')
    manager.toggleTask(2)

    manager.setFilter('active')
    expect(document.querySelectorAll('#tasks .task-item')).toHaveLength(1)
    expect(document.querySelector('.task-text')?.textContent).toBe('Active task')

    manager.setFilter('completed')
    expect(document.querySelectorAll('#tasks .task-item')).toHaveLength(1)
    expect(document.querySelector('.task-text')?.textContent).toBe('Completed task')
  })

  it('should render task details and update stats', () => {
    manager.addTask('<script>alert(1)</script>', 'high')

    const task = document.querySelector('.task-item')
    expect(task?.querySelector('.priority-high')).not.toBeNull()
    expect(document.querySelector('.task-text')?.textContent).toBe('<script>alert(1)</script>')
    expect(document.getElementById('total-count')?.textContent).toBe('1')
    expect(document.getElementById('completed-count')?.textContent).toBe('0')
  })

  it('should load tasks from storage and persist changes', () => {
    localStorage.setItem(
      'tasks',
      JSON.stringify([
        {
          id: 4,
          text: 'Stored task',
          priority: 'medium',
          completed: false,
          createdAt: '2026-01-01T00:00:00.000Z'
        }
      ])
    )

    const storedManager = new TaskManager()
    storedManager.addTask('New task', 'low')

    expect(storedManager.getTasks().map(task => task.id)).toEqual([4, 5])
    expect(JSON.parse(localStorage.getItem('tasks') ?? '[]')).toHaveLength(2)
  })

  it('should recover from malformed storage data', () => {
    localStorage.setItem('tasks', '{invalid json')

    expect(new TaskManager().getTasks()).toEqual([])
  })
})

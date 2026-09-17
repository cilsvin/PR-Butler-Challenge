import { beforeEach, describe, expect, it } from 'vitest'
import { handleSubmit, init, setupEventListeners, switchLanguage } from '../main'

function setupDocument() {
  document.body.innerHTML = `
    <form id="task-form">
      <input id="task-input" data-i18n-placeholder="task.placeholder" />
      <select id="priority-select"><option value="high" data-i18n="priority.high">High</option></select>
    </form>
    <h1 data-i18n="app.title"></h1>
    <button data-i18n="button.add"></button>
    <button id="lang-en" class="language-selector active"></button>
    <button id="lang-fr" class="language-selector"></button>
    <button class="filter-btn active" data-filter="all"></button>
    <button class="filter-btn" data-filter="active"></button>
    <ul id="tasks"></ul>
    <span id="total-count"></span>
    <span id="completed-count"></span>
  `
}

describe('main UI handlers', () => {
  beforeEach(() => {
    localStorage.clear()
    setupDocument()
  })

  it('initializes controls, submits tasks, and switches language', async () => {
    await init()
    const input = document.getElementById('task-input') as HTMLInputElement
    const form = document.getElementById('task-form') as HTMLFormElement

    input.value = 'New task'
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    expect(document.querySelectorAll('#tasks .task-item')).toHaveLength(1)

    document.querySelector<HTMLElement>('[data-filter="active"]')?.click()
    const activeFilter = document.querySelector<HTMLElement>('.filter-btn.active')
    expect(activeFilter?.dataset.filter).toBe('active')

    switchLanguage('fr')
    expect(document.getElementById('lang-fr')?.classList.contains('active')).toBe(true)
    expect(document.querySelector('[data-i18n="app.title"]')?.textContent).toBe('Mon Gestionnaire de Tâches')
    expect(document.getElementById('task-input')?.getAttribute('placeholder')).toBe('Saisissez la description de la tâche')
    expect(document.querySelector('[data-i18n="button.add"]')?.textContent).toBe('Ajouter la tâche')
  })

  it('ignores blank submissions', () => {
    const input = document.getElementById('task-input') as HTMLInputElement
    input.value = '   '

    handleSubmit(new Event('submit'))

    expect(localStorage.getItem('tasks')).toBeNull()
  })

  it('registers controls through setupEventListeners', () => {
    setupEventListeners()

    const input = document.getElementById('task-input') as HTMLInputElement
    input.value = 'Registered task'
    document.getElementById('task-form')?.dispatchEvent(new Event('submit'))

    expect(localStorage.getItem('tasks')).toContain('Registered task')
  })
})
import { TaskManager } from './taskManager'
import { loadTranslations, setLanguage, t } from './i18n'
import { TaskFilter } from './types'
import './styles.css'

let taskManager: TaskManager

/** Loads translations, creates the task manager, and initializes the UI. */
export async function init() {
  await loadTranslations()
  taskManager = new TaskManager()
  setupEventListeners()
  applyTranslations()
  taskManager.render()
}

function applyTranslations() {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach(element => {
    const key = element.dataset.i18n
    if (key) element.textContent = t(key)
  })

  document.querySelectorAll<HTMLInputElement>('[data-i18n-placeholder]').forEach(element => {
    const key = element.dataset.i18nPlaceholder
    if (key) element.placeholder = t(key)
  })
}

/** Registers form, language, and filter control event handlers. */
export function setupEventListeners() {
  const form = document.getElementById('task-form') as HTMLFormElement
  const langEnBtn = document.getElementById('lang-en')
  const langFrBtn = document.getElementById('lang-fr')
  form?.addEventListener('submit', handleSubmit)
  langEnBtn?.addEventListener('click', () => switchLanguage('en'))
  langFrBtn?.addEventListener('click', () => switchLanguage('fr'))
  const filterBtns = document.querySelectorAll('.filter-btn')
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = e.target as HTMLElement
      const filter = target.dataset.filter
      if (filter) {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        target.classList.add('active')
        taskManager.setFilter(filter as TaskFilter)
      }
    })
  })
}

/** Validates the form and adds the submitted task. */
export function handleSubmit(event: Event) {
  event.preventDefault()

  const input = document.getElementById('task-input') as HTMLInputElement
  const select = document.getElementById('priority-select') as HTMLSelectElement

  if (input.value.trim()) {
    taskManager.addTask(input.value.trim(), select.value as 'low' | 'medium' | 'high')
    input.value = ''
  }
}

/** Updates the active language control and selected language. */
export function switchLanguage(lang: string) {
  setLanguage(lang)
  applyTranslations()

  document.querySelectorAll('.language-selector button').forEach(btn => {
    btn.classList.remove('active')
  })
  
  const activeBtn = document.getElementById(`lang-${lang}`)
  activeBtn?.classList.add('active')
  taskManager?.render()
}

init()

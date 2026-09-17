import { describe, expect, it } from 'vitest'
import { getCurrentLanguage, setLanguage, t } from '../i18n'

describe('i18n', () => {
  it('returns English translations by default', () => {
    setLanguage('en')

    expect(getCurrentLanguage()).toBe('en')
    expect(t('app.title')).toBe('My Task Manager')
  })

  it('returns French translations after changing language', () => {
    setLanguage('fr')

    expect(getCurrentLanguage()).toBe('fr')
    expect(t('button.add')).toBe('Ajouter la tâche')
  })

  it('returns the key when a translation is missing', () => {
    expect(t('missing.key')).toBe('missing.key')
  })
})
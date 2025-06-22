import Schema from './components/schema.js'

export abstract class Widget {
  protected abstract bootSchema: ReturnType<typeof Schema.make>
  constructor(protected i18n?: any) {}
  t(key: string, data?: Record<string, any>, fallbackMessage?: string): string {
    return this.i18n ? this.i18n.t(key, data, fallbackMessage) : fallbackMessage || key
  }
  setI18n(i18n: any) {
    this.i18n = i18n
    return this
  }
  getSchema() {
    return this.bootSchema
  }
  getLocale() {
    return this.i18n?.locale || 'en'
  }
  toJSON(): any {
    return this.bootSchema.toJSON()
  }
}

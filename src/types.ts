import Schema from './components/schema.js'

export abstract class Widget {
  abstract make(): void
  protected bootSchema: Schema<any> | any = Schema.make()
  constructor(protected i18n?: any) {
    this.make()
  }
  t(key: string, data?: Record<string, any>, fallbackMessage?: string): string {
    return this.i18n ? this.i18n.t(key, data, fallbackMessage) : fallbackMessage || key
  }
  getSchema(): Schema<any> {
    return this.bootSchema
  }
  getLocale() {
    return this.i18n?.locale || 'en'
  }
  toJSON(): any {
    return this.bootSchema.toJSON()
  }
}

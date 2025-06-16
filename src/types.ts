import Schema from './components/schema.js'
import { I18n } from '@adonisjs/i18n'

export abstract class Widget {
  abstract make(): void
  protected bootSchema: Schema<any> | any = Schema.make()
  constructor(protected i18n?: I18n) {
    this.make()
  }
  t(key: string, data?: Record<string, any>, fallbackMessage?: string): string {
    if (this.i18n) {
      return this.i18n.t(key, data, fallbackMessage)
    } else {
      return fallbackMessage ?? key.split('.').pop() ?? key
    }
  }
  getSchema(): Schema<any> {
    return this.bootSchema
  }
  toJSON(): any {
    return this.bootSchema.toJSON()
  }
}

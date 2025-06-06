import Event from '../components/event.js'
import Form from '../components/form.js'
import Select from '../components/select.js'
import Button from '../components/button.js'
import Dialog from '../components/dialog.js'
import InputSwitch from '../components/input_switch.js'

export default class Setting {
  public schema = Button.make().id('setting')

  constructor(
    opt: {
      title?: string
      supportedLocales?: string[]
      themes?: string[]
      localeLabel?: string
      themeLabel?: string
      darknessLabel?: string
      darknessDescription?: string
    } = { title: 'Setting' }
  ) {
    this.schema.actionType('dialog').attr(
      'dialog',
      Dialog.make()
        .id('setting-dialog')
        .title(opt.title ?? 'Setting')
        .body(
          Form.make()
            .id('setting-form')
            .onEvent('submit', [
              Event.make().actionType('custom').action('script', 'settings(event.data)'),
            ])
            .body([
              Select.make()
                .id('setting-locale')
                .name('locale')
                .value('${settings.locale}')
                .label(opt.localeLabel ?? 'Locale')
                .options(opt.supportedLocales ?? ['en', 'zh']),
              Select.make()
                .id('setting-theme')
                .name('theme')
                .value('${settings.theme}')
                .label(opt.themeLabel ?? 'Theme')
                .options(opt.themes ?? ['cxd', 'antd', 'ang', 'dark']),
              InputSwitch.make()
                .id('setting-darkness')
                .name('darkness')
                .value('${settings.darkness}')
                .label('Darkness')
                .description(
                  opt.darknessDescription ?? 'Automatically switch to dark mode at night'
                ),
            ])
        )
    )
    return this
  }

  size(size: string) {
    this.schema.size(size)
    return this
  }

  icon(icon: string) {
    this.schema.icon(icon)
    return this
  }

  label(label: string) {
    this.schema.label(label)
    return this
  }

  level(level: string) {
    this.schema.level(level)
    return this
  }

  toJSON() {
    return this.schema.toJSON()
  }
}

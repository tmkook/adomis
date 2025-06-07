import Event from '../components/event.js'
import Form from '../components/form.js'
import Select from '../components/select.js'
import InputSwitch from '../components/input_switch.js'

export default class Setting {
  public schema = Form.make().id('setting')

  constructor(opt: {
    localeLabel?: string
    themeLabel?: string
    darknessLabel?: string
    darknessDescription?: string
  }) {
    this.schema
      .body([
        Select.make()
          .id('setting-locale')
          .name('locale')
          .value('${settings.locale}')
          .label(opt.localeLabel ?? 'Locale')
          .options(['en', 'zh']),
        Select.make()
          .id('setting-theme')
          .name('theme')
          .value('${settings.theme}')
          .label(opt.themeLabel ?? 'Theme')
          .options(['cxd', 'antd', 'ang', 'dark']),
        InputSwitch.make()
          .id('setting-darkness')
          .name('darkness')
          .value('${settings.darkness}')
          .label(opt.darknessLabel ?? 'Darkness')
          .description(opt.darknessDescription ?? 'Automatically switch to dark mode at night'),
      ])
      .onEvent('submit', [
        Event.make().actionType('custom').action('script', 'Adova.settings(event.data)'),
      ])
    return this
  }

  supportedLocales(supportedLocales: object) {
    this.schema.find('setting-locale')?.options(supportedLocales)
    return this
  }

  themes(themes: object) {
    this.schema.find('setting-theme')?.options(themes)
    return this
  }

  toJSON() {
    return this.schema.toJSON()
  }
}

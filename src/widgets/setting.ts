import { Widget } from '../types.js'
import Event from '../components/event.js'
import Form from '../components/form.js'
import Select from '../components/select.js'
import InputSwitch from '../components/input_switch.js'

export default class SettingWidget extends Widget {
  make(): void {
    this.bootSchema = Form.make()
      .body([
        Select.make()
          .id('setting-locale')
          .name('locale')
          .value('${settings.locale}')
          .label(this.t('widget.locale', undefined, 'Locale'))
          .options(['en', 'zh']),
        Select.make()
          .id('setting-theme')
          .name('theme')
          .value('${settings.theme}')
          .label(this.t('widget.theme', undefined, 'Theme'))
          .options(['cxd', 'ang', 'antd', 'dark']),
        InputSwitch.make()
          .id('setting-darkness')
          .name('darkness')
          .value('${settings.darkness}')
          .label(this.t('widget.darkness'))
          .description(
            this.t('widget.darknessDescription', undefined, 'Darkness mode at (18pm-08am)')
          ),
      ])
      .onEvent('submit', [
        Event.make().actionType('custom').action('script', 'Adomis.settings(event.data)'),
      ])
  }

  setSupportedLocales(supportedLocales: string[]) {
    this.bootSchema.find('setting-locale')?.options(supportedLocales)
    return this
  }

  setSupportedThemes(themes: string[]) {
    this.bootSchema.find('setting-theme')?.options(themes)
    return this
  }

  disableDarkness() {
    this.bootSchema.find('setting-darkness')?.remove()
    return this
  }

  disableLocale() {
    this.bootSchema.find('setting-locale')?.remove()
    return this
  }

  disableTheme() {
    this.bootSchema.find('setting-theme')?.remove()
    return this
  }
}

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
          .label(this.t('amis.locale'))
          .options(['en', 'zh']),
        Select.make()
          .id('setting-theme')
          .name('theme')
          .value('${settings.theme}')
          .label(this.t('amis.theme'))
          .options(['cxd', 'ang', 'antd', 'dark']),
        InputSwitch.make()
          .id('setting-darkness')
          .name('darkness')
          .value('${settings.darkness}')
          .label(this.t('amis.darkness'))
          .description(
            this.t(
              'amis.darknessDescription',
              undefined,
              'Automatically switch to dark mode at night'
            )
          ),
      ])
      .onEvent('submit', [
        Event.make().actionType('custom').action('script', 'Adova.settings(event.data)'),
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
  }

  disableLocale() {
    this.bootSchema.find('setting-locale')?.remove()
  }

  disableTheme() {
    this.bootSchema.find('setting-theme')?.remove()
  }
}

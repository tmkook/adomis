import { Widget } from '../types.js'
import Event from '../components/event.js'
import Page from '../components/page.js'
import Container from '../components/container.js'
import Hbox from '../components/hbox.js'
import Flex from '../components/flex.js'
import Form from '../components/form.js'
import Image from '../components/image.js'
import InputText from '../components/input_text.js'
import InputPassword from '../components/input_password.js'
import Checkbox from '../components/checkbox.js'
import Button from '../components/button.js'
import Dialog from '../components/dialog.js'
import SettingWidget from './setting.js'
let setting: SettingWidget
let loginSetting: Record<string, string> = {
  'top': '50%',
  'right': '-3px',
  'position': 'absolute',
  'border-radius': '6px !important',
  'padding': '1.5rem 0.5rem !important',
}

export default class LoginWidget extends Widget {
  make(): void {
    setting = new SettingWidget(this.i18n)
    this.bootSchema = Page.make()
      .css({
        '.login-setting': loginSetting,
      })
      .cssVars({
        '--borderWidth': '0',
        '--Page-main-bg': 'none',
        '--Form-item-mobile-gap': '1rem',
        '--Panel-borderRadius': '10pt',
        '--Panel-heading-bottom-border-style': 'none',
        '--Panel-footer-top-border-style': 'none',
        '--Panel-marginBottom': 'none',
        '--Panel-headingPadding': '2rem',
        '--Panel-bodyPadding': '0 2rem 2rem 2rem',
        '--Panel-footerPadding': '2rem',
        '--Panel-heading-bg-color': 'none',
      })
      .body([
        Hbox.make()
          .id('login-hbox')
          .valign('middle')
          .align('center')
          .style({ height: '100%' })
          .columns([
            Form.make()
              .id('login-form')
              .panelClassName('login-form')
              .title(' ')
              .submitText('')
              .style({ maxWidth: '360pt' })
              .title([
                Flex.make()
                  .justify('center')
                  .items([
                    Image.make()
                      .id('login-logo')
                      .src('https://github.com/tmkook/adomis/blob/main/docs/img/logo.png?raw=true')
                      .imageMode('original')
                      .innerClassName('no-border')
                      .width(50)
                      .height(50)
                      .placeholder('LOGO'),
                  ]),
                Container.make()
                  .id('login-title')
                  .className('text-center text-xl font-bold mt-2')
                  .body(this.t('widget.welcome', undefined, 'Welcome Back')),
              ])
              .body([
                InputText.make()
                  .id('login-username')
                  .name('username')
                  .label(false)
                  .placeholder(this.t('widget.username', undefined, 'Username'))
                  .required(true)
                  .validations({ minLength: 5, maxLength: 32 })
                  .addOn({ type: 'text', position: 'left', icon: 'fa fa-user' }),
                InputPassword.make()
                  .id('login-password')
                  .name('password')
                  .label(false)
                  .placeholder(this.t('widget.password', undefined, 'Password'))
                  .required(true)
                  .validations({ minLength: 5, maxLength: 32 })
                  .addOn({ type: 'text', position: 'left', icon: 'fa fa-lock' }),
                Flex.make()
                  .id('login-captcha')
                  .justify('space-between')
                  .alignItems('start')
                  .permission(false)
                  .items([
                    InputText.make()
                      .id('login-captcha-input')
                      .name('captcha')
                      .label(false)
                      .required(true)
                      .placeholder(this.t('widget.captcha', undefined, 'Captcha'))
                      .className('w-3/4')
                      .addOn({ type: 'text', position: 'left', icon: 'fa fa-pen' }),
                    Image.make()
                      .id('login-captcha-image')
                      .imageMode('original')
                      .className('login-captcha')
                      .width(100)
                      .height(32)
                      .onEvent('click', [
                        Event.make()
                          .actionType('custom')
                          .action(
                            'script',
                            'document.querySelector(".login-captcha img").src = document.querySelector(".login-captcha img").src'
                          ),
                      ]),
                  ]),
                Checkbox.make()
                  .name('remember')
                  .trueValue(true)
                  .option(this.t('widget.remember', undefined, 'Remember me')),
                Button.make()
                  .label(this.t('widget.login', undefined, 'Login'))
                  .actionType('submit')
                  .level('primary')
                  .rightIcon('fa fa-arrow-right')
                  .style({ width: '100%', margin: '0 0 1rem 0' }),
                Flex.make()
                  .id('login-footer')
                  .justify('center')
                  .alignItems('center')
                  .items([
                    Container.make()
                      .id('login-copyright')
                      .body(this.t('widget.copyright', undefined, 'Powerd by Adova')),
                  ]),
              ]),
          ]),
        Button.make()
          .id('login-setting')
          .className('login-setting')
          .icon('fa fa-cog')
          .onEvent('click', [
            Event.make()
              .actionType('dialog')
              .action(
                'dialog',
                Dialog.make()
                  .title(this.t('widget.setting', undefined, 'Setting'))
                  .body(setting)
              ),
          ]),
      ])
  }

  setApi(api: string | object) {
    this.bootSchema.find('login-form').api(api)
    return this
  }

  setCaptch(url: string) {
    this.bootSchema.find('login-captcha').permission(true)
    this.bootSchema.find('login-captcha-image').src(url)
    return this
  }

  disableFooter() {
    this.bootSchema.find('login-footer').remove()
    return this
  }

  disableCopyright() {
    this.bootSchema.find('login-copyright').remove()
    return this
  }

  disableSetting() {
    this.bootSchema.find('login-setting').remove()
    return this
  }

  setSideImage(image: string, align: 'left' | 'right' = 'right') {
    let bg = Container.make().id('login-side').className('login-side')
    let hbox = this.bootSchema.find('login-hbox')
    if (align === 'left') {
      delete loginSetting.right
      loginSetting.left = '-3px'
      hbox.attr('columns', bg, 'unshift')
    } else {
      delete loginSetting.left
      loginSetting.right = '-3px'
      hbox.attr('columns', bg, 'push')
    }
    this.bootSchema.attr(
      'cssVars',
      {
        '--Panel-shadow': 'none',
        '--Page-body-padding': '0',
        '--Panel-bg-color': 'none',
        '--Panel-top-border-style': 'none',
        '--Panel-bottom-border-style': 'none',
        '--Panel-left-border-style': 'none',
        '--Panel-right-border-style': 'none',
      },
      'merge'
    )
    this.bootSchema.attr(
      'css',
      {
        '.login-side': {
          'height': '100%',
          'background-image': `url(${image}) !important`,
          'background-size': 'cover !important',
          'background-position': 'center !important',
          'background-repeat': 'no-repeat !important',
        },
        '.login-form': {
          margin: '0 20pt !important',
        },
      },
      'merge'
    )
    return this
  }

  getSettingWidget(): SettingWidget {
    return setting
  }
}

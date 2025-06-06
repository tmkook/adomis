import Api from '../components/api.js'
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

export default class Login {
  public schema = Page.make()

  constructor(
    opt: {
      api?: Api | string
      logo?: string
      title?: string
      captcha?: string
      usernameLabel?: string
      passwordLabel?: string
      captchaLabel?: string
      submitLabel?: string
      rememberLabel?: string
    } = { rememberLabel: 'Remember me', title: 'Welcome Back' }
  ) {
    this.schema
      .css({})
      .cssVars({
        '--body-bg': '#f2f2f2',
        '--borderWidth': '0',
        '--Page-main-bg': '#f2f2f2',
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
              .api(opt.api ?? '/login')
              .style({ maxWidth: '360pt' })
              .title([
                Flex.make()
                  .justify('center')
                  .permission(!!opt.logo)
                  .items([
                    Image.make()
                      .id('login-logo')
                      .src(opt.logo ?? '')
                      .imageMode('original')
                      .innerClassName('no-border')
                      .width(50)
                      .height(50)
                      .placeholder('LOGO'),
                  ]),
                Container.make()
                  .id('login-title')
                  .permission(!!opt.title)
                  .className('text-center text-xl font-bold mt-2')
                  .body(opt.title ?? 'Welcome Back'),
              ])
              .body([
                InputText.make()
                  .id('login-username')
                  .name('username')
                  .label(false)
                  .placeholder(opt.usernameLabel ?? 'Username')
                  .required(true)
                  .validations({ minLength: 5, maxLength: 32 })
                  .addOn({ type: 'text', position: 'left', icon: 'fa fa-user' }),
                InputPassword.make()
                  .id('login-password')
                  .name('password')
                  .label(false)
                  .placeholder(opt.passwordLabel ?? 'Password')
                  .required(true)
                  .validations({ minLength: 5, maxLength: 32 })
                  .addOn({ type: 'text', position: 'left', icon: 'fa fa-lock' }),
                Flex.make()
                  .justify('space-between')
                  .alignItems('start')
                  .permission(!!opt.captcha)
                  .items([
                    InputText.make()
                      .id('login-captcha')
                      .name('captcha')
                      .label(false)
                      .required(true)
                      .placeholder(opt.captchaLabel ?? 'Captcha')
                      .className('w-3/4')
                      .addOn({ type: 'text', position: 'left', icon: 'fa fa-pen' }),
                    Image.make()
                      .id('login-captcha')
                      .imageMode('original')
                      .className('login-captcha')
                      .width(100)
                      .height(32)
                      .src(opt.captcha ?? '')
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
                  .option(opt.rememberLabel ?? 'Remember me')
                  .permission(!!opt.rememberLabel),
                Button.make()
                  .label(opt.submitLabel ?? 'Sign in')
                  .actionType('submit')
                  .level('primary')
                  .rightIcon('fa fa-arrow-right')
                  .style({ width: '100%', margin: '0' }),
              ]),
          ]),
      ])
  }

  background(opt: { color?: string; image?: string } = { color: '#FFFFFF' }) {
    let vars: Record<string, any> = {}
    if (opt.color) {
      vars['--Page-main-bg'] = opt.color
    }
    if (opt.image) {
      vars['--Page-main-bg'] = 'none'
      this.schema.className('login-bg').attr(
        'css',
        {
          '.login-bg': {
            'background-image': `url(${opt.image}) !important`,
            'background-size': 'cover !important',
            'background-position': 'center !important',
            'background-repeat': 'no-repeat !important',
          },
        },
        'merge'
      )
    }
    return this
  }

  side(opt: { image: string; align: 'left' | 'right' }) {
    let bg = Container.make().id('login-side').className('login-side')
    let hbox = this.schema.find('login-hbox')
    hbox.attr('columns', bg, opt.align === 'left' ? 'unshift' : 'push')
    this.schema.attr(
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
    this.schema.attr(
      'css',
      {
        '.login-side': {
          'height': '100%',
          'background-image': `url(${opt.image}) !important`,
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

  toJSON() {
    return this.schema.toJSON()
  }
}

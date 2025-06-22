import { Widget } from '../types.js'
import Container from '../components/container.js'
import Flex from '../components/flex.js'
import Image from '../components/image.js'
import Panel from '../components/panel.js'
import Link from '../components/link.js'

export default class CardInfoWidget extends Widget {
  protected bootSchema = Panel.make()
    .className('h-80')
    .body([
      Flex.make()
        .className('h-full')
        .justify('center')
        .alignItems('center')
        .items([
          Image.make()
            .id('logo')
            .imageMode('original')
            .innerClassName('border-none pt-10')
            .width(60)
            .height(60)
            .src('https://github.com/tmkook/adova-amis/blob/main/docs/img/logo.png?raw=true'),
        ]),
      Container.make().id('title').className('text-center text-3xl pt-8').body('Adova Admin'),
      Flex.make()
        .id('links')
        .className('w-full mt-8')
        .justify('center')
        .items([
          Link.make()
            .body('Adova')
            .className('px-6 text-lg')
            .blank(true)
            .href('https://github.com/tmkook/adova'),
          Link.make()
            .body('Adomis')
            .className('px-6 text-lg')
            .blank(true)
            .href('https://github.com/tmkook/adomis'),
          Link.make()
            .body('AdonisJS')
            .className('px-6 text-lg')
            .blank(true)
            .href('https://adonisjs.com/'),
          Link.make()
            .body('Amis')
            .className('px-6 text-lg')
            .blank(true)
            .href('https://baidu.github.io/amis/zh-CN/docs/index'),
        ]),
    ])

  setLogo(url: string) {
    this.bootSchema.find('logo').src(url)
    return this
  }

  setTitle(title: string) {
    this.bootSchema.find('title').body(title)
    return this
  }

  setLinks(links: object[]) {
    this.bootSchema.find('links').items(links)
    return this
  }
}

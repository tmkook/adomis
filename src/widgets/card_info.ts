import { Widget } from '../types.js'
import Container from '../components/container.js'
import Flex from '../components/flex.js'
import Image from '../components/image.js'
import Panel from '../components/panel.js'
import Link from '../components/link.js'

export default class CardInfoWidget extends Widget {
  make(): void {
    this.bootSchema = Panel.make()
      .className('h-80')
      .body([
        Flex.make()
          .className('h-full')
          .justify('center')
          .alignItems('center')
          .items([
            Image.make()
              .imageMode('original')
              .innerClassName('border-none pt-10')
              .width(60)
              .height(60)
              .src('https://github.com/tmkook/adova-amis/blob/main/docs/img/logo.png?raw=true'),
            Container.make().className('text-center text-3xl pt-8').body('Adova Admin'),
          ]),
        Flex.make()
          .className('w-full mt-5')
          .justify('center')
          .items([
            Link.make()
              .label('Adova')
              .className('px-6 text-lg font-bold')
              .href('https://github.com/tmkook/adova'),
            Link.make()
              .label('Adoamis')
              .className('px-6 text-lg font-bold')
              .href('https://github.com/tmkook/adoamis'),
            Link.make()
              .label('AdonisJS')
              .className('px-6 text-lg font-bold')
              .href('https://adonisjs.com/'),
            Link.make()
              .label('Packages')
              .className('px-6 text-lg font-bold')
              .href('https://packages.adonisjs.com'),
          ]),
      ])
  }
}

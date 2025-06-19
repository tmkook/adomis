import { Widget } from '../types.js'
import Number from '../components/number.js'
import Flex from '../components/flex.js'
import Tpl from '../components/tpl.js'
import { default as Card, Header } from '../components/card.js'
import Remark from '../components/remark.js'

/**
 * Chart
 * @docs https://echarts.apache.org/examples/zh/index.html
 */
export default class CardCountWidget extends Widget {
  make(): void {
    this.bootSchema = Card.make()
      .header(Header.make().subTitle('Page Views'))
      .body([
        Flex.make()
          .justify('start')
          .alignItems('center')
          .items([Number.make().id('count').className('text-2xl'), Tpl.make().id('trend')]),
      ])
      .toolbar([
        Remark.make().id('tooltips').content('Page view count').placement('bottom').shape('circle'),
      ])
    this.setCount('1000', '10%', 'up')
  }

  setCount(
    count: string | number,
    rate: string | number,
    trend: 'up' | 'down',
    color?: 'green' | 'red'
  ) {
    if (!color) {
      color = trend === 'up' ? 'green' : 'red'
    }
    let symbol = trend === 'up' ? '↗' : '↘'
    let classname = color === 'green' ? 'success' : 'danger'
    this.bootSchema
      .find('trend')
      .tpl(`<span class="ml-2 label label-${classname}">${symbol} ${rate}</span>`)
    this.bootSchema.find('count').value(count)
  }

  setTooltips(text: string) {
    this.bootSchema.find('tooltips').content(text)
  }

  setTitle(title: string) {
    this.bootSchema.find('header').subTitle(title)
  }
}

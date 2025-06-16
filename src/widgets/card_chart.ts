import { Widget } from '../types.js'
import Panel from '../components/panel.js'
import Chart from '../components/chart.js'

/**
 * Chart
 * @docs https://echarts.apache.org/examples/zh/index.html
 */
export default class CardChartWidget extends Widget {
  make(): void {
    let example = {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    }
    this.bootSchema = Panel.make().className('h-80').body(Chart.make().id('chart').config(example))
  }

  setData(data: object | string) {
    this.bootSchema.find('chart').config(data)
    return this
  }

  setSource(source: string) {
    this.bootSchema.find('chart').source(source).remove('config')
    return this
  }
}

import Schema from './schema.js'
import BadgeSchema from './badge.js'
import ActionSchema from './action.js'

/**
 * GridNav
 * @docs https://baidu.github.io/amis/zh-CN/components/grid-nav
 */
export default class GridNav extends Schema<GridNav> {
  protected json: Record<string, any> = { type: 'grid-nav' }

  itemClassName(itemClassName: string) {
    this.json['itemClassName'] = itemClassName
    return this
  }

  contentClassName(contentClassName: string) {
    this.json['contentClassName'] = contentClassName
    return this
  }

  value(value: object[]) {
    this.json['value'] = value
    return this
  }

  source(source: string) {
    this.json['source'] = source
    return this
  }

  square(square: boolean) {
    this.json['square'] = square
    return this
  }

  center(center: boolean) {
    this.json['center'] = center
    return this
  }

  border(border: boolean) {
    this.json['border'] = border
    return this
  }

  gutter(gutter: number) {
    this.json['gutter'] = gutter
    return this
  }

  reverse(reverse: boolean) {
    this.json['reverse'] = reverse
    return this
  }

  iconRatio(iconRatio: number) {
    this.json['iconRatio'] = iconRatio
    return this
  }

  direction(direction: 'horizontal' | 'vertical') {
    this.json['direction'] = direction
    return this
  }

  columnNum(columnNum: number) {
    this.json['columnNum'] = columnNum
    return this
  }

  options(options: GridNavOptionItem[]) {
    this.json['options'] = options
    return this
  }
}

type GridNavOptionItem = {
  icon?: string
  text?: string
  badge?: BadgeSchema
  link?: string
  blank?: boolean
  clickAction?: ActionSchema
}

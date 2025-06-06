import Schema from './schema.js'

/**
 * Grid
 * @docs https://baidu.github.io/amis/zh-CN/components/grid
 */
export default class Grid extends Schema<Grid> {
  protected json: Record<string, any> = { type: 'grid' }

  gap(gap: 'xs' | 'sm' | 'base' | 'none' | 'md' | 'lg') {
    this.json['gap'] = gap
    return this
  }

  valign(valign: 'top' | 'middle' | 'bottom' | 'between') {
    this.json['valign'] = valign
    return this
  }

  align(align: 'left' | 'right' | 'between' | 'center') {
    this.json['align'] = align
    return this
  }

  columns(columns: object[]) {
    this.json['columns'] = columns
    return this
  }
}

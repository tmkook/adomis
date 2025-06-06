import { test } from '@japa/runner'
import render from '../src/render.js'
import Page from '../src/components/page.js'
import Button from '../src/components/button.js'

test.group('Test components', () => {
  const page = Page.make()
    .body([Button.make().label('Test').id('btn1'), Button.make().label('Test').id('btn2')])
    .data({ test: 1, test2: 2 })

  test('Test attr push', ({ assert }) => {
    page.attr('body', Button.make().label('Test').id('btn3'), 'push')
    let btn = page.find('btn3')
    assert.instanceOf(btn, Button)
  })

  test('Test attr unshift', ({ assert }) => {
    page.attr('body', Button.make().label('Test').id('btn4'), 'unshift')
    let btn = page.find('btn4')
    let json = page.toJSON()
    assert.equal(json.body[0], btn)
  })

  test('Test attr remove', ({ assert }) => {
    page.find('btn1').remove()
    page.remove('data')
    let json = JSON.parse(JSON.stringify(page))
    assert.lengthOf(json.body, 3)
    assert.isUndefined(json.data)
  })

  test('Test Render', ({ assert }) => {
    let html = render(page)
    assert.isString(html)
  })
})

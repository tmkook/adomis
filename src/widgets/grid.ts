import Action from '../components/action.js'
import Api from '../components/api.js'
import { default as Crud, ColumnItem } from '../components/crud.js'
import Dialog from '../components/dialog.js'
import Form from '../components/form.js'
import DropdownButton from '../components/dropdown_button.js'

export default class Grid {
  public schema = Crud.make()
    .syncLocation(false)
    .filterTogglable(true)
    .filterDefaultVisible(false)
    .defaultParams({ orderBy: 'id', orderDir: 'desc' })
    .footerToolbar(['statistics', 'switch-per-page', 'pagination'])
    .headerToolbar(['bulkActions', 'filter-toggler'])
    .bulkActions([])

  constructor(opt: { api: Api; columns: ColumnItem[]; operationTitle?: string }) {
    let operation = ColumnItem.make()
      .id('operation')
      .type('operation')
      .label(opt.operationTitle ?? 'Operation')
      .align('right')
      .width('50')
      .buttons([
        DropdownButton.make()
          .id('operation-button')
          .icon('fa fa-ellipsis-h')
          .level('link')
          .hideCaret(true)
          .buttons([]),
      ])
    opt.columns.push(operation)
    this.schema.api(opt.api).columns(opt.columns)
  }

  create(opt: { api: Api; columns: object[]; createLabel?: string }) {
    let create = Action.make()
      .label(opt.createLabel ?? 'Create')
      .icon('fa fa-plus')
      .align('right')
      .actionType('dialog')
      .level('primary')
      .attr(
        'dialog',
        Dialog.make()
          .title(opt.createLabel ?? 'Create')
          .body(Form.make().id('create-form').api(opt.api).body(opt.columns))
      )
    this.schema.attr('headerToolbar', create, 'push')
  }

  show(opt: { api: Api; columns: object[]; showLabel?: string }) {
    let show = Action.make()
      .label(opt.showLabel ?? 'Show')
      .actionType('dialog')
      .attr(
        'dialog',
        Dialog.make()
          .title(opt.showLabel ?? 'Show')
          .body(Form.make().id('edit-form').static(true).initApi(opt.api).body(opt.columns))
      )
    let operation = this.schema.find('operation-button')
    operation.attr('buttons', show, 'push')
  }

  edit(opt: { api: Api; columns: object[]; editLabel?: string }) {
    let edit = Action.make()
      .label(opt.editLabel ?? 'Edit')
      .actionType('dialog')
      .attr(
        'dialog',
        Dialog.make()
          .title(opt.editLabel ?? 'Edit')
          .body(Form.make().id('edit-form').api(opt.api).body(opt.columns))
      )
    let operation = this.schema.find('operation-button')
    operation.attr('buttons', edit, 'push')
  }

  delete(opt: {
    api: Api
    batchDeleteLabel?: string
    deleteLabel?: string
    deleteConfirmText?: string
  }) {
    let batch = Action.make()
      .id('batch-delete')
      .api(opt.api)
      .actionType('ajax')
      .label(opt.batchDeleteLabel ?? 'Batch Delete')
      .level('danger')
      .confirmText(opt.deleteConfirmText ?? 'Are you sure delete?')
    this.schema.attr('bulkActions', batch, 'push')

    let del = Action.make()
      .id('delete')
      .api(opt.api)
      .actionType('ajax')
      .label(opt.deleteLabel ?? 'Delete')
      .level('link')
      .confirmText(opt.deleteConfirmText ?? 'Are you sure delete?')
    let operation = this.schema.find('operation-button')
    operation.attr('buttons', del, 'push')
  }

  filter(columns: object[]) {
    this.schema.filter(Form.make().id('filter-form').mode('inline').body(columns))
  }

  toJSON() {
    return this.schema.toJSON()
  }
}

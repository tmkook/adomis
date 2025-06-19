import { Widget } from '../types.js'
import { default as Crud, ColumnItem } from '../components/crud.js'
import DropdownButton from '../components/dropdown_button.js'
import InputText from '../components/input_text.js'
import Action from '../components/action.js'
import Dialog from '../components/dialog.js'
import Form from '../components/form.js'
import Api from '../components/api.js'
import FormItem from '../components/form_item.js'
import Checkbox from '../components/checkbox.js'

export default class GridWidget extends Widget {
  make(): void {
    this.bootSchema = Crud.make()
      .syncLocation(false)
      .filterTogglable(true)
      .filterDefaultVisible(false)
      .defaultParams({ orderBy: 'id', orderDir: 'desc' })
      .footerToolbar(['statistics', 'switch-per-page', 'pagination'])
      .filter(
        Form.make()
          .id('filter-form')
          .mode('inline')
          .body([
            Checkbox.make()
              .name('onlyTrashed')
              .label(this.t('widget.recycle', undefined, 'Recycle')),
            InputText.make().name('id').label('ID').placeholder('ID'),
          ])
          .actions([
            Action.make()
              .actionType('reset')
              .label(this.t('widget.reset', undefined, 'Reset')),
            Action.make()
              .actionType('submit')
              .label(this.t('widget.search', undefined, 'Search'))
              .icon('fa fa-search')
              .active(true),
          ])
      )
      .headerToolbar([
        'filter-toggler',
        'export-csv',
        'bulkActions',
        Action.make()
          .id('create-button')
          .label(this.t('widget.create', undefined, 'Create'))
          .icon('fa fa-plus')
          .align('right')
          .level('primary')
          .actionType('dialog')
          .attr(
            'dialog',
            Dialog.make()
              .title(this.t('widget.create', undefined, 'Create'))
              .body(Form.make().id('create-form'))
          ),
      ])
      .bulkActions([
        Action.make()
          .id('batch-delete')
          .actionType('ajax')
          .label(this.t('widget.batchDelete', undefined, 'Batch Delete'))
          .level('danger')
          .confirmText(this.t('widget.deleteConfirm', undefined, 'Are you sure delete?')),
      ])
      .columns([
        ColumnItem.make()
          .id('operation')
          .type('operation')
          .label(this.t('widget.operation', undefined, 'Operation'))
          .align('right')
          .width('50')
          .buttons([
            DropdownButton.make()
              .id('operation-buttons')
              .icon('fa fa-ellipsis-h')
              .level('link')
              .hideCaret(true)
              .buttons([
                Action.make()
                  .id('show-button')
                  .label(this.t('widget.show', undefined, 'Show'))
                  .actionType('dialog')
                  .attr(
                    'dialog',
                    Dialog.make()
                      .title(this.t('widget.show', undefined, 'Show'))
                      .body(
                        Form.make()
                          .id('show-form')
                          .static(true)
                          .body([
                            InputText.make().id('input-id').name('id').label('ID').disabled(true),
                          ])
                      )
                  ),
                Action.make()
                  .id('edit-button')
                  .label(this.t('widget.edit', undefined, 'Edit'))
                  .actionType('dialog')
                  .attr(
                    'dialog',
                    Dialog.make()
                      .title(this.t('widget.edit', undefined, 'Edit'))
                      .body(
                        Form.make()
                          .id('edit-form')
                          .body([
                            InputText.make().id('input-id').name('id').label('ID').disabled(true),
                          ])
                      )
                  ),
                Action.make()
                  .id('delete-button')
                  .actionType('ajax')
                  .label(this.t('widget.delete', undefined, 'Delete'))
                  .level('link')
                  .confirmText(this.t('widget.deleteConfirm', undefined, 'Are you sure delete?')),
              ]),
          ]),
      ])
  }

  disableOperation() {
    this.bootSchema.find('operation').remove()
  }

  disableCreate() {
    this.bootSchema.find('create-button').remove()
  }

  disableShow() {
    this.bootSchema.find('show-button').remove()
  }

  disableEdit() {
    this.bootSchema.find('edit-button').remove()
  }

  disableDelete() {
    this.bootSchema.find('delete-button').remove()
  }

  disableBatchDelete() {
    this.bootSchema.find('batch-delete').remove()
  }

  disableFilter() {
    this.bootSchema.remove('filter')
    this.bootSchema.removeArrayItem('headerToolbar', 'filter-toggler')
  }

  disableBulkActions() {
    this.bootSchema.remove('bulkActions')
    this.bootSchema.removeArrayItem('headerToolbar', 'bulkActions')
  }

  setList(columns: ColumnItem[], api?: Api) {
    let obj = this.bootSchema.attr('columns', columns, 'unshift')
    if (api) {
      obj.api(api)
    }
    return this
  }

  setFilter(columns: FormItem[], api?: Api) {
    let obj = this.bootSchema.find('filter-form').body(columns)
    if (api) {
      obj.api(api)
    }
    return this
  }

  setCreate(columns: FormItem[], api?: Api) {
    let obj = this.bootSchema.find('create-form').body(columns)
    if (api) {
      obj.api(api)
    }
    return this
  }

  setShow(columns: FormItem[], api?: Api) {
    let obj = this.bootSchema.find('show-form').attr('body', columns, 'push')
    if (api) {
      obj.initApi(api)
    }
    return this
  }

  setEdit(columns: FormItem[], api?: Api) {
    let obj = this.bootSchema.find('edit-form').attr('body', columns, 'push')
    if (api) {
      obj.api(api)
    }
    return this
  }

  setDelete(api?: Api) {
    this.bootSchema.find('delete-button').api(api)
    return this
  }

  setBatchDelete(api?: Api) {
    this.bootSchema.find('batch-delete').api(api)
    return this
  }

  setCrud(columns: FormItem[], api: Api) {
    let json = api.toJSON()

    let createApi = new Api(json)
    createApi.method('post')
    this.setCreate(columns, createApi)

    let editApi = new Api(json)
    editApi.method('put')
    editApi.url(json.url + '/${id}')
    this.setEdit(columns, editApi)

    let showApi = new Api(json)
    showApi.method('get')
    showApi.url(json.url + '/${id}')
    this.setShow(columns, showApi)

    let deleteApi = new Api(json)
    deleteApi.method('delete')
    deleteApi.url(json.url + '/${id}')
    this.setDelete(deleteApi)

    let batchDeleteApi = new Api(json)
    batchDeleteApi.method('delete')
    batchDeleteApi.url(json.url + '/${ids}')
    this.setBatchDelete(batchDeleteApi)

    let list = [ColumnItem.make().name('id').id('column-id').label('ID')]
    for (let item of columns) {
      let column = item.toJSON()
      let row = ColumnItem.make().name(column.name).label(column.label)
      if (column.name === 'id') {
        row.sortable(true)
      }
      list.push(row)
    }
    this.setList(list, api)
    return this
  }
}

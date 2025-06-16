import { Widget } from '../types.js'
import { default as Crud, ColumnItem } from '../components/crud.js'
import DropdownButton from '../components/dropdown_button.js'
import InputText from '../components/input_text.js'
import Action from '../components/action.js'
import Dialog from '../components/dialog.js'
import Form from '../components/form.js'
import Api from '../components/api.js'
import FormItem from '../components/form_item.js'

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
          .body([InputText.make().name('id').label('ID').placeholder('ID')])
      )
      .headerToolbar([
        'bulkActions',
        'filter-toggler',
        Action.make()
          .id('create-button')
          .label(this.t('amis.create'))
          .icon('fa fa-plus')
          .align('right')
          .level('primary')
          .permission(false)
          .actionType('dialog')
          .attr(
            'dialog',
            Dialog.make().title(this.t('amis.create')).body(Form.make().id('create-form'))
          ),
      ])
      .bulkActions([
        Action.make()
          .id('batch-delete')
          .actionType('ajax')
          .label(this.t('amis.batchDelete'))
          .level('danger')
          .confirmText(this.t('amis.deleteConfirm', undefined, 'Are you sure delete?')),
      ])
      .columns([
        ColumnItem.make()
          .id('operation')
          .label(this.t('amis.operation'))
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
                  .label(this.t('amis.show'))
                  .actionType('dialog')
                  .attr(
                    'dialog',
                    Dialog.make()
                      .title(this.t('amis.show'))
                      .body(Form.make().id('show-form').static(true))
                  ),
                Action.make()
                  .id('edit-button')
                  .label(this.t('amis.edit'))
                  .actionType('dialog')
                  .attr(
                    'dialog',
                    Dialog.make().title(this.t('amis.edit')).body(Form.make().id('edit-form'))
                  ),
                Action.make()
                  .id('delete-button')
                  .actionType('ajax')
                  .label(this.t('amis.delete'))
                  .level('link')
                  .confirmText(this.t('amis.deleteConfirm', undefined, 'Are you sure delete?')),
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
    let obj = this.bootSchema.find('show-form').body(columns)
    if (api) {
      obj.api(api)
    }
    return this
  }

  setEdit(columns: FormItem[], api?: Api) {
    let obj = this.bootSchema.find('edit-form').body(columns)
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
    this.setEdit(columns, showApi)

    let deleteApi = new Api(json)
    deleteApi.method('delete')
    deleteApi.url(json.url + '/${ids}')
    this.setBatchDelete(deleteApi)
    this.setDelete(deleteApi)

    let list = []
    for (let item of columns) {
      let json = item.toJSON()
      let row = ColumnItem.make().name(json.name).label(json.label)
      if (json.name === 'id') {
        row.sortable(true)
      }
      list.push(row)
    }
    this.setList(list, api)
    return this
  }
}

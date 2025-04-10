import { AceFactory } from '@adonisjs/core/factories'
import { test } from '@japa/runner'
import AdminControllerCommand from '../commands/admin_controller.js'

test.group('admin', () => {
  test('create admin controller', async ({ assert, fs }) => {
    const aceFactory = new AceFactory()
    const ace = await aceFactory.make(fs.baseUrl)
    await ace.app.init()
    ace.ui.switchMode('raw')
    const command = await ace.create(AdminControllerCommand, ['user'])
    await command.exec()
    await assert.fileNotExists('app/controllers/admin/users_controller.ts')
    console.log(fs.baseUrl.pathname)
  })
})

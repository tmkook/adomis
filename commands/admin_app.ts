import { BaseCommand, args } from '@adonisjs/core/ace'
import { kmolaRoot } from '../index.js'
import fs from 'node:fs'

export default class AdminAppCommand extends BaseCommand {
  static commandName = 'admin:app'
  static description = 'Create a Admin Application'

  @args.string({ description: 'Application Name', default: 'admin', required: true })
  declare dir: string

  async run() {
    if (!fs.existsSync(this.app.viewsPath('admin'))) {
      fs.cpSync(kmolaRoot + '/stubs/resources/views/admin', this.app.viewsPath('admin'), {
        recursive: true,
      })
      this.logger.success('create resources/views/admin')
    } else {
      this.logger.success('the resources/views/admin exists')
    }
    if (!fs.existsSync(this.app.languageFilesPath('en/admin.json'))) {
      fs.cpSync(kmolaRoot + '/stubs/resources/lang', this.app.languageFilesPath(), {
        recursive: true,
      })
      this.logger.success('create resources/lang')
    } else {
      this.logger.success('the resources/lang exists')
    }
    if (!fs.existsSync(this.app.modelsPath('admin'))) {
      fs.cpSync(kmolaRoot + '/stubs/models', this.app.modelsPath(), { recursive: true })
      this.logger.success('create app/models')
    } else {
      this.logger.warning('the app/models exists')
    }
    if (!fs.existsSync(this.app.publicPath('amis'))) {
      fs.symlinkSync(kmolaRoot + '/stubs/public/amis', this.app.publicPath('amis'), 'dir')
      this.logger.success('create public/amis')
    } else {
      this.logger.warning('the public/amis exists')
    }
    const codemods = await this.createCodemods()
    codemods.makeUsingStub(kmolaRoot, '/stubs/start/routes.stub', { dir: this.dir })
    codemods.makeUsingStub(kmolaRoot, 'stubs/controller/admin_controller.stub', { dir: this.dir })
  }
}

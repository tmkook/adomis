/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'
import extract from 'extract-zip'
import fs from 'node:fs'

export async function configure(_command: ConfigureCommand) {
  let source = `${stubsRoot}/public/assets/jssdk.zip`
  let target = _command.app.publicPath('assets')
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }
  await extract(source, { dir: target })
  _command.logger.success('install success public/assets/jssdk')
  _command.logger.info('To ignore the git of the jssdk, Please run:')
  _command.logger.info("echo '/public/assets/jssdk' >> .gitignore")
}

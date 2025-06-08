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

export async function publish(target: string): Promise<boolean> {
  let assets = `${stubsRoot}/public/assets`
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }
  await extract(`${assets}/jssdk.zip`, { dir: target })
  fs.copyFileSync(`${assets}/adova.js`, `${target}/jssdk/adova.js`)
  fs.copyFileSync(`${assets}/history.js`, `${target}/jssdk/history.js`)
  return fs.existsSync(`${target}/jssdk/adova.js`)
}

export async function configure(_command: ConfigureCommand) {
  let target = _command.app.publicPath('assets')
  if (await publish(target)) {
    _command.logger.success('install success public/assets/jssdk')
  } else {
    _command.logger.error('cannot install public/assets/jssdk')
  }
}

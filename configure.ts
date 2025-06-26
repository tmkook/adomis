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
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import extract from 'extract-zip'
import fs from 'node:fs'

/**
 * Path to the root directory where the stubs are stored. We use
 * this path within commands and the configure hook
 */
export const rootPath = dirname(fileURLToPath(import.meta.url))

/*
 * adonis configure call
 */
export async function configure(_command: ConfigureCommand) {
  const codemods = await _command.createCodemods()

  // extract amis
  let target = _command.app.publicPath('amis')
  if (!fs.existsSync(target) || codemods.overwriteExisting) {
    if (await publish(target)) {
      _command.logger.action('create public/amis').succeeded()
      console.log('ignore amis, please run `echo "public/amis" >> .gitignore`')
    } else {
      _command.logger.action('create public/amis').failed('Publish failed')
    }
  } else {
    _command.logger.action('create public/amis').skipped()
  }
}

/**
 * extract amis jssdk
 */
export async function publish(target: string): Promise<boolean> {
  let assets = `${rootPath}/stubs/public`
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true })
  }
  await extract(`${assets}/jssdk.zip`, { dir: target })
  fs.copyFileSync(`${assets}/adomis.js`, `${target}/adomis.js`)
  fs.copyFileSync(`${assets}/history.js`, `${target}/history.js`)
  return fs.existsSync(`${target}/adomis.js`)
}

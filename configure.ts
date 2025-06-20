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
  let overwrite = codemods.overwriteExisting
  if (!fs.existsSync(_command.app.middlewarePath('detect_user_locale_middleware.ts'))) {
    // install adonisjs modules
    const packages = [{ name: '@adonisjs/i18n', isDevDependency: false }]
    await codemods.installPackages(packages)

    // configure modules
    for (let pkg of packages) {
      await _command.kernel.exec('configure', [
        pkg.name,
        '--force',
        '--verbose',
        '--package-manager=npm',
      ])
    }

    // force middleware
    codemods.overwriteExisting = true
  }

  // i18n stubs
  await codemods.makeUsingStub(
    rootPath,
    '/stubs/app/middleware/detect_user_locale_middleware.stub',
    {}
  )

  // reset overwrite
  codemods.overwriteExisting = overwrite

  // lang stubs
  await codemods.makeUsingStub(rootPath, '/stubs/lang/en/widget.stub', {})
  await codemods.makeUsingStub(rootPath, '/stubs/lang/zh/widget.stub', {})

  // extract amis
  let target = _command.app.publicPath('amis')
  if (!fs.existsSync(target) || overwrite) {
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

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

export async function configure(_command: ConfigureCommand) {
  const codemods = await _command.createCodemods()
  await codemods.installPackages([{ name: '@adonisjs/auth', isDevDependency: false }])
  await codemods.installPackages([{ name: '@adonisjs/i18n', isDevDependency: false }])
  await codemods.installPackages([{ name: 'adonis-lucid-soft-deletes', isDevDependency: false }])
  await codemods.updateRcFile((rcFile) => {
    rcFile.addCommand('@adonisjs/kmola/commands')
  })
}

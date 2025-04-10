import { BaseCommand, args, flags } from '@adonisjs/core/ace'
import string from '@adonisjs/core/helpers/string'
import { kmolaRoot } from '../index.js'
import fs from 'fs'

export default class AdminControllerCommand extends BaseCommand {
    static commandName = 'admin:controller'
    static description = 'Create a Api Controller'

    @args.string({ description: 'Model Name', required: true })
    declare model: string

    @flags.string({ description: 'Application Name', default: 'admin', required: true })
    declare dir: string

    @flags.boolean({ description: 'Create a Complete CRUD' })
    declare complete: boolean

    async run() {
        const codemods = await this.createCodemods()
        if (this.complete) {
            let keys: Record<string, string> = {};
            let ignorekeys = ['createdAt', 'updatedAt', 'deletedAt'];
            let file = this.app.modelsPath(this.app.generators.modelFileName(this.model))
            if (!fs.existsSync(file)) {
                return this.logger.error('Model Not Found: ' + file);
            }
            let content = fs.readFileSync(file, 'utf-8');
            let matched = content.matchAll(/declare\s+(\w+)\s*:\s*(\w+)/g).toArray()
            for (let item of matched) {
                if (ignorekeys.includes(item[1]) == false) {
                    keys[string.snakeCase(item[1])] = item[2];
                }
            }

            //create controller
            codemods.makeUsingStub(kmolaRoot, '/stubs/controllers/key_controller.stub', { model: this.model, dir: this.dir, keys: Object.keys(keys) })

            //create lang
            codemods.makeUsingStub(kmolaRoot, '/stubs/lang/en.stub', { model: this.model, dir: this.dir, keys: Object.keys(keys) })

            //create schema
            let column = []
            for (let key in keys) {
                column.push({
                    name: key,
                    label: "{{t('" + this.dir + "." + this.model + "." + key + "')}}"
                })
            }
            let api = "get:{{route('" + this.dir + "." + this.model + ".index')}}";
            codemods.makeUsingStub(kmolaRoot, '/stubs/schemas/crud_amis.stub', { model: this.model, dir: this.dir, api: api, column: column })

            //update router
            let routes = this.app.startPath('routes_' + this.dir + '.ts')
            if (fs.existsSync(routes)) {
                let append = 'router.resource("api/' + this.model + '").apiOnly().as("' + this.model + '")'
                let router = fs.readFileSync(routes, 'utf-8')
                if (router.indexOf('}).') > -1) {
                    router.replace('}).', "\r\n    " + append + "}).")
                    fs.writeFileSync(routes, router)
                } else {
                    return this.logger.error('Not Found Router Group, Please Add Manually');
                }
            } else {
                return this.logger.error('Router Not Found: routes_' + this.dir+'.ts');
            }
        } else {
            codemods.makeUsingStub(kmolaRoot, '/stubs/controllers/api_controller.stub', { model: this.model, dir: this.dir })
        }
    }
}
import { publish } from '../configure.js'
let success = await publish(process.cwd() + '/public/amis')
if (success) {
  console.log('created: public/amis')
  console.log('ignore amis, please run `echo "public/amis" >> .gitignore`')
} else {
  console.log('publish error: public/amis')
}

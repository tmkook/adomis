import { publish } from '../configure.js'
publish(process.cwd() + '/public/assets').then((result) => {
  if (result) {
    console.log('install success public/assets/jssdk')
  } else {
    console.log('cannot install public/assets/jssdk')
  }
})

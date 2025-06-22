import * as components from './components/index.js'
type KeyName = keyof typeof components
export default function amis<T extends KeyName>(name: T): InstanceType<(typeof components)[T]> {
  const obj: any = components[name]
  return obj.make()
}

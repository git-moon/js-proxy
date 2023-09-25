import { deepEqual } from "../util"

export default class RenderProxy {
  constructor() {
    const state = ['data', 'props']
    const handler = {
      set(target, prop, newValue) {
        const isState = state.includes(prop) === true
        const oldValue = target[prop]
        
        let isDiff = deepEqual(oldValue, newValue) === false
        if (isDiff) {
          target[prop] = newValue

          if (isState && !!target['onChange']) {
            target['onChange'](prop, oldValue, newValue)
          }
        }

        return true
      }
    }

    const proxy = new Proxy(this, handler)

    return proxy
  }
}
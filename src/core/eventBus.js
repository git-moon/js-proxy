class EventBus {
  // key: string
  // value: array
  events = new Map()

  publish(eventName, value) {
    const callbacks = this.events.get(eventName) || []

    for (const callback of callbacks) {
      if (typeof callback === 'function') {
        callback(value)
      }
    }
  }

  subscribe(eventName, callback) {
    const callbacks = this.events.get(eventName) || new Set()
    callbacks.add(callback)

    this.events.set(eventName, callbacks)
  }
}

const eventBus = new EventBus()
export default eventBus
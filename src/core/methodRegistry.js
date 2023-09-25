class MethodRegistry {
  methods = new Set()

  add = (fn) => {
    if (typeof fn === 'function') {
      this.methods.add(fn)
    }
  }

  register = () => {
    for (const method of this.methods) {
      method()
    }
    this.methods = new Set()
  }
}

const methodRegistry = new MethodRegistry()
export default methodRegistry
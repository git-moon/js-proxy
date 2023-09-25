import RenderProxy from "./RenderProxy"
import eventBus from "./eventBus"
import methodRegistry from "./methodRegistry"
import { makeKey } from "../util"

export default class Component extends RenderProxy {
  $target
  reqRender
  cKey
  data
  methods
  props
  state
  constructor({ target = null, props = null, autoRender = true, isChild = true }) {
    super()
    // 컴포넌트 렌더링할 타겟 dom
    this.$target = target
    
    // 컴포넌트 고유 키를 생성한다
    this.cKey = makeKey(10)

    this.reqRender = 0
    this.props = { ...props }
    this.autoRender = autoRender
    this.isChild = isChild
    this.methods = {}
    this.setData()
    this.setMethods()
    this.created()
    this.addMethods()
  }

  setMethods() {}

  addMethods() {
    for (const key in this.methods) {
      const fn = this.methods[key];
      methodRegistry.add(fn)
    }
  }

  created() {}

  // 이벤트 발행
  ePublish(eventName, value) {
    eventBus.publish(eventName, value)
  }

  // 이벤트 구독
  eSubscribe(eventName, callback) {
    eventBus.subscribe(eventName, callback)
  }

  onChange() {
    if (this.reqRender) {
      cancelAnimationFrame(this.reqRender)
    }
    this.reqRender = requestAnimationFrame(this.render.bind(this))
  }
  
  render() {
    if (!!this.$target && this.autoRender === true) {
      this.$target.innerHTML = this.template()
      methodRegistry.register()
      this.reqRender = 0
    }
  }

  reRender() {
    const el = this.$target.querySelector(`[data-component="${this.cKey}"]`)
    if (el) {
      if (this.isChild) {
        el.outerHTML = this.template()
      } else {
        el.innerHTML = this.template()
      }
    }
    
    this.setMethods()
    this.addMethods()
    methodRegistry.register()
  }

  renderChildren() {}

  setData() { this.data = {} }

  template() { return '' }
}
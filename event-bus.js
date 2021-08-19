class EventBus {
  constructor() {
    this._events = new Map()
  }

  on(name, fn) {
    if (!this._events.get(name)) {
      this._events.set(name, fn)
    }
  }

  emit(name, data) {
    let fn = this._events.get(name)
    if (fn) {
      fn.call(this, data)
    } else {
      throw Error(`not found ${name} function`)
    }
  }

  //如果是多个监听 fn存成数组的形式
}
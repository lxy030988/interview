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
class EventEmitter {
  constructor() {
    this._events = new Map()
  }

  on(name, fn) {
    if (!this._events.get(name)) {
      this._events.set(name, [fn])
    } else {
      this._events.get(name).push(fn)
    }
  }

  off(name, fn) {
    let fns = this._events.get(name)
    if (fns) {
      let index = fns.findIndex(item => item === fn)
      if (index >= 0) {
        fns.splice(index, 1)
      }
    }
  }

  emit(name, once = false, ...args) {
    if (this._events.get(name)) {
      let fns = this._events.get(name).slice(0)
      fns.forEach(fn => fn.call(this, ...args))
      if (once) {
        this._events.delete(name)
      }
    } else {
      throw Error(`not found ${name} function`)
    }
  }
}
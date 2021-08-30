//节流
function throttle(fn, delay = 500) {
  let flag = true
  return function (...args) {
    if (!flag) return
    flag = false
    setTimeout(() => {
      fn.apply(this, args)
      flag = true
    }, delay)
  }
}

function throttle2(fn, delay = 500) {
  let preTime = Date.now()
  return function (...args) {
    const nowTime = Date.now()
    if (nowTime - preTime >= delay) {
      fn.apply(this, args)
      preTime = Date.now()
    }
  }
}

function throttle3(fn, delay = 500) {
  let preTime = Date.now(),
    timer = null
  return function (...args) {
    const nowTime = Date.now()
    if (nowTime - preTime >= delay) {
      fn.apply(this, args)
      preTime = Date.now()
    } else {
      //时间还没到
      clearTimeout(timer)
      timer = setTimeout(() => {
        preTime = Date.now()
        fn.apply(this, args)
      }, delay)
    }
  }
}
module.exports = { throttle }

function throttle4(func, wait, options) {
  //options.leading 来表示是否可以立即执行一次，opitons.trailing 表示结束调用的时候是否还要执行一次
  var timeout, context, args, result
  var previous = 0
  if (!options) options = {}

  var later = function () {
    previous = options.leading === false ? 0 : new Date().getTime()
    timeout = null
    func.apply(context, args)
    if (!timeout) context = args = null
  }

  var throttled = function () {
    var now = new Date().getTime()
    if (!previous && options.leading === false) previous = now
    var remaining = wait - (now - previous)
    context = this
    args = arguments
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }
      previous = now
      func.apply(context, args)
      if (!timeout) context = args = null
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining)
    }
  }

  throttled.cancel = function () {
    clearTimeout(timeout)
    previous = 0
    timeout = null
  }
  return throttled
}

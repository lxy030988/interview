function add(a, b, c) {
  return a + b + c
}

function curry(func) {
  const len = func.length //形参的个数
  let curried = (...args) => {
    if (args.length === len) {
      return func(...args)
    }
    return (...r) => curried(...args, ...r)
  }
  return curried
}

let curriedAdd = curry3(add)

console.log(curriedAdd(1, 2, 3))
console.log(curriedAdd(1)(2, 3))
console.log(curriedAdd(1, 2)(3))
console.log(curriedAdd(1)(2)(3))

function curry2(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn(...args)
    } else {
      return (...r) => curried(...args, ...r)
    }
  }
}

function curry3(fn) {
  return function curried(...args) {
    if (fn.length <= args.length) {
      return fn.call(this, ...args)
    } else {
      return (...r) => curried.call(this, ...args, ...r)
    }
  }
}
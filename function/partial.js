//偏应用函数 先接受一部分参数，再处理剩余参数
//let x = xx.bind(null, 1, 2) 就是偏应用函数
const partial = (fn, ...args) => {
  return (...p) => fn(...args, ...p)
}

function add(a, b, c) {
  return a + b + c
}

const add1 = partial(add, 1)
const add2 = partial(add, 1, 2)
console.log(add1(2, 3))
console.log(add2(3))
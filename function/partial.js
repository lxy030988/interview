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


const partial2 = (fn, ...args) => {

  return (...p) => {
    args[0] = p[0]
    p = p.slice(1)
    return fn(...args, ...p)
  }
}
function clg(a, b, c) {
  console.log(a, b, c)
}
let partialClg = partial2(clg, '_', 2)
partialClg(1, 3)  // 依次打印：1, 2, 3

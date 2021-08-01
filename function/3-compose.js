function add1(str) {
  return str + 1
}
function add2(str) {
  return str + 2
}
function add3(str) {
  return str + 3
}

//let r1 = add3(add2(add1(str)));
//console.log(r1);//a123

function flow(...fns) {
  //fns=[add3,add2,add1]
  if (fns.length == 1) return fns[0]
  //如果大于等2个的话
  //a=a1 b=a2   (...args) => a1(a2(...args))
  //a=(...args) => a1(a2(...args)) b=a3   (...args) => a1(a2(a3(...args)))
  return fns.reduceRight((a, b) => {
    return (...args) => a(b(...args))
  })
}

function flowRight(...fns) {
  if (fns.length == 1) return fns[0]
  //add3(add2(add1(...args)))  //内层先执行，外层最后执行
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

let flowed = flowRight(add3, add2, add1)
let r1 = flowed('a')
console.log(r1)


export function compose(...fns) {
  if (fns.length === 0) return (...arg) => arg
  if (fns.length === 1) return fns[0]
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

let c1 = compose(add3, add2, add1)
console.log(c1('c', 2))
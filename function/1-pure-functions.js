/**
 * 纯函数 可缓存
 * 相同参数会产生相同的输出
 */

function add(a, b) {
  console.log('执行计算')
  return a + b
}
const resolver = (...args) => JSON.stringify(args) //缓存相同参数的key
function memoize(func, resolver) {
  let cache = {}
  return (...args) => {
    const key = resolver(...args)
    if (cache[key]) {
      return cache[key]
    } else {
      return (cache[key] = func(...args))
    }
  }
}
const memoizeAdd = memoize(add, resolver)
console.log(memoizeAdd(1, 2))
console.log(memoizeAdd(1, 2))
console.log(memoizeAdd(1, 2))
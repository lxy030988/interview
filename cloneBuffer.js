// https://juejin.cn/post/6844903999972474887

const allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined
function cloneBuffer(buffer, isDeep) {
  if (!isDeep) {
    return buffer.slice()
  } else {
    const len = buffer.length
    const res = allocUnsafe ? allocUnsafe(len) : new buffer.constructor(len)
    return res
  }
}

const buf = Buffer.from('lxy')
const buf2 = cloneBuffer(buf, true)
buf2.write('1112') //深克隆 修改buf2  buf不变   潜克隆 会一起变

console.log('buf', buf.toString())
console.log('buf2', buf2.toString())

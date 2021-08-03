// https://juejin.cn/post/6844903775384125448

let reg = /lxy/g
console.log(reg.test('lxy'))
console.log(reg.test('lxy'))
console.log(reg.test('lxy'))
console.log(reg.test('lxy'))

function cloneReg(target, isDeep) {
  let regFlag = /\w*$/
  let res = new target.constructor(target.source, regFlag.exec(target))
  if (isDeep) {
    res.lastIndex = 0
  } else {
    res.lastIndex = target.lastIndex
  }
  return res
}

let regx = /lxy/g
let reg2 = cloneReg(regx, true)
console.log(reg2)

//反柯力化
Function.prototype.uncury = function () {
  let _this = this
  return function () {
    let obj = Array.prototype.shift.call(arguments)
    return _this.apply(obj, arguments)
  }
}

let push = Array.prototype.push.uncury(), obj = {}
push(obj, '1', '2')
console.log(obj)
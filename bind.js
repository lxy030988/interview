Function.prototype.myBind = function (context) {
  var self = this
  var args = Array.prototype.slice.call(arguments, 1) //定义时的参数

  var fNOP = function () { }

  var fBound = function () {
    var bindArgs = Array.prototype.slice.call(arguments) //调用时的参数
    console.log(this instanceof fNOP)
    return self.apply(
      this instanceof fNOP ? this : context,
      args.concat(bindArgs)
    )
  }

  fNOP.prototype = this.prototype
  fBound.prototype = new fNOP()
  return fBound
}

var name = 'window name'
var obj = {
  name: 'obj name',
}
var fn = function () {
  console.log(this.name, [...arguments])
}
fn(1, 2, 3, 4) // 直接执行，this指向window
fn.myBind(obj, 1, 2)(3, 4) // myBind改变this指向
fn.bind(obj, 1, 2)(3, 4) // 原生bind

// 以上执行结果如下：
// window name [1, 2, 3, 4]
// obj name [1, 2, 3, 4]
// obj name [1, 2, 3, 4]


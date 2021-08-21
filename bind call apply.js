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



Function.prototype.myBind2 = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('this is not function')
  }

  const args = [...arguments].slice(1)
  const fn = this

  return function () {
    //this instanceof fn ? new fn(...arguments)  兼容new关键字
    return fn.apply(this instanceof fn ? new fn(...arguments) : context, args.concat([...arguments]))
  }

}


/**
 * call
 * 使用一个指定的 this 值和一个或多个参数来调用一个函数。

  实现要点：
  将函数设为对象的属性
  执行&删除这个函数
  指定this到函数并传入给定参数执行函数
  如果不传入参数，默认指向为 window
  函数可能有返回值；

 */

Function.prototype.call2 = function (context) {
  context = context || window
  context.fn = this

  const res = context.fn(...[...arguments].slice(1))
  delete context.fn
  return res
}


Function.prototype.apply2 = function (context, args) {
  context = context || window
  context.fn = this

  // var args = []
  // for (var i = 0, len = arr.length; i < len; i++) {
  //   args.push("arr[" + i + "]")
  // }
  // result = eval("context.fn(" + args + ")")

  args = args || []
  const res = context.fn(...args)
  delete context.fn
  return res



}
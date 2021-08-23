//1.原型链继承
// function Parent() {
//   this.name = 'Parent'
//   this.arr = [1, 2, 3]
// }
// Parent.prototype.getName = function () {
//   console.log(this.name)
// }

// function Child() {
//   this.age = 20
// }
// Child.prototype = new Parent()

// //实例使用的是同一个原型对象，内存空间是共享的
// let p = new Child()
// let c = new Child()
// c.name = 'xxx'
// p.name = 'ppp'
// p.arr.push(4)
// console.log(p.arr, c.arr, p.name, c.name) //引用类型数据共享

//2.构造函数继承
// function Parent() {
//   this.name = 'Parent'
//   this.arr = [1, 2, 3]
// }
// Parent.prototype.getName = function () {
//   console.log(this.name)
// }
// function Child() {
//   Parent.call(this)
//   this.age = 20
// }
// let c1 = new Child()
// let c2 = new Child()
// c1.name = 'xxx'
// c1.arr.push(4)
// console.log(c1, c2)
// c1.getName()//不能继承原型属性或者方法

//3.组合继承 1+2
// function Parent() {
//   this.name = 'Parent'
//   this.arr = [1, 2, 3]
// }
// Parent.prototype.getName = function () {
//   console.log(this.name)
// }
// function Child() {
//   Parent.call(this)
//   this.age = 20
// }
// Child.prototype = new Parent()
// Child.prototype.constructor = Child//构造器 指向自己的构造函数
// let c1 = new Child()
// let c2 = new Child()
// c1.name = 'xxx'
// c1.arr.push(4)
// console.log(c1, c2)
// c1.getName()
//解决了 1 2 的弊端，但是多调用一次Parent构造


//4.原型继承 和1.原型链继承差不多
// function Parent() {
//   this.name = 'Parent'
//   this.arr = [1, 2, 3]
// }
// Parent.prototype.getName = function () {
//   console.log(this.name)
// }

// // let parent = {
// //   name: "parent",
// //   arr: [1, 2, 3],
// //   getName: function () {
// //     return this.name
// //   }
// // }

// // //Object.create
// // function inheritObject(o) {
// //   function fn() { }
// //   fn.prototype = o
// //   return new fn()
// // }
// let parent = new Parent()

// let c1 = Object.create(parent)
// let c2 = Object.create(parent)

// c1.name = 'xxx'
// c1.arr.push(4)
// c2.arr.push(5)
// console.log(c1.name, c2.name, c1.arr, c2.arr)
// c1.getName()
//和1.原型链继承 有相同的问题 引用类型数据共享


//5.寄生继承  在原型继承添加一些自己的方法  缺点和原型继承一样
// function Parent() {
//   this.name = 'Parent'
//   this.arr = [1, 2, 3]
// }
// Parent.prototype.getName = function () {
//   console.log(this.name)
// }

// let parent = new Parent()

// let c1 = Object.create(parent)
// c1.getArr = function () {
//   console.log(this.arr)
// }
// let c2 = Object.create(parent)

// c1.name = 'xxx'
// c1.arr.push(4)
// c2.arr.push(5)
// console.log(c1.name, c2.name, c1.arr, c2.arr)
// c1.getName()
// c1.getArr()


//6.寄生组合式继承
function Parent() {
  this.name = 'Parent'
  this.arr = [1, 2, 3]
}
Parent.prototype.getName = function () {
  console.log(this.name)
}
function Child() {
  Parent.call(this)
  this.age = 20
}
Child.prototype = Object.create(Parent.prototype)//减少一次new Parent 构建
Child.prototype.constructor = Child//构造器 指向自己的构造函数
let c1 = new Child()
let c2 = new Child()
c1.name = 'xxx'
c1.arr.push(4)
console.log(c1, c2)
c1.getName()
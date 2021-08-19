//instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上
//构造函数通过new可以实例对象，instanceof能判断这个对象是否是之前那个构造函数生成的对象

function instanceOf(left, rifht) {
  if (typeof left !== 'object' || left === null) {
    return false
  }

  let l = left.__proto__
  while (true) {
    if (l === null) {
      return false
    }
    if (l === rifht.prototype) {
      return true
    }
    l = l.__proto__
  }
}

console.log({} instanceof Object)
console.log(instanceOf({}, Object))

// 实例的__proto__ === 构造函数的prototype
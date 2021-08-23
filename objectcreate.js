function objectcreate(proto) {
  function fn() { }
  fn.prototype = proto
  return new fn()
}

let a = { a: 'a' }
console.log(Object.create(a).a, objectcreate(a).a)
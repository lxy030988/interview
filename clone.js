function isObject(v) {
  return typeof v === 'object' && v !== null
}

function clone(obj, hash = new WeakMap()) {
  if (!isObject(obj)) {
    return obj
  }
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  let res = Array.isArray(obj) ? [] : {}
  Reflect.ownKeys(obj).forEach(item => {
    if (isObject(obj[item])) {
      res[item] = clone(obj[item], hash)
    } else {
      res[item] = obj[item]
    }
  })
  return res
}

const obj1 = {
  a: 1,
  b: {
    c: 2
  }
}
const obj2 = clone(obj1)
obj2.a = 2
obj1.b.c = 22
console.log(obj1, obj2)
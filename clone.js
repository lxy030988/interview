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
  Reflect.ownKeys(obj).forEach((item) => {
    if (isObject(obj[item])) {
      res[item] = clone(obj[item], hash)
    } else {
      res[item] = obj[item]
    }
  })
  hash.set(obj, res)
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

const isObject = (target) =>
  (typeof target === 'object' || typeof target === 'function') &&
  target !== null

function deepClone(target, map = new WeakMap()) {
  if (map.get(target)) {
    return target
  }
  // 获取当前值的构造函数：获取它的类型
  let constructor = target.constructor
  // 检测当前对象target是否与正则、日期格式对象匹配
  if (/^(RegExp|Date)$/i.test(constructor.name)) {
    // 创建一个新的特殊对象(正则类/日期类)的实例
    return new constructor(target)
  }
  if (isObject(target)) {
    map.set(target, true) // 为循环引用的对象做标记
    const cloneTarget = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      if (target.hasOwnProperty(prop)) {
        cloneTarget[prop] = deepClone(target[prop], map)
      }
    }
    return cloneTarget
  } else {
    return target
  }
}

function deepClone1(target, hash = new WeakMap()) {
  if (!isObject(target)) {
    return target
  }
  if (hash.has(target)) {
    return hash.get(obj)
  }
  const constructor = target.constructor
  if (/^(Date|RegExp)$/i.test(constructor.name)) {
    return new constructor(target)
  }
  const res = Array.isArray(target) ? [] : {}
  Reflect.ownKeys(target).forEach(item => {
    if (isObject(target[item])) {
      res[item] = deepClone1(target[item], hash)
    } else {
      res[item] = target[item]
    }
  })
  hash.set(obj, res)
  return res
}
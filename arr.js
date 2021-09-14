//去重

// function qx(arr) {
//   return arr.filter((item, index, arr) => arr.indexOf(item) === index)
// }

// console.log(qx([1, 2, 3, 2, 3, 4, 5, 4]))

// new Set()

//数组扁平化
// console.log([1, [2, [3]]].flat(2))

function flat(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flat([1, [2, [3]]]))

function flatten(arr) {
  var result = []
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result
}

;[].forEach((item, index, arr) => {})

Array.prototype.forEach2 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this) // this 就是当前的数组
  const len = O.length >>> 0 // 就是无符号右移 0 位，保证转换后的值为正整数。底层做了 2 层转换，第一是非 number 转成 number 类型，第二是将 number 转成 Uint32 类型
  let k = 0
  while (k < len) {
    if (k in O) {
      callback.call(thisArg, O[k], k, O)
    }
    k++
  }
}

Array.prototype.map2 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0

  const res = []
  let k = 0
  while (k < len) {
    if (k in O) {
      res[k] = callback.call(thisArg, O[k], k, O)
    }
    k++
  }
  return res
}

Array.prototype.filter2 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0

  const res = []
  let k = 0
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        res.push(O[k])
      }
    }
    k++
  }
  return res
}

Array.prototype.some2 = function (callback, thisArg) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0

  let k = 0
  while (k < len) {
    if (k in O) {
      if (callback.call(thisArg, O[k], k, O)) {
        return true
      }
    }
    k++
  }
  return false
}

Array.prototype.reduce2 = function (callback, initialValue) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== 'function') {
    throw new TypeError(callback + ' is not a function')
  }
  const O = Object(this)
  const len = O.length >>> 0

  let k = 0,
    acc
  if (initialValue) {
    acc = initialValue
  } else {
    while (k < len && !(k in O)) {
      k++
    }
    acc = O[k]
  }

  while (k < len) {
    if (k in O) {
      callback(acc, O[k], k, O)
    }
    k++
  }
  return acc
}

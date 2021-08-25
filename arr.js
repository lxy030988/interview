//去重

// function qx(arr) {
//   return arr.filter((item, index, arr) => arr.indexOf(item) === index)
// }

// console.log(qx([1, 2, 3, 2, 3, 4, 5, 4]))

// new Set()


//数组扁平化
// console.log([1, [2, [3]]].flat(2))

function flat(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}
console.log(flat([1, [2, [3]]]))

function flatten(arr) {
  var result = [];
  for (var i = 0, len = arr.length; i < len; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]))
    } else {
      result.push(arr[i])
    }
  }
  return result;
}
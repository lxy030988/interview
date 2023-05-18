//数组排序
const arr = [50, 25, 10, 5, 90, 60]

//冒泡排序
function bubbleSort(arr) {
  if (!arr || arr.length === 0) {
    return []
  }
  const len = arr.length
  for (let end = len - 1; end > 0; end--) {
    for (let i = 0; i < end; i++) {
      if (arr[i] > arr[i + 1]) {
        let temp = arr[i]
        arr[i] = arr[i + 1]
        arr[i + 1] = temp
      }
    }
  }

  return arr
}

console.log('bubbleSort', bubbleSort(arr))

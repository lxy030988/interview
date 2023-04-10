//睡眠算法
function sleepSort(arr) {
  return new Promise((resolve) => {
    const sortedArr = []
    let sortedCount = 0

    arr.forEach((num) => {
      setTimeout(() => {
        sortedArr.push(num)
        sortedCount++

        if (sortedCount === arr.length) {
          resolve(sortedArr)
        }
      }, num)
    })
  })
}

const arr = [50, 25, 10, 5, 90, 60]

sleepSort(arr).then((sortedArr) => {
  console.log('Sorted array:', sortedArr)
})

//优化：加速数字的醒来
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function sleepSort1(arr) {
  const sortedArr = []

  const processNumber = async (num) => {
    await sleep(num)
    sortedArr.push(num)
  }

  const promises = arr.map((num) => processNumber(num))
  await Promise.all(promises)

  return sortedArr
}

;(async () => {
  const sortedArr = await sleepSort1(arr)
  console.log('Sorted array:', sortedArr)
})()

async function sleepSort2(arr) {
  const minVal = Math.min(...arr)
  const sortedArr = []

  const processNumber = async (num) => {
    await sleep(num - minVal)
    sortedArr.push(num)
  }

  const promises = arr.map((num) => processNumber(num))
  await Promise.all(promises)

  return sortedArr
}

;(async () => {
  const sortedArr = await sleepSort2(arr)
  console.log('Sorted array:', sortedArr)
})()

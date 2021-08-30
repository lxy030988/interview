let imgList = [...document.querySelectorAll('img')]
let length = imgList.length
let deleteIndexList = []

function loadImg() {
  imgList.forEach((img, index) => {
    let rect = img.getBoundingClientRect()
    if (rect.top < window.innerHeight) {
      img.src = img.dataset.src
      deleteIndexList.push(index)
      count++
      if (count === length) {
        document.removeEventListener('scroll', loadImg)
      }
    }
  })
  imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
}

document.addEventListener('scroll', loadImg)

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'
class Promise1 {
  constructor(executor) {
    this.status = PENDING
    this.value = null
    this.fail = null
    this.resolvedCbs = []
    this.rejectedCbs = []

    const resolve = (v) => {
      if (this.status = PENDING) {
        this.value = v
        this.status = FULFILLED
        this.resolvedCbs.forEach(fn => fn())
      }
    }
    const reject = (v) => {
      if (this.status = PENDING) {
        this.fail = v
        this.status = REJECTED
        this.rejectedCbs.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }
  then(resolved, rejected) {
    try {
      if (this.status == FULFILLED) {
        console.log('FULFILLED')
        resolved(this.value)
      } else if (this.status == REJECTED) {
        rejected(this.fail)
      } else if (this.status == PENDING) {
        this.resolvedCbs.push(() => {
          resolved(this.value)
        })
        this.rejectedCbs.push(() => {
          rejected(this.fail)
        })
      }
    } catch (error) {
      rejected(error)
    }
  }
}

const p = new Promise1((resolve, reject) => {
  setTimeout(() => {
    resolve('成功')
  }, 1000)
})
p.then((v) => {
  console.log('then', v)
})
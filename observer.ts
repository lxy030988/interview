class Observer {
  tasks: (() => void)[] = []

  subscribe(fn: () => void) {
    this.tasks.push(fn)
  }

  publish() {
    if (this.tasks.length > 0) {
      const fn = this.tasks.shift()
      fn?.()
    }
  }
}

class LazyMan {
  private obs: Observer = new Observer()

  constructor(private name: string) {
    setTimeout(() => {
      this.obs.publish()
    }, 0)
  }

  sleepFirst(timeout: number) {
    this.obs.subscribe(() => {
      setTimeout(() => {
        this.obs.publish()
      }, timeout * 1000)
    })
    return this
  }

  eat(value: string) {
    this.obs.subscribe(() => {
      console.log(`Eat ${value}`)
      this.obs.publish()
    })
  }
}

function lazyMan(name: string) {
  return new LazyMan(name)
}

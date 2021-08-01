/**
 * 最重要一个概念
 * Monad 函子 不可分割的实体 没有嵌套
 */

class Monad {
  constructor(value) {
    this.value = value;
  }
  static of(value) {
    return new Monad(value);
  }
  map(fn) {
    return new Monad(fn(this.value));
  }
  join() {
    return this.value;
  }
  // 本来是函子的值是一个函子，把值取出来返回
  flatMap(fn) {
    //Functor.value=Functor.of(x+1)=Functor.of('a1')
    return this.map(fn).join();
  }
}

let r1 = Monad.of('a')
  .flatMap(x => Monad.of(x + 1))//Functor.of('a1')
  .flatMap(x => Monad.of(x + 2))//Functor.of('a12')
  .flatMap(x => Monad.of(x + 3))//Functor.of('a123')
console.log(r1.value);//a123
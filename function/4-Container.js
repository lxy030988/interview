//Container
// 如果一个对象内部能够持有一个值，我们就称它为一个容器

class Container {
  constructor(value) {
    this.value = value;
  }
}
let container = new Container(1);
console.log(container.value);

//Pointed Container
//如果一个容器里面有of方法，我们就称它为有指向的容器
//函数式编程，使用的时候要尽可能不要new对象
class PointedContainer {
  constructor(value) {
    this.value = value;
  }
  //写一个类似静态工厂方法的of方法，用来返回生产我想要的实例
  static of(value) {
    return new PointedContainer(value);
  }
}
let pointedContainer = PointedContainer.of(1);
console.log(pointedContainer.value);

/**
 * 函子有点像函数
 * 函数其实就是一个映射关系，可以把参数映射返回值
 * map也是映射的意思，可以把老的实例映射为一个新的实例
 * 也可叉是说可以把一个老的值，映射为一个新的值 
 */
class Functor {
  constructor(value) {
    this.value = value;
  }
  //写一个类似静态工厂方法的of方法，用来返回生产我想要的实例
  static of(value) {
    return new Functor(value);
  }
  //如果它还有一个map方法，可以接收一个函数，返回值还是一个同类型的对象，它就是函子
  //会提供map方法，接入各种运算的逻辑，从而引起值的变形或者说变化 
  map(fn) {
    // return new Functor(fn(this.value));
    return this.value ? new Maybe(fn(this.value)) : this;
  }
}
let functor = Functor.of(1)
  .map(x => x + 1)
  .map(x => x + 2)
  .map(x => x + 3)
console.log(functor);


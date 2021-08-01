const { compose } = require("lodash/fp");
let localStorage = {
  getItem(key) {
    if (key === 'data') {
      return `{"code":0,"userId":"1"}`;//服务器返回的结果 
    } else if (key === '1') {
      return `{"userId":"1","name":"张三","age":18}`;//用户ID为ID的用户详情
    }
  }
}
class IO {
  constructor(value) {
    this.value = value;
  }
  map(fn) {
    //compose把this.value和fn组合成一个新的函数
    //compose(parseJSON,()=>localStorage.getItem(key))=返回新函数
    return new IO(compose(fn, this.value));
  }
  flatMap(fn) {
    return new IO(compose(x => x.value(), fn, this.value));
  }
  start(callback) {
    callback(this.value());
  }
}
//
const readByKey = key => new IO(() => localStorage.getItem(key));//输入有副作用的
const parseJSON = str => JSON.parse(str);//纯的
const write = console.log;//输出 有副作用的
//IO 函子通过推迟执行的方式来实现对副作用的管理和隔离
//函数本身是纯的，但是函数IO执行是不纯的
let r1 = readByKey('data')
  .map(parseJSON)//到此为止是没有副作用的
  .map(x => x.userId)
  .flatMap(readByKey)
  .map(parseJSON)
  .start(write);//把执行进行了延迟，什么调用 start什么时候 执行



//先按过程式编程
function printUser() {
  let response = localStorage.getItem('data');//输入是一个副作用，依赖外部世界的，不可控
  let data = JSON.parse(response);
  const userId = data.userId;
  const user = localStorage.getItem(userId);
  console.log(user);//输出 把信息输出到控制，控制台有可能没有，output 也不可控
}
//printUser();
//函数式编程思维 ，把纯的逻辑收集封闭起来，然后把不纯的副作用操作交给用户处理

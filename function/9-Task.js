
/**
 * 函数式编程 new对象
 * static of 内部也是要new对象
 * 类和new 对象都不是必须的
 * 还可以通过闭包保存值
 * 实现map
 * @param {*} url 
 * @returns 
 */
const Task = execute => ({
  execute,
  //fn(x)=1
  map: fn => {
    //x => x.name
    return Task(resolve => execute(x => resolve(fn(x))))
  },
  flatMap: fn => {
    return Task(resolve => execute(x => {
      debugger
      return fn(x).execute((data) => {
        debugger
        return resolve(data);
      });
    }));
  }
})
function get(url) {
  if (url == 'data') {
    return Promise.resolve({ "code": 0, "userId": "1" });
  } else if (url === '1') {
    return Promise.resolve({ userId: 1, name: 'zhufeng' });
  }
}

const request = url => Task((resolve) => get(url).then(resolve));
request('data')
  .map(x => x.userId)
  .flatMap(request)
  .map(x => x.name)
  .execute(data => console.log(data));


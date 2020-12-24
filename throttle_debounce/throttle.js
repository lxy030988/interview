//节流
function throttle(fn, delay = 500) {
  let flag = true;
  return function (...args) {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, args);
      flag = true;
    }, delay);
  };
}

function throttle2(fn, delay = 500) {
  let preTime = Date.now();
  return function (...args) {
    const nowTime = Date.now();
    if (nowTime - preTime >= delay) {
      fn.apply(this, args);
      preTime = Date.now();
    }
  };
}

function throttle3(fn, delay = 500) {
  let preTime = Date.now(),
    timer = null;
  return function (...args) {
    const nowTime = Date.now();
    if (nowTime - preTime >= delay) {
      fn.apply(this, args);
      preTime = Date.now();
    } else {
      //时间还没到
      clearTimeout(timer);
      setTimeout(() => {
        preTime = Date.now();
        fn.apply(this, args);
      }, delay);
    }
  };
}
module.exports = { throttle }

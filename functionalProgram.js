//函数式编程

// 1、函数组合，组合多个函数步骤
function compose(f1, f2) {
  return function () {
    return f1.call(this, f2.apply(this, arguments));
  };
}

function fn1(str) {
  return str + "fn1";
}
function fn2(str) {
  return str + "fn2";
}

const fn = compose(fn1, fn2);
// console.log("fn", fn("111"));

//2、柯里化，将一个多参数函数转化为多个嵌套的单参数函数
function curry(curryfn) {
  const len = curryfn.length;
  return function fn(...rest) {
    if (rest.length < len) {
      return fn.bind(null, ...rest);
    } else {
      return curryfn.apply(null, rest);
    }
  };
}

function add(a, b, c, d) {
  return a + b + c + d;
}

// console.log("curry", curry(add)(1)(2)(3)(4));

// 3、偏函数，缓存一部分参数，然后让另一些参数在使用时传入
function type(type) {
  return function (data) {
    return Object.prototype.toString.call(data) === `[object ${type}]`;
  };
}

const isObject = type("Object");
const isString = type("String");

console.log(isObject({}), isObject(1));
console.log(isString({}), isString(1), isString(""));

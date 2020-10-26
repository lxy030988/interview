/**
 *  array.reduce((t, v, i, a) => {}, initValue)
 * 
    参数
    callback：回调函数(必选)
    initValue：初始值(可选)

    回调函数的参数
    total(t)：累计器完成计算的返回值(必选)
    value(v)：当前元素(必选)
    index(i)：当前元素的索引(可选)
    array(a)：当前元素所属的数组对象(可选)

 */

//代替map和filter
const arr = [0, 1, 2, 3, 4];
const a = arr.reduce((p, n) => (n * 2 > 2 ? [...p, n * 2] : p), []);
// console.log(a);

//数组分割
function Chunk(arr = [], size = 1) {
  // return arr.length
  //   ? arr.reduce(
  //       (t, v) => (
  //         t[t.length - 1].length === size
  //           ? t.push([v])
  //           : t[t.length - 1].push(v),
  //         t
  //       ),
  //       [[]]
  //     )
  //   : [];

  if (arr.length === 0) return [];
  return arr.reduce(
    (p, n) => {
      // console.log("p", p, n);
      if (p[p.length - 1].length === size) {
        p.push([n]);
      } else {
        p[p.length - 1].push(n);
      }
      return p;
    },
    [[]]
  );
}
console.log(Chunk(arr, 4));

// 数组过滤
function Difference(arr = [], arr2 = []) {
  return arr.reduce((t, v) => (!arr2.includes(v) && t.push(v), t), []);
}
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [2, 3, 6];
Difference(arr1, arr2); // [1, 4, 5]

// 数组填充
function Fill(arr = [], val = "", start = 0, end = arr.length) {
  if (start < 0 || start >= end || end > arr.length) return arr;
  return [
    ...arr.slice(0, start),
    ...arr.slice(start, end).reduce((t, v) => (t.push(val || v), t), []),
    ...arr.slice(end, arr.length),
  ];
}
const arr = [0, 1, 2, 3, 4, 5, 6];
Fill(arr, "aaa", 2, 5); // [0, 1, "aaa", "aaa", "aaa", 5, 6]

// 数组扁平
function Flat(arr = []) {
  return arr.reduce((t, v) => t.concat(Array.isArray(v) ? Flat(v) : v), []);
}
const arr = [0, 1, [2, 3], [4, 5, [6, 7]], [8, [9, 10, [11, 12]]]];
Flat(arr); // [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// 数组去重
function Uniq(arr = []) {
  return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), []);
}
const arr = [2, 1, 0, 3, 2, 1, 2];
Uniq(arr); // [2, 1, 0, 3]

// 数组最大最小值
function Max(arr = []) {
  return arr.reduce((t, v) => (t > v ? t : v));
}
function Min(arr = []) {
  return arr.reduce((t, v) => (t < v ? t : v));
}
const arr = [12, 45, 21, 65, 38, 76, 108, 43];
Max(arr); // 108
Min(arr); // 12

// 数组成员独立拆解
function Unzip(arr = []) {
  return arr.reduce(
    (t, v) => (v.forEach((w, i) => t[i].push(w)), t),
    Array.from({ length: Math.max(...arr.map((v) => v.length)) }).map((v) => [])
  );
}
const arr = [
  ["a", 1, true],
  ["b", 2, false],
];
Unzip(arr); // [["a", "b"], [1, 2], [true, false]]

// 对数组成员个数进行统计
function Count(arr = []) {
  return arr.reduce((t, v) => ((t[v] = (t[v] || 0) + 1), t), {});
}

const arr = [0, 1, 1, 2, 2, 2];
Count(arr); // { 0: 1, 1: 2, 2: 3 }

// 对数组成员位置进行记录
function Position(arr = [], val) {
  return arr.reduce((t, v, i) => (v === val && t.push(i), t), []);
}
const arr = [2, 1, 5, 4, 2, 1, 6, 6, 7];
Position(arr, 2); // [0, 4]

// 对数组成员特性进行分组
function Group(arr = [], key) {
  return key
    ? arr.reduce(
        (t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t),
        {}
      )
    : {};
}
const arr = [
  { area: "GZ", name: "YZW", age: 27 },
  { area: "GZ", name: "TYJ", age: 25 },
  { area: "SZ", name: "AAA", age: 23 },
  { area: "FS", name: "BBB", age: 21 },
  { area: "SZ", name: "CCC", age: 19 },
]; // 以地区area作为分组依据
Group(arr, "area"); // { GZ: Array(2), SZ: Array(2), FS: Array(1) }

// 对数组成员包含的关键字进行统计
function Keyword(arr = [], keys = []) {
  return keys.reduce(
    (t, v) => (arr.some((w) => w.includes(v)) && t.push(v), t),
    []
  );
}
const text = [
  "今天天气真好，我想出去钓鱼",
  "我一边看电视，一边写作业",
  "小明喜欢同桌的小红，又喜欢后桌的小君，真TM花心",
  "最近上班喜欢摸鱼的人实在太多了，代码不好好写，在想入非非",
];
const keyword = ["偷懒", "喜欢", "睡觉", "摸鱼", "真好", "一边", "明天"];
Keyword(text, keyword); // ["喜欢", "摸鱼", "真好", "一边"]

// 字符串翻转
function ReverseStr(str = "") {
  return str.split("").reduceRight((t, v) => t + v);
}
const str = "reduce最牛逼";
ReverseStr(str); // "逼牛最ecuder"

// 累加累乘
function Accumulation(...vals) {
  return vals.reduce((t, v) => t + v, 0);
}
function Multiplication(...vals) {
  return vals.reduce((t, v) => t * v, 1);
}
Accumulation(1, 2, 3, 4, 5); // 15
Multiplication(1, 2, 3, 4, 5); // 120

// 异步累计
async function AsyncTotal(arr = []) {
  return arr.reduce(async (t, v) => {
    const at = await t;
    const todo = await Todo(v);
    at[v] = todo;
    return at;
  }, Promise.resolve({}));
}
const result = await AsyncTotal(); // 需在async包围下使用

// 斐波那契数列
function Fibonacci(len = 2) {
  const arr = [...new Array(len).keys()];
  return arr.reduce((t, v, i) => (i > 1 && t.push(t[i - 1] + t[i - 2]), t), [
    0,
    1,
  ]);
}
Fibonacci(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

// 返回对象指定的键值
function GetKeys(obj = {}, keys = []) {
  return Object.keys(obj).reduce(
    (t, v) => (keys.includes(v) && (t[v] = obj[v]), t),
    {}
  );
}
const target = { a: 1, b: 2, c: 3, d: 4 };
const keyword = ["a", "d"];
GetKeys(target, keyword); // { a: 1, d: 4 }

// 权重求和
const score = [
  { score: 90, subject: "chinese", weight: 0.5 },
  { score: 95, subject: "math", weight: 0.3 },
  { score: 85, subject: "english", weight: 0.2 },
];
const result = score.reduce((t, v) => t + v.score * v.weight, 0); // 90.5

// 数组转对象
const people = [
  { area: "GZ", name: "YZW", age: 27 },
  { area: "SZ", name: "TYJ", age: 25 },
];
const map = people.reduce((t, v) => {
  const { name, ...rest } = v;
  t[name] = rest;
  return t;
}, {}); // { YZW: {…}, TYJ: {…} }

// Redux Compose函数原理
function Compose(...funs) {
  if (funs.length === 0) {
    return (arg) => arg;
  }
  if (funs.length === 1) {
    return funs[0];
  }
  return funs.reduce((t, v) => (...arg) => t(v(...arg)));
}

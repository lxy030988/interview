module.exports = {
  compile(template) {
    // 转换template
    // 希望输出：<b>${key}</b>
    // 返回我们的generate函数

    // (.+?)可以匹配多个 {{name}}  (.+)只能匹配单个 {{name}}
    // (.+)默认是贪婪匹配   (.+?) 为惰性匹配
    template = template.replace(/\{\{(.+?)\}\}/g, function () {
      // console.log(arguments);
      const key = arguments[1].trim();
      return "${" + key + "}";
    });

    const body =
      "let str = ''; with(obj) { str += `" + template + "`} return str";
    return new Function("obj", body);
  },
};

// let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
// let data = {
//   name: '姓名',
//   age: 18
// }
// render(template, data); // 我是姓名，年龄18，性别undefined

// function render(template, data) {
//   const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
//   if (reg.test(template)) { // 判断模板里是否有模板字符串
//     console.log(reg.exec(template))
//     const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
//     template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
//     return render(template, data); // 递归的渲染并返回渲染后的结构
//   }
//   return template; // 如果模板没有模板字符串直接返回
// }

// function render(template, data) {
//   //   /\{\{(\w+)\}\}/ === /\{\{(.+?)\}\}/
//   const reg = /\{\{(\w+)\}\}/g
//   template = template.replace(reg, function (x) {
//     console.log(arguments, x)
//     return data[arguments[1]]
//   })
//   console.log(template)
//   // console.log(reg.exec(template))
// }

// let s1 = "get-element-by-id"

// s1 = s1.replace(/-\w/g, function (x) {
//   console.log(x)
//   return x[1].toUpperCase()
// })
// console.log(s1)

// 查找字符串中出现最多的字符和个数  先排序再正则匹配
let s2 = 'aaabbbbbcccccccc'
s2.replace(/(\w)\1+/g, function () {
  console.log(arguments)
})

function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}

module.exports = {
  compile(template) {
    // 转换template
    // 希望输出：<b>${key}</b>
    // 返回我们的generate函数

    // (.+?)可以匹配多个 {{name}}  (.+)只能匹配单个 {{name}}
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

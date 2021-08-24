let a = '1ab2csd321sdwd456'

function isContain(a, b) {
  for (let i in b) {
    if (a[0] === b[i]) {
      let tmp = true
      for (let j in a) {
        if (a[j] !== b[~~i + ~~j]) {
          tmp = false
        }
      }
      if (tmp) {
        return i
      }
    }
  }
  return -1
}


//实现千位分隔符 string.replace(/\B(?=(\d{3})+(?!\d))/g, ",")  /\B(?=(\d{3})+\b)/g
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer + '.' + (decimal ? decimal : '');
}

function isPhone(tel) {
  var regx = /^1[34578]\d{9}$/;
  return regx.test(tel);
}
function isEmail(email) {
  var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-])+$/;
  return regx.test(email);
}

function isCardNo(number) {
  var regx = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return regx.test(number);
}


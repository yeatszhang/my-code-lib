/**
 * 判断是否为空
 * @param val
 */
function isEmpty(val) {
  return (val === undefined || val === null || val === '');
}

function isString(val){
  return typeof val === 'string';
}

/**
 * 检测首尾空格
 * @param val {string}
 */
function startEndWithSpace(val) {
  if(!isString(val))
    return false;

  return (val.indexOf(' ') === 0 || val.lastIndexOf(' ') === val.length - 1);
}

/**
 * 检测括号是否成对出现
 * @param string {string}
 */
function isBracketTwice(string) {
  if(!isString(string))
    return false;

  var leftBracket = ['(', '（', '{', '[', '<'],
    rightBracket = [')', '）', '}', ']', '>'],
    stack = [],
    top,
    char;

  for (var i = 0; i < string.length; i++) {
    char = string[i];

    if (leftBracket.indexOf(char) > -1) {
      stack.push(char);
    } else if (rightBracket.indexOf(char) > -1) {
      top = stack.pop();
      // 判断与栈顶括号是否匹配
      if (leftBracket.indexOf(top) !== rightBracket.indexOf(char)) {
        return false;
      }
    }
  }

  return stack.length === 0;
}

/**
 * 必须为数字形式
 * @param val {string}
 */
function isNumberLike(val) {
  if(!isString(val))
    return false;

  val = Number(val);
  return !isNaN(val);
}

/**
 * 必须为整数形式
 * @param val {string}
 */
function isIntLike(val) {
  if(!isString(val))
    return false;

  return parseInt(val) == val;
}

/**
 * 商店号码
 * @param string {string}
 */
function isShopPhone(string) {
  if(!isString(string))
    return false;

  var reg = /^[0-9\-\/]+$/;

  string = string.replace(/[\{\}<>\(\)\[\]（）]/g, '');
  return reg.test(string);
}

/**
 * 判断是否为02:10形式的时间
 * @param string
 * @returns {boolean}
 * @param format 'hh:mm' 'hh:mm:ss'
 */
function isTime(string, format){
  format = format || 'hh:mm:ss';
  var reg;

  if(isEmpty(string)){
    return false;
  }

  switch (format){
    case 'hh:mm':
      reg = /^(0\d|1\d|2[0-3]):[0-5]\d$/;
      break;
    case 'hh:mm:ss':
      reg = /^(0\d|1\d|2[0-3]):[0-5]\d:[0-5]\d$/;
      break;
  }

  return !!reg.test(string);
}

/**
 *
 * @param val
 * @param number
 */
function isDecimal(val, number){
  var reg;

  if(isEmpty(val)){
    return false;
  }
  reg = new RegExp('^\\d+(\\.\\d{1,'+ number +'})?$');
  return !!reg.test(val);
}

module.exports = {
  isEmpty: isEmpty,
  startEndWithSpace: startEndWithSpace,
  isBracketTwice: isBracketTwice,
  isNumberLike: isNumberLike,
  isIntLike: isIntLike,
  isShopPhone: isShopPhone,
  isTime: isTime,
  isDecimal: isDecimal
};
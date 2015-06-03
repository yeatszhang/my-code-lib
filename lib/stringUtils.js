/**
 * Created by yichizhang on 15/6/2.
 */
function formatNumber (str) {
  var endplace = 0;
  if (isNaN(str)) {
    return str;
  }
  str += "";
  endplace = str.indexOf('.');
  if (endplace == -1) {
    if (str.length <= 3) {
      return str;
    } else {
      return formatNumber(str.substr(0, str.length - 3)) + ',' + str.substr(str.length - 3);
    }
  } else {
    if (str.length <= 3 + str.substr(endplace).length) {
      return str;
    } else {
      return formatNumber(str.substr(0, endplace - 3)) + ',' + str.substr(endplace - 3);
    }
  }
};



/**
 * 将byte转化为合适的单位，返回字符串
 * @param byte
 * @returns {string}
 */
function transByte(parameter) {
  var unitList = ['B', 'KB', 'MB', 'GB', 'TB'];
  var temp = 0;
  if (typeof parameter != 'number') {
    parameter = Number(parameter);
  }
  if (isNaN(parameter)) {
    return '';
  } else {
    while (parameter >= 1024) {
      parameter = parameter / 1024;
      temp++;
    }
    if (Number.isInteger(parameter)) {
      return parameter + unitList[temp];
    } else {
      return parameter.toFixed(2) + unitList[temp];
    }
  }

}

/**
 * number转为带百分号的字符串
 * @param number
 */
function transNumToPercent(number) {
  if (typeof number === 'number') {
    return (number * 100).toFixed(2) + '%';
  } else {
    return 0;
  }
}

function transNum(num) {
  str = "" + num;
  if (num > 100000000) {
    str = formatNumber("" + decimal(num / 100000000, 2)).replace(',.', '.') + " 亿";
  } else if (num > 10000) {
    //if (num > 10000){
    str = formatNumber("" + Math.ceil(num / 10000)).replace(',.', '.') + " 万";
  }
  return formatNumber(str);
};
/**
 * Created by yichizhang on 15/6/2.
 */

var decimal = function (num, v) {
  var vv = Math.pow(10, v);
  return Math.round(num * vv) / vv;
};

var avg = function (val) {
  var sum = 0;
  for (var index in val) {
    sum += parseInt(val[index].value);
  }
  return val.length > 0 ? sum / val.length : 0;
};
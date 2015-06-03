/**
 *@ params data: 数组 每条记录都是一个map
 *@ params k
 *@ params v
 */
function getMap (data, k, v) {
  var key = (k == undefined ? 'd_datetime' : k);
  var value = (v == undefined ? 'm_pv' : v);
  var datas = {};
  if (data == undefined) {
    datas;
  }
  if (data instanceof Array) {
    for (var index in data) {
      datas[data[index][key]] = data[index][value];
    }
  }

  return datas;
}

/**
 * @ params data 数据 每条记录都是一个map
 * @ params 聚合的维度
 */
function getTree (datas, array) {
  if (array.length == 0) {
    var data = {};
    for (var i in datas) {
      for (var j in datas[i]) {
        data[j] = datas[i][j];
      }
    }
    return data;
  }
  var result = {};
  for (var index in datas) {
    var data = datas[index];
    var k = data[array[0]];
    var child = result[k];
    if (child == undefined) {
      child = new Array;
    }
    delete data[array[0]];
    child.push(data);
    result[k] = child;
  }
  for (var index in result) {
    result[index] = getTree(result[index], array.slice(1));
  }
  return result;
}

/**
 *@ params data: 对结果求和
 *@ params isavg 是否求平均
 *@ params k 汇总的维度
 *@ params v 汇总的度量
 */
function getMapSum (data, isavg, k, v) {
  var key = (k == undefined ? 'd_datetime' : k);
  var value = (v == undefined ? 'm_pv' : v);
  var datas = {};
  if (data == undefined) {
    return datas;
  }
  if (data instanceof Array) {
    for (var index in data) {
      if (typeof(datas[data[index][key]]) == undefined || datas[data[index][key]] == undefined) {
        datas[data[index][key]] = 0;
      }
      datas[data[index][key]] += data[index][value];
    }
  }
  if (isavg) {
    $.each(datas, function (key, value) {
      datas[key] = parseInt(value / data.length);
    });
  }
  return datas;
};

// 第一行为label，根据第一行返回collection
function conventCsvToMap(csv) {
  var lines = csv.split('\n');
  var labelArr = lines[0].split(',');
  var result = [];

  for (var i = 1; i < lines.length; i++) {
    var object = {};
    var temp = lines[i].split(',');
    for (var j = 0; j < temp.length; j++) {
      object[labelArr[j] + ''] = temp[j];
    }
    result.push(object);
  }
  return result;
}


module.exports = {
  getMap: getMap,
  getTree: getTree,
  getMapSum: getMapSum
}


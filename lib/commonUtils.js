/**
 * Created by yichizhang on 15/6/2.
 */


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

function isEmpty(obj) {

  // null and undefined are "empty"
  if (obj == null) return true;

  // Assume if it has a length property with a non-zero value
  // that that property is correct.
  if (obj.length > 0)    return false;
  if (obj.length === 0)  return true;

  // Otherwise, does it have any properties of its own?
  // Note that this doesn't handle
  // toString and valueOf enumeration bugs in IE < 9
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false;
  }

  return true;
}

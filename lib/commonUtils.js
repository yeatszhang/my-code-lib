/**
 * Created by yichizhang on 15/6/2.
 */

/**
 * 根据superagent的返回值得到错误信息
 * @param err
 * @param res
 * @returns {string} 若没有错误则返回空字符串
 */
function getError(err, res){

  if(err){
    return err.toString();
  }

  if(res.error){
    return 'response error';
  }

  if(res.body == null){
    return 'response error';
  }

  if(res.body.error){
    return res.body.error.message;
  }

  if(!res.body.data){
    return '返回数据为空';
  }

  return '';
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

/**
 * 插入link标签
 * @param url {string} 标签href
 * @param isPrepend {boolean} 是否在前面插入
 */
function insertLink(url, isPrepend) {
  var elem = document.createElement('link');
  elem.setAttribute('rel', 'stylesheet');
  elem.setAttribute('type', 'text/css');
  elem.setAttribute('href', url);

  var head = document.getElementsByTagName('head')[0];
  if (isPrepend) {
    head.insertBefore(elem, head.childNodes[0]);
  } else {
    head.appendChild(elem);
  }
}
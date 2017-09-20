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
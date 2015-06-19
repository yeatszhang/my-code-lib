var querystring = require('querystring');

// 打印信息到控制台
function log(message) {
  if (typeof  console == 'object') {
    console.log(message);
  } else if (typeof opera == 'object') {
    opera.postError(message);
  } else if (typeof java == 'object' && typeof java.lang == 'object') {
    java.lang.System.out.println(message);
  }
}

/**
 *
 * @param stringList {Array}
 * @param type {string} ex: 'text/csv'
 * @param filename {string}
 */
function downloadFile(stringList, type, filename) {
  var aLink = document.createElement('a');
  var blob = new Blob(['\ufeff'].concat(stringList), {type: type});
  var evt = document.createEvent("HTMLEvents");

  evt.initEvent('click');

  aLink.download = filename;
  aLink.href = URL.createObjectURL(blob);
  aLink.dispatchEvent(evt);
}

/**
 *
 * @param callback {function}
 * @param isMultiple
 * @example fileUpload(function(files))
 */
function fileUpload (callback, isMultiple) {
  var $fileinptDom = document.createElement('input');
  var evObj = document.createEvent('MouseEvents');

  if(callback == undefined){
    callback = function(){};
  }

  if(isMultiple == true){
    $fileinptDom.setAttribute('multiple', 'multiple');
  }

  $fileinptDom.setAttribute('type', 'file');

  $fileinptDom.addEventListener('change', e => {
    callback(e.target.files);
  });

  evObj.initEvent('click', true, false);
  $fileinptDom.dispatchEvent(evObj);
}

/**
 * 将Url以及Url中的para进行url编码并组装
 * @param url {string}
 * @param para {Object}
 * @returns {string}
 */
function getUrlByPara(url, para) {
  var name, value;
  var paraStrArr = [];

  for (var key in para) {
    if (para[key]) {
      name = encodeURIComponent(key);
      value = encodeURIComponent(para[key]);
      paraStrArr.push(name + '=' + value);
    }
  }
  return url + '?' + paraStrArr.join('&');
}

function getParams(){
  return querystring.parse(window.location.search.substr(1));
}

// 获得页面参数对象
function getQueryStringArgs() {
  // 取得查询字符串并去掉开头的问号
  var qs = (location.search.length > 0 ? location.search.substring(1) : "");
  var args = {};
  var items = qs.length ? qs.split('&') : [],
    item = null,
    name = null,
    value = null,
    i = 0,
    len = items.length;
  for (i = 0; i < len; i++) {
    item = items[i].split('=');
    name = decodeURIComponent(item[0]);
    value = decodeURIComponent(item[1]);

    if (name.length) {
      args[name] = value;
    }
  }

  return args;
}

// 得到浏览器长宽
function getViewport() {
  if (document.compatMode == "BackCompat") {
    return {
      width: document.body.clientWidth,
      height: document.body.clientHeight
    }
  } else {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  }
}

function getPagearea() {
  if (document.compatMode == "BackCompat") {
    return {
      width: Math.max(document.body.scrollWidth,
        document.body.clientWidth),
      height: Math.max(document.body.scrollHeight,
        document.body.clientHeight)
    }
  } else {
    return {
      width: Math.max(document.documentElement.scrollWidth,
        document.documentElement.clientWidth),
      height: Math.max(document.documentElement.scrollHeight,
        document.documentElement.clientHeight)
    }
  }
}

// 得到绝对位置 
function getElementLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

function getElementTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

// 相对于浏览器的位置
function getElementViewLeft(element) {
  var actualLeft = element.offsetLeft;
  var current = element.offsetParent;
  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    var elementScrollLeft = document.body.scrollLeft;
  } else {
    var elementScrollLeft = document.documentElement.scrollLeft;
  }
  return actualLeft - elementScrollLeft;
}

function getElementViewTop(element) {
  var actualTop = element.offsetTop;
  var current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  if (document.compatMode == "BackCompat") {
    var elementScrollTop = document.body.scrollTop;
  } else {
    var elementScrollTop = document.documentElement.scrollTop;
  }
  return actualTop - elementScrollTop;
}
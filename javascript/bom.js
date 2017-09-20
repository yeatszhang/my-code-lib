export function safeOpen (url) {
  const otherWindow = window.open()
  otherWindow.opener = null
  otherWindow.location = url
}

/**
 * 字符串导出为文件
 * @param value {string} 待写入的文件内容
 * @param name {string} 文件名
 * @param fileType {string} 文件后缀名
 * @param isString {boolean} 是否String类型，如果不是则调用JSON.stringify方法
 * @param type 字符编码  导入为excel默认编码应该是utf-16
 */
export function doSaveFile(value, name, fileType, type) {
  let blob
  type = type || 'text/plain;charset=utf-8'
  fileType = fileType || 'json'
  name = name + '.' + fileType

  if (typeof window.Blob === 'function') {
    const BOM = '\uFEFF'
    blob = new Blob([BOM + value], {
      type: type
    })
  } else {
    var BlobBuilder = window.BlobBuilder || window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder
    var bb = new BlobBuilder()
    bb.append(value)
    blob = bb.getBlob(type)
  }
  var URL = window.URL || window.webkitURL
  var bloburl = URL.createObjectURL(blob)
  var anchor = document.createElement('a')
  if ('download' in anchor) {
    anchor.href = bloburl
    anchor.download = name
    anchor.innerHTML = name
    document.body.appendChild(anchor)
    var evt = document.createEvent('MouseEvents')
    evt.initEvent('click', false, false)
    anchor.dispatchEvent(evt)
    document.body.removeChild(anchor)
  } else if (navigator.msSaveBlob) {
    navigator.msSaveBlob(blob, name)
  } else {
    location.href = bloburl
  }
}

/**
 * 上传文件  通过动态创建input file 标签
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
 * html编码
 * @param {string} s
 * @return {string}
 */
function htmlencode(s){
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(s));
  return div.innerHTML;
}

/**
 * html解码
 * @param {string} s
 * @return {string}
 */
function htmldecode(s){
  var div = document.createElement('div');
  div.innerHTML = s;
  return div.innerText || div.textContent;
}

/**
 * url路径参数安全编码 主要用于rest请求中路径参数
 * @param {string} url
 * @param {object} params
 * @return {string} new url
 */
function urlCompile(url, params) {
  const compiled = _.template(url, {
    interpolate: /\${([\s\S]+?)}/g
  })
  const newParam = {}
  _.forEach(params, (val, key) => {
    newParam[key] = encodeURIComponent(val)
  })
  return compiled(params)
}
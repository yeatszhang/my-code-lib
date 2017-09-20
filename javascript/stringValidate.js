import validator from 'validator'

function isIp (str) {
  return validator.isIP(str, 4) || validator.isIP(str, 6)
}

function isDomain (str) {
  if (this.isIp(str)) {
    return false
  }
  const reg = /^[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62}){0,10}(\.[a-zA-Z0-9][-a-zA-Z0-9]{1,15})$/i
  return reg.test(str.toLowerCase())
}

function isMD5 (str) {
  return validator.isMD5(str)
}

function isIMEI (str) {
  const reg = /^[a-zA-Z0-9]{14,15}$/i
  return reg.test(str)
}

function isESID (str) {
  const reg = /^[a-z0-9]{34}$/i
  return reg.test(str)
}

function isEmail (str) {
  return validator.isEmail(str)
}

function isURL (str) {
  return validator.isURL(str)
}
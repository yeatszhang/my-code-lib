/**
 * @class 顺序获取器
 */
class OrderGetter {
  constructor (values) {
    this._index = 0
    this._values = values
  }

  reset () {
    this._index = 0
  }

  get () {
    const result = this._values[this._index++]
    if (this._index >= this._values.length) this._index = 0
    return result
  }
}
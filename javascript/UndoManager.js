/**
 * @class 撤销管理器
 */
export default class UndoManager {
  constructor ({ undoFunc, redoFunc, limit }) {
    this._histories = []
    this._index = -1
    // 为null则是不做限制
    this._limit = limit || null
    this._undoFunc = undoFunc || noop
    this._redoFunc = redoFunc || noop
  }

  add (history) {
    // if we are here after having called undo,
    // invalidate items higher on the stack
    this._histories.splice(this._index + 1, this._histories.length - this._index)
    this._histories.push(history)

    if (this._limit && this._histories.length > this._limit) {
      this._histories.splice(0, this._histories.length - this._limit)
    }

    // set the current index to the end
    this._index = this._histories.length - 1
  }

  undo (step = 1) {
    let history
    while (step > 0) {
      history = this._histories[this._index]
      if (!history) {
        return
      }
      this._undoFunc(history)
      this._index -= 1
      step -= 1
    }
  }

  redo (step = 1) {
    let history
    while (step > 0) {
      history = this._histories[this._index + 1]
      if (!history) {
        return
      }
      this._redoFunc(history)
      this._index += 1
      step -= 1
    }
  }
  undoDisable () {
    return this._index <= -1
  }
  redoDisable () {
    return this._index >= this._histories.length - 1
  }
  clear () {
    this._histories = []
    this._index = -1
  }
}

function noop () {}
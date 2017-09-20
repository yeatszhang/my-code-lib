export default {
  bind () {
    this.documentHandler = (e) => {
      if (this.el.contains(e.target)) {
        return false
      }
      // 如果回调函数表达式存在 则执行回调函数
      if (this.expression) {
        this.vm[this.expression]()
      }
    }
    document.addEventListener('click', this.documentHandler)
  },
  update () {

  },
  unbind () {
    document.removeEventListener('click', this.documentHandler)
  }
}
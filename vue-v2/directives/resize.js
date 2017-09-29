export default {
  bind () {
    this.documentHandler = (e) => {
      if (this.expression) {
        console.log(this.expression)
        this.vm[this.expression]()
      }
    }
    window.addEventListener('resize', this.documentHandler)
  },
  update () {},
  unbind () {
    window.removeEventListener('resize', this.documentHandler)
  }
}

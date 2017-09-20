import Popper from 'popper.js'
import _ from 'lodash'

class PopperManager {
  constructor (el) {
    this.popperJS = null
    this._el = el
  }
  createPopper (text, options) {
    if (!/^(top|bottom|left|right)(-start|-end)?$/g.test(options.placement)) {
      return
    }

    this.$tip = document.createElement('div')
    this.$tip.innerHTML = `
    <div class="tooltip-arrow tooltip-arrow--${options.placement}"></div>
    <div class="tooltip-inner">${text}</div>
    `
    this.$tip.className = 'skyeye-vis-tooltip animated'
    document.body.appendChild(this.$tip)
    this.popperJS = new Popper(this._el, this.$tip, Object.assign(options, {
      modifiers: {
        preventOverflow: {
          enabled: true,
          boundariesElement: document.body,
          priority: ['right', 'left', 'bottom', 'top']
        },
        computeStyle: {
          gpuAcceleration: false
        }
      }
    }))
  }
  doDestroy () {
    if (this.popperJS) {
      this.popperJS.destroy()
    }
    if (this.$tip && this.$tip.parentNode === document.body) {
      document.body.removeChild(this.$tip)
    }
    this.popperJS = null
  }
}

const tooltip = {
  bind: function () {
    this.popper = new PopperManager(this.el)
    this.options = {
      // top|bottom|left|right
      placement: 'bottom'
    }
    this.onMouseEnter = () => {
      const _this = this
      if (this._timeout) {
        clearTimeout(this._timeout)
      }
      this._timeout = setTimeout(() => {
        if (_this.popper) {
          _this.popper.createPopper(_this.text, _this.options)
        }
      }, this.delay)
    }
    this.onMouseLeave = () => {
      if (this._timeout) {
        clearTimeout(this._timeout)
      }
      this.popper.doDestroy()
    }
    this.el.addEventListener('mouseenter', this.onMouseEnter)
    this.el.addEventListener('mouseleave', this.onMouseLeave)
  },
  update: function (newValue) {
    this.delay = newValue.delay || 800
    this.text = newValue.text || ''
    this.options = Object.assign(this.options, _.omit(newValue, ['delay', 'text']))
  },
  unbind: function () {
    this.el.removeEventListener('mouseenter', this.onMouseEnter)
    this.el.removeEventListener('mouseleave', this.onMouseLeave)
    this.popper = null
    this.options = null
    this.$tip = null
    this.onMouseEnter = null
    this.onMouseLeave = null
  }
}

export default tooltip
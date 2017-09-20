import Vue from 'vue'
import Modal from './modal.vue'

const prefixCls = 'modal-confirm'
let modalInstance

function newInstance () {
  const div = document.createElement('div')
  div.innerHTML = `
      <modal 
        :mask-closable="maskClosable" 
        :esc-closable="escClosable" 
        :container-style="style" 
        :title="title" 
        :show="visible"
        :ok-text="okText"
        :cancel-text="cancelText"
        :show-footer="true"
        :show-cancel="showCancel"
        @ok="ok"
        @cancel="cancel">
          <div class="${prefixCls}">
            <div class="${prefixCls}-body">
                <i :class="iconNameCls"></i>
                <span style="vertical-align: middle">{{{ body }}}</span>
            </div>
          </div>
      </modal>
    `
  document.body.appendChild(div)

  const modal = new Vue({
    el: div,
    components: {
      modal: Modal
    },
    data: {
      style: { width: '417px' },
      title: '',
      body: '',
      onOk: () => {
      },
      onCancel: () => {
      },
      okText: '确定',
      cancelText: '取消',
      // 为true时 点击确认后按钮会进入loading状态
      loading: false,
      // no props
      buttonLoading: false,
      showCancel: false,
      type: 'info',
      escClosable: false,
      maskClosable: false,
      visible: false
    },
    computed: {
      iconNameCls () {
        return [
          `${prefixCls}--icon`,
          `${prefixCls}--icon__${this.type}`
        ]
      }
    },
    methods: {
      cancel () {
        this.visible = false
        this.buttonLoading = false
        this.onCancel()
        this.remove()
      },
      ok () {
        if (this.loading) {
          this.buttonLoading = true
        } else {
          this.visible = false
          this.remove()
        }
        this.onOk()
      },
      remove () {
        setTimeout(() => {
          this.destroy()
        }, 300)
      },
      destroy () {
        this.$destroy()
        document.body.removeChild(div)
        this.onRemove()
      },
      onRemove () {
      }
    }
  }).$children[0]

  return {
    show (props) {
      Object.assign(modal.$parent, props)
      modal.$parent.visible = true
    },
    remove () {
      modal.$parent.visible = false
      modal.$parent.buttonLoading = false
      modal.$parent.remove()
    },
    component: modal
  }
}

function getModalInstance () {
  modalInstance = modalInstance || newInstance()
  return modalInstance
}

function confirm (options) {
  let instance = getModalInstance()

  options.onRemove = function () {
    modalInstance = null
  }

  instance.show(options)
}

Modal.info = function (props = {}) {
  props.type = 'info'
  props.showCancel = false
  return confirm(props)
}

Modal.success = function (props = {}) {
  props.type = 'success'
  props.showCancel = false
  return confirm(props)
}

Modal.warning = function (props = {}) {
  props.type = 'warning'
  props.showCancel = false
  return confirm(props)
}

Modal.error = function (props = {}) {
  props.type = 'error'
  props.showCancel = false
  return confirm(props)
}

Modal.confirm = function (props = {}) {
  props.type = 'confirm'
  props.showCancel = true
  return confirm(props)
}

Modal.remove = function () {
  if (!modalInstance) {   // at loading status, remove after Cancel
    return false
  }

  const instance = getModalInstance()

  instance.remove()
}

export default Modal

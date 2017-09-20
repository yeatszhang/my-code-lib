<template>
  <div class="modal-mask" @click="maskClick" v-show="show" transition="modal">
    <div class="modal-container" @click.stop :style="containerStyle">
      <div class="modal-header">
        <span class="modal-title">{{title}}</span>
        <button v-if="escClosable" class="close" @click="onCancel">
          <svg class="icon-close" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" preserveAspectRatio="xMidYMid" width="11.312" height="11.312" viewBox="0 0 11.312 11.312">
            <path d="M11.313,9.899 L9.899,11.313 L5.656,7.070 L1.413,11.313 L-0.001,9.899 L4.242,5.656 L-0.001,1.413 L1.413,-0.001 L5.656,4.242 L9.899,-0.001 L11.313,1.413 L7.070,5.656 L11.313,9.899 Z" class="cls-1"/>
          </svg>
        </button>
      </div>
      <div class="modal-body">
        <slot></slot>
        <div v-if="showFooter" style="overflow: hidden; margin-top: 30px;">
          <button :disabled="!okEnable" class="modal-button-confirm" @click="onOk">{{okText}}</button>
          <button v-if="showCancel" class="modal-button-cancel" @click="onCancel">{{cancelText}}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      containerStyle: {
        type: Object,
        default: () => {}
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      escClosable: {
        type: Boolean,
        default: true
      },
      title: {
        type: String,
        default: '',
        required: true
      },
      show: {
        type: Boolean,
        required: true
      },
      okText: {
        type: String,
        default: '确定'
      },
      okEnable: {
        type: Boolean,
        default: true
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      showFooter: {
        type: Boolean,
        default: false
      },
      showCancel: {
        type: Boolean,
        default: true
      }
    },
    ready () {
      document.body.addEventListener('keydown', this.escClose)
    },
    beforeDestroy () {
      document.body.removeEventListener('keydown', this.escClose)
    },
    methods: {
      onOk () {
        this.$emit('ok')
      },
      onCancel () {
        this.$emit('cancel')
      },
      escClose (e) {
        if (this.show && this.escClosable && e.keyCode === 27) {
          this.onCancel()
        }
      },
      maskClick () {
        if (this.maskClosable) {
          this.onCancel()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../styles/theme/variables";

  @header-height: 26px;

  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
    transition: opacity .3s ease;
    overflow: auto;
  }

  .modal-header {
    background-color: @modal-header;
  }

  .modal-body {
    background-color: @modal-body-background;
    padding: 20px 30px;
  }

  .modal-title {
    height: @header-height;
    line-height: @header-height;
    margin-left: 14px;
    color: #acadae;
    font-size: 12px;
  }

  .modal-container {
    position: relative;
    margin: 30px auto;
    background-color: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
    border-radius: 3px;
    overflow: hidden;
    transition: all .3s ease;
  }

  .modal-enter, .modal-leave {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }

  .close {
    -webkit-appearance: none;
    height: @header-height;
    width: 34px;
    padding: 0;
    border: 0;
    float: right;
    background: none;

    &:hover {
      background-color: #d6543e;
      color: #fff;
    }

    &:active {
      background-color: #c14b36;
      color: #fff;
    }

    &:hover,
    &:active {
      .icon-close path{
        fill: #fff;
      }
    }
  }

  .icon-close {
    display: block;
    margin: 0 auto;
    path {
      fill: #838ea1;
    }
  }
</style>
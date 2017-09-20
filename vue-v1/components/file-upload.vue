<template>
  <div @click="onClick" class="file-upload--container">
    <slot></slot>
    <!--隐藏的input用于触发文件上传-->
    <input v-el:file class="file-input" @change="uploadFile" type="file">
  </div>
</template>

<script type="text/babel">
  export default{
    props: {
      reg: {
        type: RegExp,
        default: null
      },
      before: {
        type: Function,
        default: function () {}
      }
    },
    methods: {
      onClick () {
        const next = this.before()
        if (next !== false) {
          const evt = document.createEvent('MouseEvents')
          evt.initEvent('click', false, false)
          this.$els.file.dispatchEvent(evt)
        }
      },
      uploadFile (e) {
        const _this = this
        const files = e.target.files
        if (!files || files.length < 1) return this.$dispatch('upload', new Error(0))
        if (this.reg && !files[0].name.match(this.reg)) {
          return this.$dispatch('upload', new Error(1))
        }
        var reader = new FileReader()
        reader.readAsText(files[0])
        reader.onload = function (evt) {
          _this.$dispatch('upload', null, {
            fileData: evt.target.result,
            fileName: files[0].name
          })
          e.target.value = ''
        }
        reader.onerror = () => {
          _this.$dispatch('upload', new Error(2))
          e.target.value = ''
        }
      }
    }
  }
</script>

<style lang="less" rel="styleshe·et/less" scoped>
  .file-upload--container {
    position: relative;
    display: inline-block;
    overflow: hidden;
  }

  .file-input {
    visibility: hidden;
    height: 0;
    position: absolute;
    top: -1000px;
    left: -1000px;
  }
</style>
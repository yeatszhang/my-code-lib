<template>
  <div :class="wrapClasses" :style="style">
    <span :class="[prefixCls + '-total']" v-if="showTotal">
        <slot>共 {{ total }} 条记录</slot>
    </span>
    <div v-if="showSizer || showElevator" :class="optsClasses">
      <div v-if="showSizer" :class="sizerClasses">
        <select v-model="pageSize" @on-change="changeSize">
          <option v-for="item in pageSizeOpts" :value="item" style="text-align:center;">{{ item }}</option>
        </select>
      </div>
      <div v-if="showElevator" :class="ElevatorClasses">
        跳至
        <input :class="[prefixCls + '-options-elevator__input']" type="text" v-model="pageInput" @keyup.enter="onPageInputChange">
        页
        <li :class="[prefixCls + '-options-elevator__button']" @click="onPageInputChange">Go</li>
      </div>
    </div>
    <ul :class="[prefixCls + '-item__wrapper']">
      <li
        title="上一页"
        :class="prevClasses"
        @click="prev">
        上一页
      </li>
      <li title="1" :class="firstPageClasses" @click="changePage(1)">1</li>
      <li title="前进五页" v-if="current - 3 > 1" :class="[prefixCls + '-item']" @click="fastPrev">...</li>
      <li :title="current - 2" v-if="current - 2 > 1" :class="[prefixCls + '-item']" @click="changePage(current - 2)">{{ current - 2 }}</li>
      <li :title="current - 1" v-if="current - 1 > 1" :class="[prefixCls + '-item']" @click="changePage(current - 1)">{{ current - 1 }}</li>
      <li :title="current" v-if="current != 1 && current != allPages" :class="[prefixCls + '-item',prefixCls + '-item-active']">{{ current }}</li>
      <li :title="current + 1" v-if="current + 1 < allPages" :class="[prefixCls + '-item']" @click="changePage(current + 1)">{{ current + 1 }}</li>
      <li :title="current + 2" v-if="current + 2 < allPages" :class="[prefixCls + '-item']" @click="changePage(current + 2)">{{ current + 2 }}</li>
      <li title="后退五页" v-if="current + 3 < allPages" :class="[prefixCls + '-item']" @click="fastNext">...</li>
      <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)">{{ allPages }}</li>
      <li
        title="下一页"
        :class="nextClasses"
        @click="next">
        下一页
      </li>
    </ul>
  </div>
</template>
<script>
  const prefixCls = 'pagination'
  export default {
    props: {
      current: {
        type: Number,
        required: true
      },
      total: {
        type: Number,
        default: 0,
        required: true
      },
      pageSize: {
        type: Number,
        default: 10,
        required: true
      },
      size: {
        type: String,
        default: 'default',
        validator: function (value) {
          return ['small', 'default'].indexOf(value) > -1
        }
      },
      pageSizeOpts: {
        type: Array,
        default () {
          return [10, 20, 30, 40]
        }
      },
      showTotal: {
        type: Boolean,
        default: false
      },
      showElevator: {
        type: Boolean,
        default: false
      },
      showSizer: {
        type: Boolean,
        default: false
      },
      class: {
        type: String
      },
      style: {
        type: Object
      }
    },
    data () {
      return {
        prefixCls: prefixCls,
        pageInput: ''
      }
    },
    ready () {
      this.pageInput = this.current
    },
    watch: {
      current: function (val) {
        this.pageIndex = val
      }
    },
    computed: {
      optsClasses () {
        return [
          `${prefixCls}-options`
        ]
      },
      sizerClasses () {
        return [
          `${prefixCls}-options-sizer`
        ]
      },
      ElevatorClasses () {
        return [
          `${prefixCls}-options-elevator`
        ]
      },
      allPages () {
        const allPage = Math.ceil(this.total / this.pageSize)
        return (allPage === 0) ? 1 : allPage
      },
      wrapClasses () {
        return [
          `${prefixCls}`,
          {
            [`${this.class}`]: !!this.class
          }
        ]
      },
      prevClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-disabled`]: this.current === 1
          }
        ]
      },
      nextClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-disabled`]: this.current === this.allPages
          }
        ]
      },
      firstPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.current === 1
          }
        ]
      },
      lastPageClasses () {
        return [
          `${prefixCls}-item`,
          {
            [`${prefixCls}-item-active`]: this.current === this.allPages
          }
        ]
      }
    },
    methods: {
      changeSize () {
        this.changePage(1)
        this.$emit('on-page-size-change', this.pageSize)
      },
      onPageInputChange (event) {
        let val = event.target.value.trim()
        let page = 0
        if (isValueNumber(val)) {
          val = Number(val)
          if (val !== this.current) {
            const allPages = this.allPages
            if (val > allPages) {
              page = allPages
            } else {
              page = val
              this.changePage(page)
            }
          }
        } else {
          page = 1
        }
      },
      changePage (page) {
        if (page) {
          if (this.current !== page) {
            this.current = page
            this.$emit('on-change', page)
          }
        }
      },
      prev () {
        const current = this.current
        if (current <= 1) {
          return false
        }
        this.changePage(current - 1)
      },
      next () {
        const current = this.current
        if (current >= this.allPages) {
          return false
        }
        this.changePage(current + 1)
      },
      fastPrev () {
        const page = this.current - 5
        if (page > 0) {
          this.changePage(page)
        } else {
          this.changePage(1)
        }
      },
      fastNext () {
        const page = this.current + 5
        if (page > this.allPages) {
          this.changePage(this.allPages)
        } else {
          this.changePage(page)
        }
      }
    }
  }

  function isValueNumber (value) {
    return (/^[1-9][0-9]*$/).test(value + '')
  }

</script>

<style lang="less">
  @import "../styles/theme/variables";

  @line-height: 26px;

  .pagination {
    overflow: hidden;

    &-item__wrapper {
      float: right;
      margin: 0;
      padding: 0;
      list-style: none;
      overflow: hidden;
    }

    &-prev {
      float: left;
    }

    &-next {
      float: left;
    }

    &-item {
      border: 1px solid @box-border-color;
      float: left;
      display: block;
      height: @line-height;
      background-color: @pagination-button-background-color;
      color: @main-text-color;
      line-height: @line-height;
      padding: 0 10px;
      margin-right: 5px;
      cursor: pointer;

      &:hover,
      &.pagination-item-active {
        color: @primary-button-text;
        background-color: @primary-button-color;
      }

      &.pagination-disabled {
        color: @sub-text-color;
        cursor: not-allowed;

        &:hover {
          background-color: @pagination-button-background-color;
        }
      }
    }

    &-options {
      float: right;
    }

    &-options-elevator {
      height: @line-height;
      color: @sub-text-color;

      &__button {
        display: inline-block;
        height: 100%;
        color: @primary-button-text;
        padding: 5px 5px;
        vertical-align: middle;
        background-color: @primary-button-color;
        cursor: pointer;
      }

      &__input {
        display: inline-block;
        height: 100%;
        width: @line-height;
        color: @main-text-color;
        border: 1px solid @box-border-color;
        background-color: @pagination-button-background-color;
        text-align: center;
      }
    }

    &-total {
      line-height: @line-height;
      height: @line-height;
      float: left;
      margin-right: 20px;
      color: @sub-text-color;
    }
  }

</style>
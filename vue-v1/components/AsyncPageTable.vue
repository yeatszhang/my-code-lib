<template>
  <div>
    <fui-table
      class="async-table"
      :header="header"
      :body="body"
      :options="options"
      :loading="loading"
       @re-order="tableOrder"
    >
    </fui-table>
    <fui-pagination
      :total-length="countTotal"
      :item-show="{ per: false,  jump: false, total: true  }"
      :active="page"
      :per="size"
      layout="right"
      size="small"
      @page-change="pageChange"
      @per-change="perChange"
    >
    </fui-pagination>
  </div>
</template>

<script>
  // 异步表格组件  将分页组件与table组件组合在一起，整个表格由后端数据来驱动
  export default {
    // loadData
    props: {
      size: {
        type: Number,
        default: 10
      },
      header: null,
      /**
       * 表格获取数据异步方法
       * @function
       * @param  {Object} option
       * @param  {number} option.page
       * @param  {number} option.pageSize
       * @param  {string} [option.order]
       * @param  {string} [option.direction=('desc'|'asc')]
       */
      loadData: null
    },
    data () {
      return {
        loading: false,
        options: {},
        body: [],
        countTotal: 0,
        page: 1
      }
    },
    ready () {
      this.$reload()
    },
    methods: {
      tableOrder () {
        this.$reload()
      },
      /**
       * 根据当前状态重新加载表格数据
       * @param [options]
       * @param options.page {number} 重置的页数
       * @param cb {Function}
       */
      $reload (options, cb = () => {}) {
        if (options) {
          this.page = options.page
        }
        this.loading = true
        const orderCol = this.header.find(obj => obj.order === 'desc' || obj.order === 'asc')
        this.loadData({
          page: this.page,
          pagesize: this.size,
          order: orderCol ? orderCol.key : null,
          direction: orderCol ? orderCol.order : null
        }, function (data) {
          this.body = data.rows
          this.countTotal = data.total
          this.loading = false
          cb()
        }.bind(this))
      },
      pageChange (page) {
        this.page = page
        this.$reload()
      }
    }
  }
</script>

<style lang="less">
  .async-table.fui-table.theme2 {
    .table-body {
      max-height: 4000px!important;
      overflow: visible;
    }

    td,th {
      height: 38px;
    }
  }
</style>
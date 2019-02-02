<template>
  <el-container class="container">
    <el-header style="height:auto" class="x-table-tool">
      <div class="tool-align">
        <el-button-group>
          <el-button size="mini" icon="fc-icon-vertical-align-top"></el-button>
          <el-button size="mini" icon="fc-icon-vertical-align-middl"></el-button>
          <el-button size="mini" icon="fc-icon-vertical-align-botto"></el-button>
        </el-button-group>
        <el-button-group>
          <el-button size="mini" icon="fc-icon-align-left"></el-button>
          <el-button size="mini" icon="fc-icon-align-center"></el-button>
          <el-button size="mini" icon="fc-icon-align-right"></el-button>
        </el-button-group>
      </div>
    </el-header>
    <el-container class="x-table">
      <el-container class="x-table-rownum">
        <el-header class="x-table-header" :style="{height: cellSize.height + 1 + 'px!important'}"></el-header>
        <el-main class="x-rownum-container" ref="tableRownum">
          <xtable-content :table="rownum"></xtable-content>
        </el-main>
      </el-container>
      <el-container class="x-table-view">
        <el-header class="x-table-header">
          <el-container>
            <el-main ref="tableHeader" class="x-header-container">
              <xtable-content :table="header"></xtable-content>
            </el-main>
            <el-aside width="8px"></el-aside>
          </el-container>
        </el-header>
        <el-main class="x-table-body" @scroll.native="scroll" ref="tableBody">
          <xtable-content :rowCount="rows" :colCount="cols"></xtable-content>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import XtableContent from './XtableContent.vue'
export default {
  name: 'x-table',
  components: {
    XtableContent
  },
  provide () {
    return {
      cellSize: this.cellSize
    }
  },
  watch: {
    scrollLeft (val) {
      this.$refs.tableHeader.$el.scrollLeft = val
    },
    scrollTop (val) {
      this.$refs.tableRownum.$el.scrollTop = val
    }
  },
  data () {
    return {
      cellSize: {
        width: 80,
        height: 28
      },
      rows: 30,
      cols: 20,
      scrollLeft: 0,
      scrollTop: 0
    }
  },
  mounted () {

  },
  computed: {
    header () {
      let header = []
      for (let i = 0; i < this.cols; i++) {
        header.push({
          text: this.numberToletter(i),
          x: i,
          y: 0,
          textAlign: 'center',
          verticalAlign: 'middle'
        })
      }
      return [header]
    },
    rownum () {
      let rownum = []
      const cellSize = this.cellSize.height
      for (let i = 0; i < this.rows; i++) {
        rownum.push([{
          text: (i + 1) + '',
          x: 0,
          y: i,
          textAlign: 'center',
          verticalAlign: 'middle',
          width: cellSize
        }])
      }
      return rownum
    }
  },
  methods: {
    numberToletter (num, str) {
      let str_ = String.fromCharCode(65 + num % 26) + (str || '')
      let unm_ = parseInt(num / 26)
      if (unm_ > 0) {
        str_ = this.numberToletter(unm_ - 1, str_)
      }
      return str_
    },
    scroll () {
      this.scrollLeft = this.$refs.tableBody.$el.scrollLeft
      this.scrollTop = this.$refs.tableBody.$el.scrollTop
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  overflow: hidden;
  .x-table-tool{
    .tool-align{
      display: inline-block;
    }
    .el-button-group{
      display: block;
      .el-button{
        padding:2px;
        font-size: 20px;
        border: none;
      }
    }
  }
  .x-table{
    overflow: hidden;
    .x-table-rownum{
      flex: none;
      background-color: #e0e0e0;
      width: auto !important;
      border-right: 1px solid #EEEEEE;
      .x-table-header{
        height: auto !important;
        border-bottom: 1px solid #EEEEEE;
        border-right: 1px solid #EEEEEE;
      }
      .x-rownum-container{
        padding-bottom: 8px;
        overflow: hidden;
      }
    }
    .x-table-view{
      .x-table-header{
        display: flex;
        background-color: #e0e0e0;
        height: auto !important;
        overflow: hidden;
        .x-header-container{
          overflow: hidden;
        }
      }
      .x-table-body{
        overflow: auto;
        display: table-cell;
      }
    }
  }
}
</style>

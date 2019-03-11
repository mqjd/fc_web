<template>
  <el-container class="container">
    <el-header style="height:auto" class="x-table-tool">
      <div class="tool-align">
        <div class="text-align">
          <el-button-group>
            <el-tooltip class="item" offset="40" effect="light" :open-delay="400" :visible-arrow="false" content="顶部对齐" placement="bottom">
              <el-button size="mini" icon="fc-icon-dingbuduiqi" @click="alignCell({'vertical-align': 'top'})"></el-button>
            </el-tooltip>
            <el-tooltip class="item" offset="40" effect="light" :open-delay="400" :visible-arrow="false" content="垂直居中" placement="bottom">
              <el-button size="mini" icon="fc-icon-chuizhijuzhongdefuben" @click="alignCell({'vertical-align': 'middle'})"></el-button>
            </el-tooltip>
            <el-tooltip class="item" offset="40" effect="light" :open-delay="400" :visible-arrow="false" content="底部对齐" placement="bottom">
              <el-button size="mini" icon="fc-icon-dibu" @click="alignCell({'vertical-align': 'bottom'})"></el-button>
            </el-tooltip>
          </el-button-group>
          <el-button-group>
            <el-button size="mini" icon="fc-icon-align-left" @click="alignCell({'text-align': 'left'})"></el-button>
            <el-button size="mini" icon="fc-icon-align-center" @click="alignCell({'text-align': 'center'})"></el-button>
            <el-button size="mini" icon="fc-icon-align-right" @click="alignCell({'text-align': 'right'})"></el-button>
          </el-button-group>
        </div>
        <el-button size="mini" icon="fc-icon-mergecell" @click="mergeCell"></el-button>
        <el-button size="mini" icon="fc-icon-splitcell" @click="splitCell"></el-button>
      </div>
    </el-header>
    <el-container class="x-table" ref="xTable">
      <el-container class="x-table-rownum">
        <el-header class="x-table-header" :style="{height: cellSize.height + 'px!important'}"></el-header>
        <el-main class="x-rownum-container" ref="tableRownum">
          <xtable-content
            :table="rownum"
            :cellWidth="cornerCell"
            :cellHeight="cellHeight"
          >
          </xtable-content>
        </el-main>
      </el-container>
      <el-container class="x-table-view">
        <el-header class="x-table-header">
          <el-container>
            <el-main ref="tableHeader" class="x-header-container">
              <xtable-content
                :table="header"
                :cellWidth="cellWidth"
                :cellHeight="cornerCell"
              >
              </xtable-content>
            </el-main>
            <el-aside width="8px"></el-aside>
          </el-container>
        </el-header>
        <el-main
          class="x-table-body"
          @scroll.native="scroll"
          @dblclick.native="dblclick($event)"
          ref="tableBody">
          <div
             @mousedown.left="mousedown($event)"
          >
            <div class="select-area"
              @contextmenu.prevent="blankFunc"
              :style="selectAreaStyle">
              <textarea
                v-if="editCell"
                v-focus
                v-model="editCell.text"
                ref="cellValue"
                @mousedown.stop="blankFunc"
              >
              </textarea>
            </div>
            <xtable-content
              :table="tableData"
              :cellWidth="cellWidth"
              :cellHeight="cellHeight"
            ></xtable-content>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import XtableContent from './XtableContent.vue'

const min = function (a, b) {
  return a > b ? b : a
}
const max = function (a, b) {
  return a < b ? b : a
}
const between = function (a, b, c) {
  return a >= b && a <= c
}
const findIndex = function (array, func) {
  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) {
      return i
    }
  }
  return -1
}
const findLastIndex = function (array, func) {
  let index = -1
  for (let i = 0; i < array.length; i++) {
    if (func(array[i])) {
      index = i
    }
  }
  return index
}

export default {
  name: 'x-table',
  components: {
    XtableContent
  },
  watch: {
    scrollLeft (val) {
      this.$refs.tableHeader.$el.scrollLeft = val
    },
    scrollTop (val) {
      this.$refs.tableRownum.$el.scrollTop = val
    },
    selectEnd () {
      this.setSelectArea()
      this.setSelectAreaStyle()
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
      cornerCell: new Array(1).fill(28),
      cellHeight: new Array(30).fill(28),
      cellWidth: new Array(20).fill(80),
      scrollLeft: 0,
      scrollTop: 0,
      selectStart: null,
      selectEnd: null,
      selectedArea: null,
      header: null,
      rownum: null,
      tableData: null,
      editCell: null,
      selectAreaStyle: {
        display: 'none'
      }
    }
  },
  mounted () {
    this.initTableHeader()
    this.initTableRownum()
    this.initTableData()
  },
  methods: {
    setSelectAreaStyle () {
      if (this.selectedArea) {
        const coordinate = this.getCoordinate()
        const tableElement = this.$refs.tableBody.$el.querySelector('tbody').children
        const startClientRect = tableElement[coordinate.y1].children[coordinate.x1].getBoundingClientRect()
        const endClientRect = tableElement[coordinate.y2].children[coordinate.x2].getBoundingClientRect()
        const width = endClientRect.left - startClientRect.left + endClientRect.width - 1
        const height = endClientRect.top - startClientRect.top + endClientRect.height - 1
        const baseClientRect = this.$refs.tableBody.$el.getBoundingClientRect()
        const top = startClientRect.top - baseClientRect.top + this.scrollTop - 1
        const left = startClientRect.left - baseClientRect.left + this.scrollLeft - 1
        this.selectAreaStyle = {
          width: `${width}px`,
          height: `${height}px`,
          top: `${top}px`,
          left: `${left}px`
        }
      } else {
        this.selectAreaStyle = {
          display: 'none'
        }
      }
    },
    getCoordinate () {
      const area = this.selectedArea
      let x1 = this.tableData[area.y1].findIndex(item => item.x === area.x1)
      const endCell = this.findTopLeftCell(area.x2, area.y2)
      return {
        x1: x1,
        y1: area.y1 + 1,
        x2: this.tableData[endCell.y].indexOf(endCell),
        y2: endCell.y + 1
      }
    },
    initTableHeader () {
      let header = []
      for (let i = 0; i < this.cols; i++) {
        header.push({
          text: this.numberToletter(i),
          x: i,
          y: 0,
          key: `${i}`,
          style: {
            'text-align': 'center',
            'vertical-align': 'middle',
            'border-bottom': '1px solid #EEEEEE'
          }
        })
      }
      this.header = [header]
    },
    initTableRownum () {
      let rownum = []
      for (let i = 0; i < this.rows; i++) {
        rownum.push([{
          text: (i + 1) + '',
          x: 0,
          y: i,
          key: `${i}`,
          style: {
            'text-align': 'center',
            'vertical-align': 'middle'
          }
        }])
      }
      this.rownum = rownum
    },
    initTableData () {
      let tableData = []
      for (let i = 0; i < this.rows; i++) {
        const row = []
        for (let j = 0; j < this.cols; j++) {
          row.push({
            x: j,
            y: i,
            key: `${i}-${j}`,
            colspan: 1,
            rowspan: 1,
            style: {
              'text-align': 'left',
              'vertical-align': 'top'
            }
          })
        }
        tableData.push(row)
      }
      this.tableData = tableData
    },
    setSelectArea () {
      const start = this.selectStart
      const end = this.selectEnd
      const selectedArea = {
        x1: min(start[0], end[0]),
        y1: min(start[1], end[1]),
        x2: max(start[0], end[0]),
        y2: max(start[1], end[1])
      }
      this.calcSelectArea(selectedArea)
      this.selectedArea = selectedArea
    },
    findTopPosition (x, endY) {
      for (var i = endY - 1; i >= 0; i--) {
        let index = this.tableData[i].findIndex(item => item.x === x)
        if (index !== -1) {
          return {
            x: index,
            y: i,
            data: this.tableData[i][index]
          }
        }
      }
    },
    findTopLeftCell (x, y) {
      for (let i = y; i >= 0; i--) {
        let index_ = this.tableData[i].findIndex(item => {
          return between(x, item.x, item.x + item.colspan - 1) && between(y, item.y, item.y + item.rowspan - 1)
        })
        if (index_ !== -1) {
          return this.tableData[i][index_]
        }
      }
    },
    calcSelectArea (area) {
      let index_ = this.tableData[area.y1].findIndex(item => item.x === area.x1)
      // 寻找左上角单元格位置
      if (index_ === -1) {
        const cell = this.findTopLeftCell(area.x1, area.y1)
        area.x1 = cell.x
        area.y1 = cell.y
        area.x1 = min(area.x1, area.x2)
        area.y1 = min(area.y1, area.y2)
        area.x2 = max(area.x1, area.x2)
        area.y2 = max(area.y1, area.y2)
      }
      // 校验上边
      for (let i = area.x1; i <= area.x2; i++) {
        let xIndex = this.tableData[area.y1].findIndex(item => item.x === i)
        let cell = null
        if (xIndex === -1) {
          cell = this.findTopPosition(i, area.y1).data
        } else {
          cell = this.tableData[area.y1][xIndex]
        }
        if (cell.x + cell.colspan - 1 <= area.x2 && cell.y === area.y1) {
          i += cell.colspan - 1
        } else {
          if (cell.x + cell.colspan - 1 > area.x2) {
            area.x2 = cell.x + cell.colspan - 1
          }
          if (cell.y < area.y1) {
            area.y1 = cell.y
          }
          this.calcSelectArea(area)
          return
        }
      }
      // 校验左边
      for (let i = area.y1; i <= area.y2; i++) {
        let xIndex = this.tableData[i].findIndex(item => item.x === area.x1)
        if (xIndex === -1) {
          xIndex = findLastIndex(this.tableData[i], item => item.x <= area.x1)
        }
        let cell = this.tableData[i][xIndex]
        if (cell.x === area.x1 && cell.y + cell.rowspan - 1 <= area.y2) {
          i += cell.rowspan - 1
        } else {
          if (cell.y + cell.rowspan - 1 > area.y2) {
            area.y2 = cell.y + cell.rowspan - 1
          }
          if (cell.x < area.x1) {
            area.x1 = cell.x
          }
          this.calcSelectArea(area)
          return
        }
      }
      // 校验下边
      for (let i = area.x1; i <= area.x2; i++) {
        let xIndex = this.tableData[area.y2].findIndex(item => item.x === i)
        let cell = null
        if (xIndex === -1) {
          cell = this.findTopPosition(i, area.y2).data
        } else {
          cell = this.tableData[area.y2][xIndex]
        }
        if (cell.y + cell.rowspan - 1 === area.y2 && cell.x + cell.colspan - 1 <= area.x2) {
          i += cell.colspan - 1
        } else {
          if (cell.y + cell.rowspan - 1 > area.y2) {
            area.y2 = cell.y + cell.rowspan - 1
          }
          if (cell.x + cell.colspan - 1 > area.x2) {
            area.x2 = cell.x + cell.colspan - 1
          }
          this.calcSelectArea(area)
          return
        }
      }
      // 校验右边
      for (let i = area.y1; i <= area.y2; i++) {
        let xIndex = this.tableData[i].findIndex(item => item.x + item.colspan - 1 === area.x2)
        if (xIndex === -1) {
          xIndex = findLastIndex(this.tableData[i], item => item.x <= area.x2)
        }
        let cell = this.tableData[i][xIndex]
        if (cell.x + cell.colspan - 1 === area.x2 && cell.y + cell.rowspan - 1 <= area.y2) {
          i += cell.rowspan - 1
          continue
        } else {
          if (cell.x + cell.colspan - 1 > area.x2) {
            area.x2 = cell.x + cell.colspan - 1
          }
          if (cell.y + cell.rowspan - 1 > area.y2) {
            area.y2 = cell.y + cell.rowspan - 1
          }
          this.calcSelectArea(area)
          return
        }
      }
    },
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
    },
    mousedown (event) {
      const position = this.getPosition(event.clientX, event.clientY)
      if (!this.isSamePosition(position)) {
        this.editCell = null
      }
      this.selectEnd = this.selectStart = position
      this.$refs.xTable.$el.addEventListener('mouseleave', this.mouseup)
      document.body.addEventListener('mousemove', this.selecting)
      document.body.addEventListener('mouseup', this.mouseup)
    },
    mouseup (event) {
      this.$refs.xTable.$el.removeEventListener('mouseleave', this.mouseup)
      document.body.removeEventListener('mousemove', this.selecting)
      document.body.removeEventListener('mouseup', this.mouseup)
    },
    dblclick (event) {
      const position = this.getPosition(event.clientX, event.clientY)
      this.editCell = this.findTopLeftCell(position[0], position[1])
      this.editCell.isEditing = true
    },
    isSamePosition (position) {
      let result = false
      if (this.selectStart) {
        const [x1, y1] = this.selectStart
        const [x2, y2] = position
        if (this.findTopLeftCell(x1, y1) === this.findTopLeftCell(x2, y2)) {
          result = true
        }
      } else {
        result = true
      }
      return result
    },
    selecting (event) {
      const selectEnd = this.getPosition(event.clientX, event.clientY)
      if (selectEnd[0] !== this.selectEnd[0] || selectEnd[1] !== this.selectEnd[1]) {
        this.selectEnd = selectEnd
        this.editCell = null
      }
    },
    getPosition (x, y) {
      return [this.getPositionX(x), this.getPositionY(y) - 1]
    },
    getPositionX (x) {
      const lists = this.$refs.tableHeader.$children[0].$el.children[0].children[0].children
      const firstBound = lists[0].getBoundingClientRect()
      const lastBound = lists[lists.length - 1].getBoundingClientRect()
      if (x < firstBound.left) {
        return 0
      } else if (lastBound.left + lastBound.width < x) {
        return lists.length - 1
      } else {
        for (let i = 0; i < lists.length; i++) {
          const bound = lists[i].getBoundingClientRect()
          if (bound.left <= x && x < bound.left + bound.width) {
            return i
          }
        }
      }
    },
    getPositionY (y) {
      const lists = this.$refs.tableRownum.$children[0].$el.children[0].children
      const firstBound = lists[0].getBoundingClientRect()
      const lastBound = lists[lists.length - 1].getBoundingClientRect()
      if (y < firstBound.top) {
        return 0
      } else if (lastBound.top + lastBound.height < y) {
        return lists.length - 1
      } else {
        for (let i = 0; i < lists.length; i++) {
          const bound = lists[i].getBoundingClientRect()
          if (bound.top <= y && y < bound.top + bound.height) {
            return i
          }
        }
      }
    },
    alignCell (align) {
      const selectedArea = this.selectedArea
      for (let i = selectedArea.y1; i <= selectedArea.y2; i++) {
        let rowData = this.tableData[i]
        let x1 = findIndex(rowData, item => item.x + item.colspan - 1 >= selectedArea.x1)
        let x2 = findLastIndex(rowData, item => item.x <= selectedArea.x2)
        if (x1 !== -1 && x2 !== -1) {
          for (let j = x1; j <= x2; j++) {
            rowData[j].style = {
              ...rowData[j].style,
              ...align
            }
          }
        }
      }
    },
    mergeCell () {
      const selectedArea = this.selectedArea
      if (this.findTopLeftCell(selectedArea.x1, selectedArea.y1) === this.findTopLeftCell(selectedArea.x2, selectedArea.y2)) {
        return
      }
      let rowData = this.tableData[selectedArea.y1]
      let x1 = findIndex(rowData, item => item.x + item.colspan - 1 >= selectedArea.x1)
      let x2 = findLastIndex(rowData, item => item.x <= selectedArea.x2)
      this.tableData[selectedArea.y1][x1].rowspan = selectedArea.y2 - selectedArea.y1 + 1
      this.tableData[selectedArea.y1][x1].colspan = selectedArea.x2 - selectedArea.x1 + 1
      rowData.splice(x1 + 1, x2 - x1)
      for (let i = selectedArea.y1 + 1; i <= selectedArea.y2; i++) {
        rowData = this.tableData[i]
        let x1_ = findIndex(rowData, item => item.x + item.colspan - 1 >= selectedArea.x1)
        let x2_ = findLastIndex(rowData, item => item.x <= selectedArea.x2)
        if (x1_ !== -1 && x2_ !== -1) {
          rowData.splice(x1_, x2_ - x1_ + 1)
        }
      }
      this.$nextTick(function () {
        this.selectEnd = this.selectStart = [selectedArea.x1, selectedArea.y1]
      })
    },
    splitCell () {
      const selectedArea = this.selectedArea
      if (this.findTopLeftCell(selectedArea.x1, selectedArea.y1) === this.findTopLeftCell(selectedArea.x2, selectedArea.y2)) {
        let rowData = this.tableData[selectedArea.y1]
        let x1 = findLastIndex(rowData, item => item.x + item.colspan <= selectedArea.x1)
        x1 = x1 === -1 ? 0 : x1 + 1
        let cell = this.tableData[selectedArea.y1][x1]
        const array = []
        for (let i = 1; i < cell.colspan; i++) {
          array.push({
            x: cell.x + i,
            y: cell.y,
            colspan: 1,
            rowspan: 1,
            style: {
              'text-align': 'left',
              'vertical-align': 'top'
            }
          })
        }
        rowData.splice(x1 + 1, 0, ...array)
        for (let i = selectedArea.y1 + 1; i <= selectedArea.y2; i++) {
          rowData = this.tableData[i]
          let x1_ = findLastIndex(rowData, item => item.x + item.colspan <= selectedArea.x1)
          x1_ = x1_ === -1 ? 0 : x1_ + 1
          const array_ = []
          for (let j = 0; j < cell.colspan; j++) {
            array_.push({
              x: cell.x + j,
              y: i,
              colspan: 1,
              rowspan: 1,
              key: i + '-' + (cell.x + j),
              style: {
                'text-align': 'left',
                'vertical-align': 'top'
              }
            })
          }
          rowData.splice(x1_, 0, ...array_)
        }
        cell.rowspan = 1
        cell.colspan = 1
        this.$nextTick(function () {
          this.selectEnd = this.selectStart = [selectedArea.x1, selectedArea.y1]
        })
      }
    },
    cellBorder () {
      const selectedArea = this.selectedArea
      for (let i = selectedArea.y1; i <= selectedArea.y2; i++) {
        let rowData = this.tableData[i]
        rowData.filter(item => item.selected).map(item => {
          const style = item.style || {}
          style.border = '1px solid #212121'
          item.style = style
        })
      }
      this.setSelected(this.selectedArea, false)
      this.showMenu = false
    },
    blankFunc () {
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  overflow: hidden;
  .select-area{
    position: absolute;
    border: 1px solid #4caf50;
    background-color: rgba(0, 0, 0, 0.1);
    z-index: 1;
    textarea{
      height: 100%;
      width: 100%;
      outline: none;
      box-sizing: border-box;
      border: none;
      resize: none;
    }
  }
  .x-table-tool{
    .tool-align{
      display: inline-block;
    }
    .el-button-group{
      display: block;
    }
    .el-button{
      padding:2px;
      font-size: 20px;
      border: none;
    }
    .text-align{
      display: inline-block;
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
        position: relative;
      }
    }
  }
}
</style>

<template>
  <table
    class="x-table-content"
    cellspacing="0"
    cellpadding="0"
    @mousedown="mousedown($event)"
    ref="table"
  >
    <tbody>
      <x-row
        v-for="(row,rowIndex) in tableData"
        :key="rowIndex"
        :columns="row"
        :rowIndex="rowIndex"
      >
      </x-row>
    </tbody>
  </table>
</template>
<script>
import XRow from './XRow.vue'
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
  name: 'xtable-content',
  components: {
    XRow
  },
  mounted () {
    this.init()
  },
  props: {
    rowCount: {
      type: Number
    },
    colCount: {
      type: Number
    },
    table: {
      type: Array
    }
  },
  data () {
    return {
      rows: 50,
      cols: 14,
      selectStart: null,
      selecting: false,
      showMenu: false,
      tableData: [],
      selectedArea: null
    }
  },
  computed: {
    selectedAreaClientRect () {
      const coordinate = this.getCoordinate()
      const baseClientRect = document.querySelector('.x-table').getBoundingClientRect()
      const startClientRect = document.querySelector(`.x-table tr:nth-child(${coordinate.y1}) td:nth-child(${coordinate.x1})`).getBoundingClientRect()
      const endClientRect = document.querySelector(`.x-table tr:nth-child(${coordinate.y2}) td:nth-child(${coordinate.x2})`).getBoundingClientRect()
      const width = endClientRect.left - startClientRect.left + endClientRect.width - 1
      const height = endClientRect.top - startClientRect.top + endClientRect.height - 1
      const top = startClientRect.y - baseClientRect.y - 1
      const left = startClientRect.x - baseClientRect.x - 1
      return {
        width: `${width}px`,
        height: `${height}px`,
        top: `${top}px`,
        left: `${left}px`
      }
    }
  },
  methods: {
    getCoordinate () {
      const area = this.selectedArea
      let x1 = this.tableData[area.y1].findIndex(item => item.x === area.x1)
      const endCell = this.findTopLeftCell(area.x2, area.y2)
      return {
        x1: x1 + 1,
        y1: area.y1 + 1,
        x2: this.tableData[endCell.y].indexOf(endCell) + 1,
        y2: endCell.y + 1
      }
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
    setSelectArea (start, end) {
      if (start && end) {
        const selectedArea = {
          x1: min(start.x, end.x),
          y1: min(start.y, end.y),
          x2: max(start.x + start.colspan - 1, end.x + end.colspan - 1),
          y2: max(start.y + start.rowspan - 1, end.y + end.rowspan - 1)
        }
        this.calcSelectArea(selectedArea)
        this.selectedArea = selectedArea
      }
    },
    init () {
      if (this.table === undefined) {
        let tableData = []
        for (let i = 0; i < this.rowCount; i++) {
          const row = []
          for (let j = 0; j < this.colCount; j++) {
            row.push({
              x: j,
              y: i,
              colspan: 1,
              rowspan: 1
            })
          }
          tableData.push(row)
        }
        this.tableData = tableData
      } else {
        this.tableData = this.table
      }
    },
    getCell (x, y) {

    },
    mousedown (event) {
      if (event.button === 0) {
        var me = this
        me.selectStart = this.getCell()
      }
    },
    mousedown1 (event, col) {
      if (event.button === 0) {
        this.showMenu = false
        var me = this
        me.selectStart = col
        me.selecting = true
        this.setSelectArea(col, col)
        document.addEventListener('mouseup', me.mouseup)
      }
    },
    mouseup () {
      this.selecting = false
      document.removeEventListener('mouseup', this.mouseup)
    },
    showContextmenu (event, col) {
      if (col.selected) {
        this.$refs.tableContext.style.top = event.clientY + 'px'
        this.$refs.tableContext.style.left = event.clientX + 'px'
        this.showMenu = true
      } else {
        this.setSelectArea()
      }
    },
    mouseenter (col) {
      if (this.selecting) {
        this.setSelectArea(this.selectStart, col)
      }
    },
    mergeCell () {
      const selectedArea = this.selectedArea
      let rowData = this.tableData[selectedArea.y1]
      let x1 = rowData.findIndex(item => item.selected)
      let x2 = findLastIndex(rowData, item => item.selected)
      this.tableData[selectedArea.y1][x1].rowspan = selectedArea.y2 - selectedArea.y1 + 1
      this.tableData[selectedArea.y1][x1].colspan = selectedArea.x2 - selectedArea.x1 + 1
      rowData.splice(x1 + 1, x2 - x1)
      for (let i = selectedArea.y1 + 1; i <= selectedArea.y2; i++) {
        rowData = this.tableData[i]
        let x1_ = findIndex(rowData, item => item.selected)
        let x2_ = findLastIndex(rowData, item => item.selected)
        if (x1_ !== -1 && x2_ !== -1) {
          rowData.splice(x1_, x2_ - x1_ + 1)
        }
      }
      this.selectedArea.x2 = this.selectedArea.x1
      this.selectedArea.y2 = this.selectedArea.y1
      this.setSelectArea(this.selectedArea.start, this.selectedArea.end)
      this.showMenu = false
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
    }
  }
}
</script>
<style lang="scss" scoped>
.x-table-content{
  font-size: 12px;
  border-collapse: collapse;
  table-layout:fixed;
  --webkit-touch-callout: none;
  --webkit-user-select: none;
  --khtml-user-select: none;
  --moz-user-select: none;
  --ms-user-select: none;
  user-select: none;
}
</style>

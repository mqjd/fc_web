<template>
  <el-container>
    <el-header>
      <el-upload
        drag
        :accept="SheetJSFT"
        :before-upload="filePpload"
        action="https://jsonplaceholder.typicode.com/posts/"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
      <el-button type="primary" @click="xlsxExport">导出</el-button>
    </el-header>
    <el-main>
      <hot-table :settings="settings" :language="language"></hot-table>
    </el-main>
  </el-container>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import 'handsontable/languages/zh-CN'
import 'handsontable/dist/handsontable.full.css'
import XLSX from 'xlsx'
const _SheetJSFT = [
  'xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'fods', 'uos', 'sylk', 'dif', 'dbf', 'prn', 'qpw', '123', 'wb*', 'wq*', 'html', 'htm'
].map(function (x) { return '.' + x }).join(',')
export default {
  name: 'd-table',
  data: function () {
    return {
      SheetJSFT: _SheetJSFT,
      settings: {
        data: [],
        colHeaders: true,
        rowHeaders: true,
        contextMenu: true,
        mergeCells: true
      },
      language: 'zh-CN'
    }
  },
  components: {
    HotTable
  },
  methods: {
    filePpload (file) {
      const me = this
      const reader = new FileReader()
      reader.onload = (e) => {
        const bstr = e.target.result
        const wb = XLSX.read(bstr, {type: 'binary', cellStyles: true})
        const wsname = wb.SheetNames[0]
        const ws = wb.Sheets[wsname]
        const data = XLSX.utils.sheet_to_json(ws, {header: 1})
        me.settings.data = data
      }
      reader.readAsBinaryString(file)
      me.$message('success')
      return false
    },
    xlsxExport () {
      const ws = XLSX.utils.aoa_to_sheet(this.settings.data)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'SheetJS')
      XLSX.writeFile(wb, 'sheetjs.xlsx')
    }
  }
}
</script>
<style lang="scss" scoped>
.el-header{
  height: auto !important;
}
</style>

<template>
  <div class="calendar">
    <div class="calendar-bar">
      <el-button size="small" round @click="setCurrentDate()">今天</el-button>
      <el-button-group>
        <el-button icon="el-icon-arrow-left" circle size="small" @click="prevMonth()"></el-button>
        <el-button icon="el-icon-arrow-right" circle size="small" @click="nextMonth()"></el-button>
      </el-button-group>
      <span class="current-date">{{currentDate}}</span>
    </div>
    <div class="calendar-content">
      <date-table :date="date" @pick="addTask"></date-table>
    </div>
  </div>
</template>
<script>
import { formatDate, prevMonth, nextMonth } from 'element-ui/packages/date-picker/src/util'
import DateTable from './date-table.vue'
export default {
  name: 'calendar',
  components: {
    DateTable
  },
  data () {
    return {
      date: new Date()
    }
  },
  computed: {
    currentDate () {
      return formatDate(this.date)
    }
  },
  methods: {
    addTask (date) {
      this.$message(formatDate(date))
    },
    prevMonth () {
      this.date = prevMonth(this.date)
    },
    nextMonth () {
      this.date = nextMonth(this.date)
    },
    setCurrentDate () {
      this.date = new Date()
    }
  }
}
</script>
<style lang="scss" scoped>
.calendar{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .calendar-bar{
    padding: 5px;
    .current-date{
      display: inline-block;
      margin-left: 5px;
      font-size: 12px;
      border-radius: 20px;
      padding: 7px 15px;
      color: #606266;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
      font-weight: 500;
    }
  }
  .calendar-content{
    flex: 1;
  }
}
</style>

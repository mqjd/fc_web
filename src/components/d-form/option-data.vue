<template>
  <div class="field-data">
    <div class="data-title">
      <span>显示</span>
      <span>值</span>
      <el-button size="mini" class="operate-add" @click.stop="addRow" type="primary" icon="el-icon-plus" ></el-button>
    </div>
    <draggable v-model="config.data" :options="dataOption">
      <el-row v-for="(item, index) in config.data" :key="index" :gutter="10">
        <el-button v-if="config.data.length!=1" class="operate-remove" @click.stop="removeCurrentData(index)" type="danger" icon="el-icon-delete" ></el-button>
        <el-col :span="12">
          <el-input v-model="item.text" placeholder="请输入内容" clearable></el-input>
        </el-col>
        <el-col :span="12">
          <el-input v-model="item.value" placeholder="请输入内容" clearable></el-input>
        </el-col>
      </el-row>
    </draggable>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
export default {
  name: 'OptionData',
  components: {
    draggable
  },
  data () {
    return {
      dataOption: {
        group: { name: 'dataItem', pull: false, put: false },
        ghostClass: 'ghost',
        sort: true
      }
    }
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    dataRemoved: {
      type: Function
    }
  },
  methods: {
    addRow () {
      this.config.data.push({
        text: '',
        value: ''
      })
    },
    removeCurrentData (index) {
      this.dataRemoved(this.config, this.config.data[index])
      this.config.data.splice(index, 1)
    }
  }
}
</script>
<style scoped>
.field-data{
  border: 1px solid #dcdfe6;
  width: 100%;
  padding: 10px 20px;
  box-sizing: border-box;
}
.el-row {
  position: relative;
  margin: 5px 10px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-row:hover>.operate-remove{
  display: initial;
}
.operate-remove{
  z-index: 10;
  display: none;
  font-size: 14px;
  width: 16px;
  height: 16px;
  padding: 0px;
  cursor: pointer;
  position: absolute;
  top: -6px;
  right: -6px;
}
.operate-add{
  float: right;
}
.data-title{
  width: 100%;
  display: flex;
}
.data-title>span{
  flex: 1;
  text-align: center;
}
.data-title>span{
  flex: 1;
  text-align: center;
}
.data-title>.el-button{
  padding: 0px;
  width: 16px;
  height: 16px;
}
</style>

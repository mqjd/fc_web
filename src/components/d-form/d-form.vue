<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        unique-opened
      >
        <el-submenu v-for="(items, index) in formBaseField" :index="index+''" :key="index">
          <template slot="title">{{items.text}}</template>
          <draggable v-model="items.child" :options="formBaseOption" @end="onDragEnd" @start="onDragStart">
            <el-menu-item v-for="(item, index_) in items.child" :index="index+'-'+index_" :key="index+'-'+index_">
              {{item.text}}
            </el-menu-item>
          </draggable>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="tools">
        <el-form :inline="true">
          <el-form-item label="禁用编辑">
            <el-switch
              v-model="disabled">
            </el-switch>
          </el-form-item>
          <el-button-group>
            <el-button type="primary" icon="fc-icon-return"></el-button>
            <el-button type="primary" icon="fc-icon-enter"></el-button>
            <el-button type="primary" icon="fc-icon-right" @click="openDialog"></el-button>
          </el-button-group>
        </el-form>
      </el-header>
      <el-container>
        <el-main>
          <el-form label-width="80px" class="form-containter" @click.native.stop="clearCurrentField()">
            <draggable v-model="formField" :options="formFieldOption" class="form-containter" @start="onDragStart">
              <el-form-item
                v-for="(item, index) in formField"
                class="form-item"
                :class="getItemClass(item)"
                :key="index"
                @click.native.stop="setCurrentField(index)"
                :label="item.text"
              >
                <i class="el-icon-delete remove-field" @click="removeField(index)"></i>
                <d-field :config="item" :disabled="disabled"></d-field>
              </el-form-item>
            </draggable>
          </el-form>
        </el-main>
        <el-aside class="option-form">
          <option-form :config="curField" v-if="curField!==null" :dataRemoved="this.removeFieldData"></option-form>
        </el-aside>
      </el-container>
    </el-container>
    <el-dialog
      append-to-body
      title="提示"
      @open="clearForm"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form :model="formConfig" label-width="80px" :rules="formRule" ref="formConfig">
        <el-form-item label="保存选项" prop="saveType" v-if="editableMode">
          <el-radio-group v-model="formConfig.saveType">
            <el-radio :label="1">保存为新版本</el-radio>
            <el-radio :label="2">修改当前版本</el-radio>
            <el-radio :label="3">另存为</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="表单编码" prop="formCode" v-if="formConfig.saveType!=3">
          <el-input v-model="formConfig.formCode" maxlength="40" :disabled="editableMode"></el-input>
        </el-form-item>
        <el-form-item label="表单名称" prop="formName" v-if="formConfig.saveType!=3">
          <el-input v-model="formConfig.formName" maxlength="50" :disabled="editableMode"></el-input>
        </el-form-item>
        <el-form-item label="表单编码" prop="newFormCode" v-if="formConfig.saveType==3">
          <el-input v-model="formConfig.newFormCode" maxlength="40"></el-input>
        </el-form-item>
        <el-form-item label="表单名称" prop="newFormName" v-if="formConfig.saveType==3">
          <el-input v-model="formConfig.newFormName" maxlength="50"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveForm">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>

<script>
import DField from './package/d-field/d-field.vue'
import OptionForm from './option-form.vue'
import draggable from 'vuedraggable'
import _ from 'lodash'
import formBaseConfig from './form-base-config'
export default {
  name: 'DForm',
  components: {
    DField,
    draggable,
    OptionForm
  },
  methods: {
    clearForm () {
      this.$refs['formConfig'].clearValidate()
    },
    initForm (editableMode, formId) {
      var _config = _.cloneDeep(formBaseConfig)
      for (let i in _config) {
        this[i] = _config[i]
      }
      this.editableMode = editableMode
      if (editableMode) {
        this.queryForm(formId)
      }
    },
    getItemClass (item) {
      var class_ = {
        allrow: item.allrow
      }
      class_['col' + item.cols] = true
      if (item === this.curField) {
        class_.select = true
      }
      class_.hidden = item.hidden
      return class_
    },
    onDragEnd () {
      this.formField = _.cloneDeep(this.formField)
    },
    onDragStart () {
      this.clearCurrentField()
      this.disabled = true
    },
    removeField (index) {
      this.$confirm('确认要删除该字段吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.currentField = null
        if (this.formField[index].fieldId) {
          this.removedField.push(this.formField[index].fieldId)
          delete this.removedData[this.formField[index].fieldId]
        }
        this.formField.splice(index, 1)
      })
    },
    removeFieldData (field, data) {
      if (field.fieldId && data.dataId) {
        if (this.removedData[field.fieldId]) {
          this.removedData[field.fieldId].push(data.dataId)
        } else {
          this.removedData[field.fieldId] = [data.dataId]
        }
      }
    },
    setCurrentField (index) {
      this.curField = this.formField[index]
    },
    clearCurrentField () {
      this.curField = null
    },
    openDialog () {
      if (this.formField.length === 0) {
        this.$message({
          type: 'warning',
          message: '请配置表单内容！'
        })
      } else {
        this.dialogVisible = true
      }
    },
    saveForm () {

    }
  },
  data () {
    return _.cloneDeep(formBaseConfig)
  }
}
</script>
<style scoped>
.form-containter{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.el-menu{
  height: 100%;
}
.tools{
  height: auto !important;
  padding-top: 5px;
  border-bottom-color: rgb(230, 230, 230);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}
.option-form{
  width: 300px !important;
  border-left-color: rgb(230, 230, 230);
  border-left-style: solid;
  border-left-width: 1px;
  padding-top: 20px;
}
.form-item{
  box-sizing: border-box;
  display: inline-block;
  position: relative;
  width: 25%;
  padding-right: 5px;
}
.form-item.allrow{
  display: block;
}
.form-item.select{
  border-left-color: #67C23A;
  border-left-style: solid;
  border-left-width: 2px;
}
.form-item.hidden{
  background-color: #E4E7ED;
}
.form-item.col1{
  width: 25%;
}
.form-item.col2{
  width: 50%;
}
.form-item.col3{
  width: 75%;
}
.form-item.col4{
  width: 100%;
}
.remove-field{
  font-size: 2px;
  color: #F56C6C;
  position: absolute;
  right: -6px;
  top: -6px;
  z-index: 1000;
  cursor: pointer;
}
</style>

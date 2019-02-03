<template>
  <el-container class="container">
    <el-aside width="240px">
      <div class="context-menu" :style="contextStyle">
        <div @click="add"><i class="context add el-icon-plus"></i>新增</div>
        <div @click="edit"><i class="context edit el-icon-edit"></i>修改</div>
        <div @click="remove"><i class="context delete el-icon-delete"></i>删除</div>
      </div>
      <el-tree
        ref="tree"
        :data="data"
        :props="defaultProps"
        node-key="id"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="hideContextMenu"
        @node-contextmenu="onTreeContextmenu"
      ></el-tree>
    </el-aside>
    <el-main>Main</el-main>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="40%"
      :show-close="false">
      <el-form :model="dept" :rules="rules" ref="dept" label-width="100px">
        <el-form-item label="名称" prop="label">
          <el-input v-model="dept.label"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'dept-manage',
  data () {
    return {
      dialogTitle: '',
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      contextStyle: {},
      contextItem: null,
      contextNode: null,
      dept: {
        label: ''
      },
      rules: {
        name: [
          { required: true, message: '请输名称名称', trigger: 'blur' },
          { max: 10, message: '长度要小于10个字符', trigger: 'blur' }
        ]
      },
      id: 4,
      data: [{
        label: '一级 1',
        id: 1,
        children: [{
          label: '二级 1-1',
          id: 2,
          children: [{
            id: 3,
            label: '三级 1-1-1'
          }]
        }]
      }]
    }
  },
  methods: {
    hideContextMenu () {
      this.contextStyle.display = 'none'
      document.removeEventListener('click', this.hideContextMenu)
    },
    onTreeContextmenu (event, data, node, el) {
      this.contextItem = data
      this.contextNode = node
      this.$refs.tree.setCurrentNode(node)
      this.contextStyle = {
        top: event.pageY + 'px',
        left: event.pageX + 'px',
        display: 'initial'
      }
      document.addEventListener('click', this.hideContextMenu)
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    add () {
      this.dialogTitle = '新增'
      this.dialogVisible = true
      this.dept = {
        label: ''
      }
    },
    edit () {
      this.dialogTitle = '修改'
      this.dialogVisible = true
      this.dept = _.cloneDeep(this.contextItem)
    },
    remove () {
      const parent = this.contextNode.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.label === this.contextItem.label)
      children.splice(index, 1)
    },
    save () {
      if (this.dialogTitle === '新增') {
        if (!this.contextItem.children) {
          this.$set(this.contextItem, 'children', [])
        }
        const dept = _.cloneDeep(this.dept)
        dept.id = this.id
        this.id++
        this.contextItem.children.push(dept)
      } else {
        const parent = this.contextNode.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex(d => d.id === this.contextItem.id)
        children.splice(index, 1, this.dept)
      }
      this.dialogVisible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
  .el-aside{
    border-right: 1px solid rgb(230, 230, 230);
  }
  .context-menu{
    position: absolute;
    display: none;
    z-index: 1000;
    font-size: 14px;
    background-color: #FFFFFF;
    cursor: pointer;
    box-shadow: 2px 2px 19px #aaa;
    &>div{
      padding: 5px 10px;
      border-bottom: 1px solid rgb(230, 230, 230);
    }
    .context{
      margin-right: 5px;
    }
  }
  .add{
    color: #67C23A;
  }
  .edit{
    color: #E6A23C;
  }
  .delete{
    color: #F56C6C;
  }
}
</style>

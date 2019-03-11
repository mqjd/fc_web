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
        :data="treeData"
        :props="defaultProps"
        node-key="deptId"
        default-expand-all
        highlight-current
        :expand-on-click-node="false"
        @node-click="hideContextMenu"
        @node-contextmenu="onTreeContextmenu"
      ></el-tree>
    </el-aside>
    <el-main>
      <el-input placeholder="请输入科室代码或名称" style="width:200px" v-model="searchText"></el-input>
      <el-table
        stripe
        :data="tableData_"
        style="width: 100%">
        <el-table-column
          prop="deptCode"
          label="科室代码"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptName"
          label="科室名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deptHead"
          label="科室领导">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
    <el-dialog
      :title="dialogTitle"
      :visible="dialogVisible"
      width="400px"
      :show-close="false">
      <el-form :model="dept" :rules="rules" ref="dept" label-width="100px">
        <el-form-item label="科室编码" prop="label">
          <el-input v-model="dept.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="科室名称" prop="label">
          <el-input v-model="dept.deptName"></el-input>
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
        label: 'deptName'
      },
      contextStyle: {},
      contextItem: [],
      contextNode: [],
      dept: {
        label: ''
      },
      rules: {
        deptCode: [
          { required: true, message: '请输科室代码', trigger: 'blur' },
          { max: 10, message: '长度要小于20个字符', trigger: 'blur' }
        ],
        deptName: [
          { required: true, message: '请输科室名称', trigger: 'blur' },
          { max: 10, message: '长度要小于50个字符', trigger: 'blur' }
        ]
      },
      id: 4,
      treeData: null,
      tableData: null,
      searchText: ''
    }
  },
  mounted () {
    this.queryDept()
  },
  computed: {
    tableData_ () {
      if (this.searchText) {
        return this.tableData.filter(item => item.deptCode.includes(this.searchText) || item.deptName.includes(this.searchText))
      } else {
        return this.tableData
      }
    }
  },
  methods: {
    queryDept () {
      let me = this
      this.$http.get('/SysDeptController/queryAll', {
        params: {
        }
      })
        .then(function (response) {
          me.tableData = response.data.tableData
          me.treeData = response.data.treeData
        })
    },
    hideContextMenu () {
      this.contextStyle.display = 'none'
      document.removeEventListener('click', this.hideContextMenu)
    },
    onTreeContextmenu (event, data, node, el) {
      this.contextItem = data
      this.contextNode = node
      this.$refs.tree.setCurrentNode(node)
      const treeBound = this.$refs.tree.$el.getBoundingClientRect()
      this.contextStyle = {
        top: event.pageY - treeBound.top + 'px',
        left: event.pageX - treeBound.left + 'px',
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
        deptId: null,
        deptName: '',
        deptCode: '',
        deptHead: '',
        pDeptId: this.contextItem.deptId
      }
    },
    edit () {
      this.dialogTitle = '修改'
      this.dialogVisible = true
      this.dept = _.cloneDeep(this.contextItem)
    },
    remove () {
      let me = this
      this.$confirm('确定要删除该科室吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get('/SysDeptController/removeDept', {
          params: this.contextItem
        })
          .then(function (response) {
            me.queryDept()
            me.$message({
              type: 'success',
              message: '操作成功!'
            })
          })
      })
    },
    save () {
      let me = this
      this.$http.get('/SysDeptController/saveDept', {
        params: this.dept
      })
        .then(function (response) {
          me.dialogVisible = false
          me.$message({
            type: 'success',
            message: '操作成功!'
          })
          me.queryDept()
        })
    },
    handleEdit (index, row) {
      console.log(index, row)
    },
    handleDelete (index, row) {
      console.log(index, row)
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

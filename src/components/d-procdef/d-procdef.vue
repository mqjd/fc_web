<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        unique-opened
      >
        <el-submenu v-for="(items, index) in procmodel" :index="index+''" :key="index">
          <template slot="title">{{items.text}}</template>
          <el-menu-item v-for="(item, index_) in items.child" :index="index+'-'+index_" :key="index+'-'+index_">
            {{item.text}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <div class="procpanel">
          <d-procmodel
            v-for="(item, index) in procmodels"
            :key="index"
            :options="item"
            :instance="instance"
            @click.native="setCurrentProcmodel(index)"
          >
          </d-procmodel>
        </div>
      </el-main>
      <el-aside class="option-form">
        <option-form :config="curProcmodel" v-if="curProcmodel!==null"></option-form>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import procmodel from './procmodel-base-config.js'
import OptionForm from './option-form'
import jsplumb from 'jsplumb'
import DProcmodel from './package/d-procmodel/d-procmodel.vue'
export default {
  name: 'DProcdef',
  components: {
    DProcmodel,
    OptionForm
  },
  created: function () {
    this.initInstance()
    this.initListener()
  },
  data () {
    return {
      procmodel: procmodel,
      curProcmodel: null,
      connections: [],
      instance: null,
      procmodels: [{
        type: 'startevent',
        position: [10, 10],
        point: {
          source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      }, {
        type: 'usertask',
        text: '用户任务',
        position: [210, 210],
        point: {
          both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      }, {
        type: 'endevent',
        position: [510, 510],
        point: {
          target: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      }]
    }
  },
  methods: {
    initInstance () {
      const { jsPlumb } = jsplumb
      this.instance = jsPlumb.getInstance({
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        ConnectionOverlays: [
          [ 'Arrow', {
            location: 1,
            visible: true,
            width: 11,
            length: 11
          } ],
          [ 'Label', {
            location: 0.5,
            id: 'label',
            cssClass: 'aLabel',
            events: {
              tap: function (labelOverlay, originalEvent) {
                alert('hey')
              }
            }
          }]
        ],
        Container: 'canvas'
      })
      this.instance.registerConnectionType('basic', {
        connector: 'StateMachine',
        paintStyle: { stroke: 'red', strokeWidth: 4 },
        hoverPaintStyle: { stroke: 'blue' },
        overlays: [
          'Arrow'
        ]
      })
    },
    initListener () {
      var me = this
      me.instance.bind('beforeDrop', function (info) {
        const { sourceId, targetId } = info
        const index = me.connections.findIndex(function (item) {
          return item.sourceId === sourceId && item.targetId === targetId && item.id !== info.connection.id
        })
        if (index !== -1) {
          me.$message({
            type: 'warning',
            message: '连线重复!'
          })
        }
        return index === -1
      })
      me.instance.bind('connection', function (info, originalEvent) {
        const { sourceId, targetId } = info
        const sourceUuid = info.sourceEndpoint.getUuid()
        const targetUuid = info.targetEndpoint.getUuid()
        var connection = info.connection
        me.addConnection(sourceId, targetId, sourceUuid, targetUuid, connection.id)
        connection.bind('dblclick', me.dbClickConnection)
        info.connection.getOverlay('label').setLabel(info.connection.sourceId.substring(8) + '-' + info.connection.targetId.substring(8))
      })

      me.instance.bind('connectionDetached', function (info, originalEvent) {
        me.removeConnection(info.connection.id)
      })
      me.instance.bind('connectionMoved', function (info, originalEvent) {
        me.removeConnection(info.connection.id)
        const { newSourceId, newTargetId } = info
        const newSourceUuid = info.newSourceEndpoint.getUuid()
        const newTargetUuid = info.newTargetEndpoint.getUuid()
        var connection = info.connection
        me.addConnection(newSourceId, newTargetId, newSourceUuid, newTargetUuid, connection.id)
      })
    },
    addConnection (sourceId, targetId, sourceUuid, targetUuid, id) {
      this.connections.push({
        id,
        sourceId,
        targetId,
        sourceUuid,
        targetUuid
      })
    },
    removeConnection (id) {
      var index = this.connections.findIndex(function (item) {
        return item.id === id
      })
      this.connections.splice(index, 1)
    },
    dbClickConnection (conn) {
      var me = this
      me.$confirm('确认要删除连线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.instance.deleteConnection(conn)
        me.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    setCurrentProcmodel (index) {
      this.curProcmodel = this.procmodels[index]
    }
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
.procpanel{
  width: 100%;
  height: 100%;
  position: relative;
}
.option-form{
  width: 300px !important;
  border-left-color: rgb(230, 230, 230);
  border-left-style: solid;
  border-left-width: 1px;
  padding-top: 20px;
}
</style>

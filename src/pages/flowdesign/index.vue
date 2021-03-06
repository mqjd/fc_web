<template>
  <el-container class="container">
    <el-aside class="model-aside">
      <el-collapse accordion>
        <el-collapse-item
          v-for="(item, index) of procBaseModels"
          :key="index"
          :title="item.text"
          :name="index">
          <div class="collapse-panel">
            <proc-model
              v-for="(child, index) of item.child"
              :key="index"
              :options="child"
              :isModel="false"
              draggable="true"
              @dragstart.native="onDragStart($event, child)"
            >
            </proc-model>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-aside>
    <el-container>
      <el-main
        @click.native="setProcInfo"
      >
        <div
          class="procpanel"
          ref="procpanel"
          @dragover="onDragover($event)"
          @drop="onDragEnd($event)"
        >
          <proc-model
            v-for="(item, index) of procModels"
            :key="item.id"
            :options="item"
            @click.native.stop="setCurrentProcmodel(item)"
            @dblclick.native.stop="removeProcmodel(index)"
          >
          </proc-model>
        </div>
      </el-main>
      <el-aside class="option-form">
        <option-form :config="curProcModel" :deploy="deploy" v-if="curProcModel!==null"></option-form>
      </el-aside>
    </el-container>
  </el-container>
</template>
<script>
import { models } from './procmodel-base-config.js'
import ProcModel from './package/ProcModel'
import OptionForm from './option-form'
import draggable from 'vuedraggable'
import { jsPlumb } from 'jsplumb'
import _ from 'lodash'
export default {
  name: 'flowDesign',
  components: {
    draggable,
    ProcModel,
    OptionForm
  },
  provide () {
    this.initInstance()
    return {
      instance: this.instance
    }
  },
  computed: {
    connectionOverlay () {
      return this.curProcModel ? this.curProcModel.text : ''
    }
  },
  watch: {
    connectionOverlay: {
      handler (newVal, oldVal) {
        if (this.curProcModel && this.curProcModel.type === 'connection' && newVal !== undefined && oldVal !== undefined) {
          const overlay = this.instance.getConnections({
            scope: 'default',
            source: this.curProcModel.sourceId,
            target: this.curProcModel.targetId
          }).filter(item => item.id === this.curProcModel.id)[0].getOverlay('label')
          if (newVal !== overlay.getLabel()) {
            overlay.setLabel(newVal)
          }
        }
      },
      deep: true
    }
  },
  created: function () {
    this.initListener()
  },
  mounted () {
    this.setProcInfo()
  },
  data () {
    return {
      procBaseModels: models,
      procModels: [],
      connections: [],
      instance: null,
      draggingItem: null,
      curProcModel: null,
      procInfo: {
        text: '',
        type: 'flow',
        flag: '',
        version: 1
      },
      id: 1
    }
  },
  methods: {
    onDragStart (event, item) {
      this.draggingItem = _.cloneDeep(item)
      this.draggingItem.position = [event.offsetX, event.offsetY]
    },
    onDragEnd (ev) {
      ev.preventDefault()
      const procpanelBound = this.$refs.procpanel.getBoundingClientRect()
      this.draggingItem.id = this.draggingItem.type + '_' + this.id
      const x = ev.clientX - procpanelBound.left - this.draggingItem.position[0]
      const y = ev.clientY - procpanelBound.top - this.draggingItem.position[1]
      this.draggingItem.position = [x, y]
      this.id++
      this.procModels.push(this.draggingItem)
      this.setCurrentProcmodel(this.draggingItem)
    },
    onDragover (ev) {
      ev.preventDefault()
    },
    initInstance () {
      this.instance = jsPlumb.getInstance({
        Scope: 'default',
        DragOptions: { cursor: 'pointer', zIndex: 2000 },
        ConnectionOverlays: [
          [ 'Arrow', {
            location: 1,
            visible: true,
            width: 6,
            length: 6
          } ],
          [ 'Label', {
            location: 0.5,
            id: 'label',
            cssClass: 'aLabel'
          }]
        ],
        Container: '.procpanel'
      })
      this.instance.registerConnectionType('basic', {
        connector: 'Continuous',
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
        connection.bind('click', me.clickConnection)
        me.setConnection(connection.id)
      })

      me.instance.bind('connectionDetached', function (info, originalEvent) {
        me.removeConnection(info.connection.id)
        me.removeCurrentProcmodel()
      })
      me.instance.bind('connectionMoved', function (info, originalEvent) {
        me.removeConnection(info.connection.id)
        const { newSourceId, newTargetId } = info
        const newSourceUuid = info.newSourceEndpoint.getUuid()
        const newTargetUuid = info.newTargetEndpoint.getUuid()
        var connection = info.connection
        me.addConnection(newSourceId, newTargetId, newSourceUuid, newTargetUuid, connection.id)
        me.setConnection(connection.id)
      })
    },
    addConnection (sourceId, targetId, sourceUuid, targetUuid, id) {
      this.connections.push({
        id,
        sourceId,
        targetId,
        sourceUuid,
        targetUuid,
        text: '',
        type: 'connection'
      })
    },
    removeConnection (id) {
      var index = this.connections.findIndex(function (item) {
        return item.id === id
      })
      this.connections.splice(index, 1)
    },
    setConnection (id) {
      var index = this.connections.findIndex(function (item) {
        return item.id === id
      })
      this.setCurrentProcmodel(this.connections[index])
    },
    setProcInfo () {
      this.setCurrentProcmodel(this.procInfo)
    },
    clickConnection (obj, event) {
      event.stopPropagation()
      let conn = obj
      if (obj.component) {
        conn = obj.component
      }
      const id = conn.id
      this.setConnection(id)
    },
    dbClickConnection (obj, event) {
      event.stopPropagation()
      var me = this
      let conn = obj
      if (obj.component) {
        conn = obj.component
      }
      me.$confirm('确认要删除连线吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.instance.deleteConnection(conn)
      })
    },
    setCurrentProcmodel (model) {
      this.curProcModel = model
    },
    removeCurrentProcmodel () {
      this.curProcModel = null
    },
    removeProcmodel (index) {
      var me = this
      me.$confirm('确认要删除该组件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.instance.remove(me.procModels[index].id)
        me.procModels.splice(index, 1)
        me.removeCurrentProcmodel()
      })
    },
    setZoom (event) {
    },
    deploy () {
      let me = this
      this.$http.post('/ProcessManageController/deploy', {
        param: JSON.stringify({
          models: this.procModels,
          connections: this.connections,
          processInfo: this.procInfo
        })
      })
        .then(function (response) {
          me.$message({
            type: 'success',
            message: '操作成功!'
          })
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.container{
  height: 100%;
}
.dragging-item{
  position: absolute;
  display: none;
}
.el-container{
  height: 100%;
  .model-aside{
    border-right-color: rgb(230, 230, 230);
    border-right-style: solid;
    border-right-width: 1px;
    width: 220px !important;
    padding: 0px 10px;
    .el-collapse{
      width: auto;
      .collapse-panel{
        display: flex;
        justify-content: space-around;
        padding: 10px;
      }
    }
  }
  .el-main{
    padding: 0px;
    height: 100%;
    .procpanel{
      width: 150%;
      height: 150%;
      position: relative;
    }
  }
  .option-form{
    position: relative;
    padding: 5px;
    border-left-color: rgb(230, 230, 230);
    border-left-style: solid;
    border-left-width: 1px;
  }
}
</style>

<template>
  <el-container>
    <d-procmodel
      ref="tempProcmodel"
      class="draging-item"
      :style="position"
      :options="dragingProcmodel||tempProcmodel"
    >
    </d-procmodel>
    <el-aside width="200px">
      <el-menu
        unique-opened
      >
        <el-submenu v-for="(items, index) in procmodel" :index="index+''" :key="index">
          <template slot="title">{{items.text}}</template>
          <el-menu-item v-for="(item, index_) in items.child" :index="index+'-'+index_" :key="index+'-'+index_">
            <div
              onselectstart="return false;"
              @mousedown="ondragstart($event, item)"
            >{{item.text}}</div>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <div class="procpanel" ref="procpanel">
          <d-procmodel
            v-for="(item, index) in procmodels"
            :key="item.id"
            :options="item"
            :instance="instance"
            @click.native="setCurrentProcmodel(index)"
            @dblclick.native="removeProcmodel(index)"
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
import _ from 'lodash'
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
      curIndex: 1,
      draging: false,
      dragingProcmodel: null,
      tempProcmodel: {
        type: 'startevent',
        position: [10, 10],
        point: {
          source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      },
      procmodel: procmodel,
      curProcmodel: null,
      connections: [],
      curPosition: null,
      instance: null,
      procmodels: []
    }
  },
  computed: {
    position () {
      if (this.curPosition) {
        return {
          left: this.curPosition.x + 'px',
          top: this.curPosition.y + 'px'
        }
      } else {
        return {
          'z-index': '-1',
          left: '-100px',
          top: '-100px'
        }
      }
    }
  },
  methods: {
    ondragstart (event, item) {
      const me = this
      me.draging = true
      me.dragingProcmodel = _.cloneDeep(item)
      var tempProcmodel = this.$refs.tempProcmodel
      me.curPosition = {
        x: event.clientX,
        y: event.clientY
      }
      const divHeightHalf = tempProcmodel.$el.scrollHeight / 2
      const divWidthHalf = tempProcmodel.$el.scrollWidth / 2
      me.curPosition = {
        x: event.clientX - divWidthHalf,
        y: event.clientY - divHeightHalf
      }
      document.onmousemove = function (ev) {
        me.curPosition = {
          x: ev.clientX - divWidthHalf,
          y: ev.clientY - divHeightHalf
        }
      }
      document.onmouseup = function (ev) {
        me.curPosition = null
        me.draging = false
        var procpanel = me.$refs.procpanel
        const procpanelHeight = procpanel.parentNode.offsetHeight
        const procpanelWidth = procpanel.parentNode.offsetWidth
        const left = ev.clientX - divWidthHalf - procpanel.offsetLeft
        const top = ev.clientY - divHeightHalf - procpanel.offsetTop
        if (left >= 0 && left <= procpanelWidth - divWidthHalf && top >= 0 && top <= procpanelHeight - divHeightHalf) {
          var procmodel = _.cloneDeep(item)
          procmodel.position = [
            left + procpanel.parentNode.scrollLeft,
            top + procpanel.parentNode.scrollTop
          ]
          procmodel.id = procmodel.type + '_' + me.curIndex
          me.curIndex++
          me.procmodels.push(procmodel)
          me.curProcmodel = procmodel
        }
        me.dragingProcmodel = null
        document.onmousemove = null
        document.onmouseup = null
      }
    },
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
            cssClass: 'aLabel'
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
        connection.bind('click', me.clickConnection)
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
        targetUuid,
        text: ''
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
      this.curProcmodel = this.connections[index]
    },
    clickConnection (obj) {
      let conn = obj
      if (obj.component) {
        conn = obj.component
      }
      const id = conn.id
      this.setConnection(id)
    },
    dbClickConnection (obj) {
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
        me.$message({
          type: 'success',
          message: '删除成功!'
        })
      })
    },
    setCurrentProcmodel (index) {
      this.curProcmodel = this.procmodels[index]
    },
    removeProcmodel (index) {
      var me = this
      me.$confirm('确认要删除该组件吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        me.instance.remove(me.procmodels[index].id)
        me.procmodels.splice(index, 1)
        me.curProcmodel = null
        if (me.procmodels.length === 0) {
          me.curIndex = 1
        }
      })
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
.el-main{
  padding: 0px;
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
  padding: 20px 10px 20px 0px;
}
.draging-item{
  position: absolute;
}
</style>

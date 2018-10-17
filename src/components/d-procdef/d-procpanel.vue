<template>
  <div class="container">
    <d-procmodel v-for="(item, index) in procmodels" :key="index" :options="item" :instance="instance"></d-procmodel>
  </div>
</template>

<script>
import jsplumb from 'jsplumb'
import DProcmodel from './package/d-procmodel/d-procmodel.vue'
export default {
  name: 'DProcpanel',
  components: {
    DProcmodel
  },
  created: function () {
    this.initInstance()
    this.initListener()
  },
  data () {
    return {
      connections: [],
      instance: null,
      procmodels: [{
        position: [10, 10],
        point: {
          source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      }, {
        position: [210, 210],
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
        if (sourceId === targetId) {
          return false
        }
        var index = me.connections.findIndex(function (item) {
          return item.sourceId === sourceId && item.targetId === targetId
        })
        return index === -1
      })
      me.instance.bind('connection', function (info, originalEvent) {
        const { sourceId, targetId } = info
        const sourceUuid = info.sourceEndpoint.getUuid()
        const targetUuid = info.targetEndpoint.getUuid()
        me.addConnection(sourceId, targetId, sourceUuid, targetUuid)
        var connection = info.connection
        connection.bind('dblclick', me.dbClickConnection)
        info.connection.getOverlay('label').setLabel(info.connection.sourceId.substring(8) + '-' + info.connection.targetId.substring(8))
      })

      me.instance.bind('connectionDetached', function (info, originalEvent) {
        const sourceUuid = info.sourceEndpoint.getUuid()
        const targetUuid = info.targetEndpoint.getUuid()
        me.removeConnection(sourceUuid, targetUuid)
      })
      me.instance.bind('connectionMoved', function (info, originalEvent) {
        const sourceUuid = info.originalSourceEndpoint.getUuid()
        const targetUuid = info.originalTargetEndpoint.getUuid()
        me.removeConnection(sourceUuid, targetUuid)
        const { newSourceId, newTargetId } = info
        const newSourceUuid = info.newSourceEndpoint.getUuid()
        const newTargetUuid = info.newTargetEndpoint.getUuid()
        me.addConnection(newSourceId, newTargetId, newSourceUuid, newTargetUuid)
      })
    },
    addConnection (sourceId, targetId, sourceUuid, targetUuid) {
      this.connections.push({
        sourceId,
        targetId,
        sourceUuid,
        targetUuid
      })
    },
    removeConnection (sourceUuid, targetUuid) {
      var index = this.connections.findIndex(function (item) {
        return item.sourceUuid === sourceUuid && item.targetUuid === targetUuid
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
    }
  }
}
</script>
<style scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
}
</style>

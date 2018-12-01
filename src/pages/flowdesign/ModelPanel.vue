<template>
  <div class="model-panel">
    <el-collapse v-model="activeName" class="model-panel" accordion>
      <el-collapse-item v-for="(item,index) in procmodels" :key="index" :title="item.text" :name="index">
        <svg class="model-panel__" width="200" :height="item.height">
          <procmodel
            v-for="child in item.child"
            :key="child.type"
            :options="child"
            :clone="true"
            @drag="drag(item, $event)"
          >
          </procmodel>
        </svg>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import Procmodel from './procmodel'
export default {
  name: 'modelPanel',
  components: {
    Procmodel
  },
  props: {
    procmodels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      activeName: '1'
    }
  },
  methods: {
    drag (item, event) {
      item.x = event.x
      item.y = event.y
    }
  }
}
</script>
<style lang="scss">
.model-panel{
  .el-collapse-item__content{
    padding: 0px !important;
  }
}
</style>

<style lang="scss" scoped>
.model-panel__{
  display: block;
}
</style>

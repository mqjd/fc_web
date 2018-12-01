<template>
  <div class="flow-design">
    <model-panel :procmodels="procmodels"></model-panel>
    <chart-panel :procmodels="chartmodels"></chart-panel>
    <div class="option-form"></div>
  </div>
</template>
<script>
import procmodels from './procmodel-base-config.js'
import ModelPanel from './ModelPanel'
import ChartPanel from './ChartPanel'
export default {
  name: 'flowDesign',
  components: {
    ModelPanel,
    ChartPanel
  },
  mounted () {
  },
  data () {
    return {
      procmodels: procmodels,
      chartmodels: [{
        type: 'user-task',
        text: '用户任务',
        assign: '',
        formKey: '',
        width: 80,
        height: 60,
        x: 55,
        y: 40,
        point: {
          both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
        }
      }]
    }
  },
  methods: {
    addModelBefore () {

    },
    addModelDragging () {

    },
    addModelAfter () {

    },
    modelDrag (item) {
    }
  }
}
</script>
<style lang="scss" scoped>
.flow-design{
  width: 100%;
  height: 100%;
  display: flex;
  .model-panel{
    padding: 0px 10px;
    width: 200px;
  }
  .main{
    flex: 1;
    border-left: 1px solid rgb(230, 230, 230);
    border-right: 1px solid rgb(230, 230, 230);
  }
  .option-form{
    width: 200px;
  }
}
</style>

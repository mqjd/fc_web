<template>
  <div class="flow-design">
    <model-panel :procmodels="procmodels"></model-panel>
    <div class="main"></div>
    <div class="option-form"></div>
  </div>
</template>
<script>
import procmodels from './procmodel-base-config.js'
import ModelPanel from './ModelPanel'
export default {
  name: 'flowDesign',
  components: {
    ModelPanel
  },
  data () {
    return {
      procmodels: procmodels
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

<template>
  <div class="cell-container">
    <div class="cell-content" cellpadding="0">
      <div class="x-cell" :style="{'text-align': textAlign, 'vertical-align': verticalAlign}">
        {{ text }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'x-content',
  props: {
    text: {
      type: String
    },
    textAlign: {
      type: String,
      default: 'left'
    },
    verticalAlign: {
      type: String,
      default: 'top'
    }
  }
}
</script>
<style lang="scss" scoped>
.cell-container, .cell-content{
  width: 100%;
  height: 100%;
}
.cell-content{
  display: table;
  .x-cell{
    display: table-cell;
  }
}
</style>

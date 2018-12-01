<template>
  <circle :r="r" :cx="x" :cy="y" :class="className"></circle>
</template>
<script>
const PositionRatio = {
  'TopCenter': {
    x: 0.5,
    y: 0
  },
  'BottomCenter': {
    x: 0,
    y: 0.5
  },
  'LeftMiddle': {
    x: 0.5,
    y: 1
  },
  'RightMiddle': {
    x: 1,
    y: 0.5
  }
}
export default {
  name: 'ModelPoint',
  props: {
    r: {
      type: Number,
      default: 6
    },
    type: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    }
  },
  mounted () {
    console.log(this.$props)
  },
  computed: {
    className () {
      return this.type + '-point'
    },
    x () {
      return this.width * PositionRatio[this.position].x
    },
    y () {
      return this.height * PositionRatio[this.position].y
    }
  }
}
</script>
<style lang="scss" scoped>
.model-point{
  position: absolute;
}
.source-point{
  stroke: #7AB02C;
  stroke-width: 1px;
}
.target-point{
  fill: #AA2E25;
}
.both-point{
  fill: #7AB02C;
}
</style>

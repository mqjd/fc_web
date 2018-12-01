<script>
import StartEvent from './StartEvent'
import EndEvent from './EndEvent'
import UserTask from './UserTask'
import Exclusive from './Exclusive'
import Parallel from './Parallel'
import ModelPoint from './ModelPoint'
export default {
  name: 'Procmodel',
  components: {
    StartEvent,
    EndEvent,
    UserTask,
    Exclusive,
    Parallel,
    ModelPoint
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    clone: {
      type: Boolean,
      default: false
    }
  },
  render (createElement) {
    return createElement(
      this.options.type,
      {
        class: 'procmodel',
        props: {
          ...this.options,
          clone: this.clone
        },
        on: {
          start: this.start,
          drag: this.drag,
          end: this.end
        }
      },
      this.clone ? null : this.point.map(item => {
        return createElement(
          'model-point',
          {
            class: 'model-point',
            props: {
              ...this.options,
              ...item,
              r: 6
            }
          }
        )
      })
    )
  },
  computed: {
    point () {
      let result = []
      let points = []
      for (let i in this.options.point) {
        for (let j = 0; j < this.options.point[i].length; j++) {
          const position = this.options.point[i][j]
          if (!points.includes(position)) {
            result.push({
              position: this.options.point[i][j],
              type: i
            })
          } else {
            points.push(position)
          }
        }
      }
      return result
    }
  },
  methods: {
    start (event) {
      this.$emit('start', event)
      return false
    },
    drag (event) {
      this.$emit('drag', event)
    },
    end (event) {
      this.$emit('end', event)
    }
  }
}
</script>
<style lang="scss" scoped>
.procmodel{
  z-index: 20;
  stroke:#707070;
  stroke-width: 1px;
  fill: #FFFFFF;
  fill-opacity:1;
  cursor: pointer;
}
.model-point{
  z-index: 28;
}
</style>

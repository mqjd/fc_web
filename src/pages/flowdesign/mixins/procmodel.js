import { drag } from 'd3-drag'
import { select, event } from 'd3-selection'
import ModelPoint from '../procmodel/ModelPoint'
export default {
  components: {
    ModelPoint
  },
  props: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    text: {
      type: String
    },
    point: {
      type: Object,
      required: true
    },
    clone: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    transform () {
      return 'translate(' + (this.x - this.width / 2) + ',' + (this.y - this.height / 2) + ')'
    }
  },
  mounted () {
    this.bindDrag()
  },
  methods: {
    bindDrag () {
      var me = this
      const drag_ = drag().on('start', function (d) {
        me.$emit('start', event)
      }).on('drag', function (d) {
        me.$emit('drag', event)
      }).on('end', function (d) {
        me.$emit('end', event)
      })
      const obj = select(me.$el)
      obj.call(drag_)
    }
  }
}

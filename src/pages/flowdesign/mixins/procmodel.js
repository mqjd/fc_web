const PositionRatio = {
  'top-middle': {
    x: 0.5,
    y: 0
  },
  'left-middle': {
    x: 0,
    y: 0.5
  },
  'bottom-middle': {
    x: 0.5,
    y: 1
  },
  'right-middle': {
    x: 1,
    y: 0.5
  }
}
export default {
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
    }
  },
  methods: {
    getPositionX (position) {
      return this.width * PositionRatio[position].x
    },
    getPositionY (position) {
      return this.height * PositionRatio[position].y
    }
  }
}

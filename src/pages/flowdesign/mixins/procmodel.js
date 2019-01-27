const connectorPaintStyle = {
  strokeWidth: 1,
  stroke: '#61B7CF',
  joinstyle: 'round',
  outlineStroke: 'white',
  outlineWidth: 2
}
const connectorHoverStyle = {
  strokeWidth: 3,
  stroke: '#216477',
  outlineWidth: 5,
  outlineStroke: 'white'
}
const endpointHoverStyle = {
  fill: '#216477',
  stroke: '#216477'
}
const sourceEndpoint = {
  endpoint: 'Dot',
  paintStyle: {
    stroke: '#7AB02C',
    fill: 'transparent',
    radius: 4,
    strokeWidth: 1
  },
  isSource: true,
  connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
  connectorStyle: connectorPaintStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorHoverStyle: connectorHoverStyle,
  maxConnections: -1,
  dragOptions: {},
  overlays: [
    ['Label', {
      location: [0.5, 1.5],
      label: 'Drag',
      cssClass: 'endpointSourceLabel',
      visible: false
    }]
  ]
}

const targetEndpoint = {
  endpoint: 'Dot',
  paintStyle: { fill: '#B71C1C', radius: 4 },
  connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
  connectorHoverStyle: connectorHoverStyle,
  maxConnections: -1,
  dropOptions: { hoverClass: 'point-hover', activeClass: 'point-active' },
  isTarget: true,
  overlays: [
    ['Label', { location: [0.5, -0.5], label: 'Drop', cssClass: 'endpointTargetLabel', visible: false }]
  ]
}

const sourceAndTargetEndpoint = {
  endpoint: 'Dot',
  paintStyle: { fill: '#7AB02C', radius: 4 },
  connector: ['Flowchart', { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true }],
  connectorStyle: connectorPaintStyle,
  hoverPaintStyle: endpointHoverStyle,
  connectorHoverStyle: connectorHoverStyle,
  maxConnections: -1,
  dropOptions: { hoverClass: 'point-hover', activeClass: 'point-active' },
  isTarget: true,
  isSource: true,
  overlays: [
    ['Label', { location: [0.5, -0.5], label: 'Drop', cssClass: 'endpointTargetLabel', visible: false }]
  ]
}
export default {
  props: {
    options: {
      type: Object
    },
    isModel: {
      type: Boolean,
      default: true
    }
  },
  inject: ['instance'],
  created: function () {
    if (!this.options.position) {
      this.options.position = [0, 0]
    }
  },
  beforeDestory: function () {
    this.instance.remove(this.options.id)
  },
  mounted: function () {
    if (this.isModel) {
      this.initItem()
    }
  },
  computed: {
    position () {
      return {
        left: this.options.position[0] + 'px',
        top: this.options.position[1] + 'px'
      }
    }
  },
  methods: {
    initItem () {
      this.bind()
      this.addPoint()
    },
    bind () {
      var me = this
      this.instance.draggable(this.$el, {
        containment: 'parent',
        grid: [10, 10],
        stop: function (event, ui) {
          me.options.position = event.finalPos
        }
      })
    },
    addPoint () {
      const point = this.options.point
      this.addPoint_(sourceEndpoint, point.source)
      this.addPoint_(targetEndpoint, point.target)
      this.addPoint_(sourceAndTargetEndpoint, point.both)
    },
    addPoint_ (pointConfig, position) {
      var id = this.options.id
      if (position) {
        for (var i = 0; i < position.length; i++) {
          var sourceUUID = id + '_' + position[i]
          this.instance.addEndpoint(this.$el, pointConfig, {
            anchor: position[i],
            uuid: sourceUUID
          })
        }
      }
    }
  }
}

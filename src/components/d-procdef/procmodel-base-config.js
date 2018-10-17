var data = [{
  text: '事件',
  child: [{
    text: '开始',
    type: 'startevent',
    point: {
      source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }, {
    text: '结束',
    type: 'endevent',
    point: {
      target: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }]
}]
export default data

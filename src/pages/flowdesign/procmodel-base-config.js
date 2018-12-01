var data = [{
  text: '事件',
  height: 80,
  child: [{
    text: '开始',
    formKey: '',
    type: 'start-event',
    r: 30,
    x: 50,
    y: 40,
    width: 60,
    height: 60,
    point: {
      source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }, {
    text: '结束',
    type: 'end-event',
    r: 30,
    x: 150,
    y: 40,
    width: 60,
    height: 60,
    point: {
      target: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }]
}, {
  text: '任务',
  height: 80,
  child: [{
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
}, {
  text: '网关',
  height: 80,
  child: [{
    type: 'exclusive',
    text: '分支网关',
    width: 60,
    height: 60,
    x: 50,
    y: 40,
    point: {
      both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }, {
    type: 'parallel',
    text: '并行网关',
    width: 60,
    height: 60,
    x: 150,
    y: 40,
    point: {
      both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }]
}]
export default data

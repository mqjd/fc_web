export const models = [{
  text: '事件',
  child: [{
    text: '开始',
    formKey: '',
    type: 'start-event',
    size: [100, 100],
    position: [0, 0]
  }, {
    text: '结束',
    size: [100, 100],
    type: 'end-event',
    position: [0, 0],
    point: {
      target: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
    }
  }]
}, {
  text: '任务',
  child: [{
    type: 'user-task',
    text: '用户任务',
    flag: '',
    assign: '',
    formKey: '',
    size: [100, 100],
    position: [0, 0]
  }]
}, {
  text: '网关',
  child: [{
    type: 'exclusive',
    text: '分支网关',
    size: [100, 100],
    position: [0, 0]
  }, {
    type: 'parallel',
    text: '并行网关',
    size: [100, 100],
    position: [0, 0]
  }]
}]

export const points = {
  'start-event': {
    source: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
  },
  'end-event': {
    target: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
  },
  'user-task': {
    both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
  },
  'exclusive': {
    both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
  },
  'parallel': {
    both: ['TopCenter', 'BottomCenter', 'LeftMiddle', 'RightMiddle']
  }
}
export default {
  models,
  points
}

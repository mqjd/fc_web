var data = {
  editableMode: false,
  formConfig: {
    saveType: 1
  },
  formRule: {
    formCode: [
      { required: true, message: '请输入表单编码', trigger: 'blur' }
    ],
    formName: [
      { required: true, message: '请输入表单名称', trigger: 'blur' }
    ],
    newFormCode: [
      { required: true, message: '请输入表单编码', trigger: 'blur' }
    ],
    newFormName: [
      { required: true, message: '请输入表单名称', trigger: 'blur' }
    ]
  },
  removedField: [],
  removedData: {},
  dialogVisible: false,
  disabled: true,
  curField: null,
  formFieldOption: {
    group: { name: 'formField', put: 'formBase' },
    ghostClass: 'ghost'
  },
  formBaseOption: {
    group: { name: 'formBase', pull: 'clone' },
    ghostClass: 'ghost',
    sort: false
  },
  formField: [],
  formBaseField: [{
    text: '文本类型',
    child: [{
      type: 'input',
      text: '输入框',
      placeholder: '请输入',
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }, {
      type: 'textarea',
      text: '文本域',
      placeholder: '请输入',
      allrow: true,
      cols: 4,
      required: false,
      hidden: false,
      disabled: false
    }, {
      type: 'number',
      text: '计数器',
      allrow: false,
      cols: 2,
      numberPrecision: 0,
      min: null,
      max: null,
      required: false,
      hidden: false,
      disabled: false
    }]
  }, {
    text: '日期类型',
    child: [{
      type: 'date',
      datetype: 'date',
      text: '日期',
      placeholder: '请输入',
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }, {
      type: 'daterange',
      daterange: 'daterange',
      value: [],
      text: '范围',
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }]
  }, {
    text: '选择类型',
    child: [{
      type: 'radio',
      text: '单选框',
      value: null,
      data: [{
        text: '选择1',
        value: '1'
      }, {
        text: '选择2',
        value: '2'
      }],
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }, {
      type: 'checkbox',
      text: '多选框',
      value: [],
      data: [{
        text: '选择1',
        value: '1'
      }, {
        text: '选择2',
        value: '2'
      }],
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }]
  }, {
    text: '下拉类型',
    child: [{
      type: 'select',
      text: '单选下拉',
      value: '',
      data: [{
        text: '选择1',
        value: '1'
      }, {
        text: '选择2',
        value: '2'
      }],
      placeholder: '请输入',
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }, {
      type: 'mutiselect',
      text: '多选下拉',
      value: [],
      data: [{
        text: '选择1',
        value: '1'
      }, {
        text: '选择2',
        value: '2'
      }],
      placeholder: '请输入',
      allrow: false,
      cols: 2,
      required: false,
      hidden: false,
      disabled: false
    }]
  }]
}

export default data

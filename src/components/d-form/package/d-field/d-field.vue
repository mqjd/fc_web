<template>
  <d-checkbox :config="this.config" :disabled="this.disabled" v-if="config.type=='checkbox'"></d-checkbox>
  <d-date :config="this.config" :disabled="this.disabled" v-else-if="config.type=='date'"></d-date>
  <d-daterange :config="this.config" :disabled="this.disabled" v-else-if="config.type=='daterange'"></d-daterange>
  <d-input :config="this.config" :disabled="this.disabled" v-else-if="config.type=='input'"></d-input>
  <d-mutiselect :config="this.config" :disabled="this.disabled" v-else-if="config.type=='mutiselect'"></d-mutiselect>
  <d-number :config="this.config" :disabled="this.disabled" v-else-if="config.type=='number'"></d-number>
  <d-radio :config="this.config" :disabled="this.disabled" v-else-if="config.type=='radio'"></d-radio>
  <d-select :config="this.config" :disabled="this.disabled" v-else-if="config.type=='select'"></d-select>
  <d-textarea :config="this.config" :disabled="this.disabled" v-else-if="config.type=='textarea'"></d-textarea>
  <div v-else>{{config.text}}</div>
</template>

<script>
import DCheckbox from './d-checkbox.vue'
import DDate from './d-date.vue'
import DDaterange from './d-daterange.vue'
import DInput from './d-input.vue'
import DMutiselect from './d-mutiselect.vue'
import DNumber from './d-number.vue'
import DRadio from './d-radio.vue'
import DSelect from './d-select.vue'
import DTextarea from './d-textarea.vue'
export default {
  name: 'DField',
  components: {
    DInput,
    DCheckbox,
    DDate,
    DDaterange,
    DMutiselect,
    DNumber,
    DRadio,
    DSelect,
    DTextarea
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style scoped>
</style>

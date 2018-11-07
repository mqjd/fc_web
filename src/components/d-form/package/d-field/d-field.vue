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
  render: function (createElement) {
    return createElement(
      'd-' + this.config.type,
      {
        attrs: {
          config: this.config,
          disabled: this.disabled
        }
      },
      this.$slots.default // 子元素数组
    )
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

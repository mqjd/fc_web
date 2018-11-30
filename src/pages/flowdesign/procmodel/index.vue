<script>
import StartEvent from './StartEvent'
import EndEvent from './EndEvent'
import UserTask from './UserTask'
import Exclusive from './Exclusive'
import Parallel from './Parallel'
export default {
  name: 'Procmodel',
  components: {
    StartEvent,
    EndEvent,
    UserTask,
    Exclusive,
    Parallel
  },
  props: {
    options: {
      type: Object,
      required: true
    }
  },
  render (createElement) {
    return createElement(
      this.options.type,
      {
        class: 'procmodel',
        props: this.options
      }
    )
  }
}
</script>
<style lang="scss" scoped>
.procmodel{
  stroke:#707070;
  stroke-width: 1px;
  fill: #FFFFFF;
  fill-opacity:1;
  cursor: pointer;
}
</style>

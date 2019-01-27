<script>
import StartEvent from './StartEvent.vue'
import EndEvent from './EndEvent.vue'
import UserTask from './UserTask.vue'
import Parallel from './Parallel.vue'
import Exclusive from './Exclusive.vue'
export default {
  name: 'ProcModel',
  components: {
    StartEvent,
    EndEvent,
    UserTask,
    Parallel,
    Exclusive
  },
  render (createElement) {
    return createElement(
      this.options.type,
      {
        class: this.isModel ? 'proc-model' : 'aside-model',
        props: {
          options: this.options,
          isModel: this.isModel
        }
      },
      this.$slots.default
    )
  },
  props: {
    options: {
      type: Object
    },
    isModel: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped>
.aside-model{
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 1px solid #212121;
  -moz-border-radius: 0.5em;
  border-radius: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 10px !important;
}
.proc-model {
  font-size: 10px !important;
  word-break: break-word;
  -webkit-user-select:none;
  -moz-user-select:none;
  -ms-user-select:none;
  user-select:none;
  box-sizing: border-box;
  border: 1px solid #212121;
  /* box-shadow: 2px 2px 19px #aaa;
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
  -moz-border-radius: 0.5em; */
  border-radius: 0.5em;
  opacity: 0.8;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-align: center;
  z-index: 20;
  position: absolute;
  background-color: #eeeeef;
  color: black;
  font-family: helvetica, sans-serif;
  padding: 0.5em;
  font-size: 0.9em;
  -webkit-transition: -webkit-box-shadow 0.1s ease-in;
  -moz-transition: -moz-box-shadow 0.1s ease-in;
  -o-transition: -o-box-shadow 0.1s ease-in;
  transition: box-shadow 0.1s ease-in;
}
.proc-model:hover {
  box-shadow: 2px 2px 19px #444;
  -o-box-shadow: 2px 2px 19px #444;
  -webkit-box-shadow: 2px 2px 19px #444;
  -moz-box-shadow: 2px 2px 19px #444;
  opacity: 0.6;
}
</style>

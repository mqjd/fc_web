<template>
  <d-startevent v-if="options.type=='startevent'" :options="options" :instance="instance" class="d-procmodel"></d-startevent>
  <d-endevent v-else-if="options.type=='endevent'" :options="options" :instance="instance" class="d-procmodel"></d-endevent>
  <d-usertask v-else-if="options.type=='usertask'" :options="options" :instance="instance" class="d-procmodel"></d-usertask>
  <d-parallel v-else-if="options.type=='parallel'" :options="options" :instance="instance" class="d-procmodel"></d-parallel>
  <d-exclusive v-else-if="options.type=='exclusive'" :options="options" :instance="instance" class="d-procmodel"></d-exclusive>
  <d-usertask v-else :options="options" :instance="instance" class="d-procmodel"></d-usertask>
</template>
<script>
import DStartevent from './d-startevent.vue'
import DEndevent from './d-endevent.vue'
import DUsertask from './d-usertask.vue'
import DParallel from './d-parallel.vue'
import DExclusive from './d-exclusive.vue'
export default {
  name: 'DProcmodel',
  components: {
    DStartevent,
    DEndevent,
    DUsertask,
    DParallel,
    DExclusive
  },
  props: {
    options: {
      type: Object
    },
    instance: {
      type: Object
    }
  }
}
</script>
<style scoped>
.d-procmodel {
  box-sizing: border-box;
  border: 1px solid #346789;
  box-shadow: 2px 2px 19px #aaa;
  -o-box-shadow: 2px 2px 19px #aaa;
  -webkit-box-shadow: 2px 2px 19px #aaa;
  -moz-box-shadow: 2px 2px 19px #aaa;
  -moz-border-radius: 0.5em;
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
.d-procmodel:hover {
  box-shadow: 2px 2px 19px #444;
  -o-box-shadow: 2px 2px 19px #444;
  -webkit-box-shadow: 2px 2px 19px #444;
  -moz-box-shadow: 2px 2px 19px #444;
  opacity: 0.6;
}
</style>

<template>
  <el-container>
    <el-aside width="200px">
      <el-menu
        unique-opened
      >
        <el-submenu v-for="(items, index) in procmodel" :index="index+''" :key="index">
          <template slot="title">{{items.text}}</template>
          <el-menu-item v-for="(item, index_) in items.child" :index="index+'-'+index_" :key="index+'-'+index_">
            {{item.text}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-main>
        <d-procpanel></d-procpanel>
      </el-main>
      <el-aside width="200px">rAside</el-aside>
    </el-container>
  </el-container>
</template>

<script>
import procmodel from './procmodel-base-config.js'
import DProcpanel from './d-procpanel.vue'
export default {
  name: 'DProcdef',
  components: {
    DProcpanel
  },
  data () {
    return {
      procmodel: procmodel
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.form-containter{
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}
.el-menu{
  height: 100%;
}
</style>

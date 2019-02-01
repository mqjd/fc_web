<template>
  <el-container>
    <el-aside class="aside">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header style="height:50px;">
        <app-header></app-header>
      </el-header>
      <el-main>
        <tag-main></tag-main>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import SideMenu from './component/SideMenu'
import AppHeader from './component/Header'
import TagMain from './component/TagMain'
export default {
  name: 'Main',
  components: {
    SideMenu,
    AppHeader,
    TagMain
  },
  data () {
    return {
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.aside{
  width: auto !important;
}
</style>

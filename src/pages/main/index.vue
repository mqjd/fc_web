<template>
  <el-container id="main">
    <el-aside class="aside">
      <side-menu></side-menu>
    </el-aside>
    <el-main>
      <app-header></app-header>
      <tag-main></tag-main>
    </el-main>
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
#main{
  height: 100%;
  .aside{
    width: auto !important;
  }
  .el-main{
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 0px;
  }
}
</style>

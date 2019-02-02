<template>
  <el-container class="container">
    <el-aside class="aside">
      <side-menu></side-menu>
    </el-aside>
    <el-container class="main">
      <el-header style="height:50px;">
        <app-header></app-header>
      </el-header>
      <el-container direction="vertical" class="tag-container">
        <el-header class="tag-view" v-if="tags.visitedPages.length!=0">
          <tag-header></tag-header>
        </el-header>
        <el-container class="tag-main">
          <tag-main></tag-main>
        </el-container>
      </el-container>
    </el-container>
  </el-container>
</template>
<script>
import SideMenu from './component/SideMenu'
import AppHeader from './component/Header'
import TagMain from './component/TagMain'
import TagHeader from './component/TagMain/TagHeader'
import { mapGetters } from 'vuex'
export default {
  name: 'Main',
  components: {
    SideMenu,
    AppHeader,
    TagMain,
    TagHeader
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'tags'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container{
  height: 100%;
  .aside{
    width: auto !important;
  }
  .main{
    height: 100%;
    .tag-container{
      width: 100%;
      overflow: hidden;
    }
    .tag-view{
      z-index: 1;
      position: relative;
      box-sizing: border-box;
      height: 34px !important;
      padding: 4px 0px;
      border-bottom: 1px solid #d8dce5;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    }
    .tag-main{
      -ms-flex-direction: column;
      flex-direction: column;
      overflow: auto;
    }
  }
}

</style>

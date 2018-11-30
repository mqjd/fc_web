<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="acitveKey"
    class="side-menu"
  >
    <side-menu-item
      v-for="item of pageperm"
      v-if="!item.hidden"
      :key="item.name"
      :item="item">
    </side-menu-item>
  </el-menu>
</template>
<script>
import { mapGetters } from 'vuex'
import SideMenuItem from './SideMenuItem.vue'
export default {
  name: 'SideMenu',
  components: {
    SideMenuItem
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sidemenu',
      'pageperm'
    ]),
    isCollapse () {
      return this.sidemenu.collapse
    },
    acitveKey () {
      return this.$route.name
    }
  }
}
</script>
<style lang="scss" scoped>
.side-menu{
  height: 100%;
  border-right: 1px solid rgb(230, 230, 230);
}
.side-menu:not(.el-menu--collapse) {
  width: 200px;
}
</style>

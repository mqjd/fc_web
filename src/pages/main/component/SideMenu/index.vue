<template>
  <el-menu
    :collapse="isCollapse"
    :default-active="acitveKey"
    class="side-menu"
    unique-opened
  >
    <side-menu-item
      v-for="item of menus"
      :key="item.name"
      :base-path="item.path"
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
    menus () {
      return this.pageperm.filter(item => !item.hidden)
    },
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
.side-menu:not(.el-menu--collapse) {
  width: 200px;
}
.side-menu{
  border-right: 1px solid rgb(230, 230, 230);
  height: 100%;
}
</style>

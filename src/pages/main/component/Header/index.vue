<template>
  <div class="app-header">
    <button
      :class="isCollapse?'active':''"
      class="el-button is-plain"
      @click="toggleSideMenu()">
      <i class="fc-icon-menu"></i>
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AppHeader',
  methods: {
    toggleSideMenu () {
      this.$store.dispatch('toggleSideMenu')
    }
  },
  computed: {
    ...mapGetters([
      'sidemenu'
    ]),
    isCollapse () {
      return this.sidemenu.collapse
    }
  }
}
</script>
<style lang="scss" scoped>
.app-header{
  border-bottom: 1px solid rgb(230, 230, 230);
  .el-button{
    margin: 5px 0px;
    border: none;
    font-size: 18px;
    padding: 7px;
    transition: .38s;
    transform-origin: 50% 50%;
    &.active{
      transform: rotate(90deg);
    }
    .fc-icon-menu{
      font-size: 26px;
    }
  }
}

</style>

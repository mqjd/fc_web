<template>
  <el-submenu :index="item.name" v-if="item.children">
    <template slot="title">
      <i :class="item.meta.icon"></i>
      <span slot="title">{{item.meta.title}}</span>
    </template>
    <side-menu-item
      v-for="child of item.children"
      :key="child.name"
      :item="child"
      >
    </side-menu-item>
  </el-submenu>
  <router-link :to="item.path" v-else>
    <el-menu-item :index="item.name">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
  </router-link>
</template>
<script>
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>

</style>

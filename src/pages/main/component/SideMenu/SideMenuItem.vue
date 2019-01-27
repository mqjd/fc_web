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
      :base-path="resolvePath(child.path)"
      >
    </side-menu-item>
  </el-submenu>
  <router-link :to="resolvePath(item.path)" v-else>
    <el-menu-item :index="item.name">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{item.meta.title}}</span>
    </el-menu-item>
  </router-link>
</template>
<script>
import path from 'path'
export default {
  name: 'SideMenuItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String
    }
  },
  methods: {
    resolvePath (routePath) {
      if (this.item.children) {
        return path.resolve(this.basePath, routePath)
      } else {
        return this.basePath
      }
    }
  }
}
</script>

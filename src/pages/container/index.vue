<template>
  <transition name="el-fade-in" mode="out-in">
    <keep-alive :include="cachedPages">
      <router-view :key="key"></router-view>
    </keep-alive>
  </transition>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'container',
  computed: {
    ...mapGetters([
      'tags'
    ]),
    key () {
      return this.$route.fullPath
    }
  }
}
</script>

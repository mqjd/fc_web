<template>
  <div class="tag-main">
    <transition name="el-fade-in" mode="out-in">
      <keep-alive :include="cachedPages">
        <router-view :key="key"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'TagMain',
  computed: {
    ...mapGetters([
      'tags'
    ]),
    cachedPages () {
      return this.tags.cachedPages
    },
    key () {
      return this.$route.fullPath
    }
  },
  mounted () {
    this.addPage()
  },
  watch: {
    $route () {
      this.addPage()
    },
    visible (value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  methods: {
    addPage () {
      const { meta, name } = this.$route
      if (name) {
        const cache = meta.cache === undefined || meta.cache
        const tab = meta.tab === undefined || meta.tab
        if (tab && cache) {
          this.$store.dispatch('addPage', this.$route)
        } else if (cache) {
          this.$store.dispatch('addCachedPage', this.$route)
        } else if (tab) {
          this.$store.dispatch('addVisitedPage', this.$route)
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tag-main{
  flex: 1;
  display: flex;
}
</style>

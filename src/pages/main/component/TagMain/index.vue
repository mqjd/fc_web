<template>
  <div class="tag-main">
    <tag-header class="tag-view" v-if="tags.visitedPages.length!=0"></tag-header>
    <div class="main-container">
      <transition name="el-fade-in" mode="out-in">
        <keep-alive :include="cachedPages">
          <router-view :key="key"></router-view>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import TagHeader from './TagHeader'
export default {
  name: 'TagMain',
  components: {
    TagHeader
  },
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
  height: 100%;
  width: 100%;
  .tag-view{
    z-index: 1;
    position: relative;
    box-sizing: border-box;
    height: 34px;
    padding: 4px 0px;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
  }
  .main-container{
    height: calc(100% - 34px);
  }
}

</style>

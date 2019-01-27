<template>
  <div class="tag-main">
    <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
      <li @click.stop="refreshSelectedTag(selectedTag)">刷新</li>
      <li @click.stop="closeSelectedTag(selectedTag)">关闭</li>
      <li @click.stop="closeOthersTags(selectedTag)">关闭其他</li>
      <li @click.stop="closeAllTags(selectedTag)">关闭所有</li>
    </ul>
    <div class="tags" v-if="tags.visitedPages.length!=0">
      <div class="tags-view-wrapper">
        <router-link
          v-for="item of tags.visitedPages"
          :key="item.name"
          :class="isActive(item)?'active':''"
          ref="tag"
          class="tag-item"
          :to="{ path: item.path, query: item.query, fullPath: item.fullPath }"
          tag="div"
          @contextmenu.prevent.native="openMenu(item, $event)"
        >
          {{item.meta.title}}
          <span class="el-icon-close" @click.stop="closeSelectedTag(item)"/>
        </router-link>
      </div>
    </div>
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
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
export default {
  name: 'TagMain',
  components: {
    draggable
  },
  data () {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {}
    }
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
    isActive (route) {
      return route.path === this.$route.path
    },
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
    },
    openMenu (tag, e) {
      const targetBound = e.target.getBoundingClientRect()
      const offsetWidth = this.$el.offsetWidth
      const maxLeft = offsetWidth - targetBound.width
      const left = e.clientX + 15
      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }
      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    refreshSelectedTag (tag) {
      this.$store.dispatch('delCachedPage', tag).then(() => {
        const { fullPath } = tag
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
      this.closeMenu()
    },
    closeSelectedTag (page) {
      this.$store.dispatch('delPage', page).then(({ visitedPages }) => {
        if (this.isActive(page)) {
          const latestView = visitedPages.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView)
          } else {
            this.$router.push('/')
          }
        }
      })
      this.closeMenu()
    },
    closeOthersTags (page) {
      this.$store.dispatch('delOtherPage', page).then(() => {
        this.$router.push(this.selectedTag)
      })
      this.closeMenu()
    },
    closeAllTags () {
      this.$store.dispatch('delAllPage').then(() => {
        this.$router.push('/')
      })
      this.closeMenu()
    },
    closeMenu () {
      this.visible = false
    }
  }
}
</script>
<style lang="scss" scoped>
.tag-main{
  flex: 1;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 10000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
  .tags{
    box-sizing: border-box;
    position: relative;
    height: 34px;
    width: 100%;
    display: flex;
    padding: 0px 3px;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid #d8dce5;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
    .tags-view-wrapper{
      display: flex;
      .tag-item {
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 26px;
        border: 1px solid #d8dce5;
        background: #fff;
        padding: 0 8px;
        font-size: 12px;
        margin-left: 5px;
        &.active {
          background-color: #409EFF;
          color: #fff;
          border-color: #409EFF;
        }
      }
      .el-icon-close {
        width: 16px;
        height: 16px;
        vertical-align: 2px;
        border-radius: 50%;
        text-align: center;
        margin-left: 2px;
        transition: all .3s cubic-bezier(.645, .045, .355, 1);
        transform-origin: 100% 50%;
        &:before {
          transform: scale(.6);
          display: inline-block;
          vertical-align: -3px;
        }
        &:hover {
          background-color: #b4bccc;
          color: #fff;
        }
      }
    }

  }
  .main-container{
    flex: 1;
    overflow: auto;
  }
}
</style>

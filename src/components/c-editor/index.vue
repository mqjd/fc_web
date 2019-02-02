<template>
  <div class="c-editor"></div>
</template>
<script>
import * as monaco from 'monaco-editor'
import { mapGetters } from 'vuex'
export default {
  name: 'cEditor',
  data () {
    return {
      code: '',
      editor: null
    }
  },
  computed: {
    ...mapGetters([
      'sidemenu'
    ])
  },
  watch: {
    sidemenu: {
      handler (newVal, oldVal) {
        let me = this
        setTimeout(() => {
          me.resize()
        }, 300)
      },
      deep: true
    }
  },
  mounted () {
    this.initEditor()
    window.onresize = this.resize
  },
  destroyed () {
    window.onresize = null
  },
  methods: {
    initEditor () {
      let me = this
      me.editor = monaco.editor.create(this.$el, {
        value: me.code,
        language: 'javascript',
        theme: 'vs-dark',
        editorOptions: {
          autoIndent: true,
          fontSize: 28,
          cursorStyle: 'line'
        }
      })
      me.editor.onDidChangeModelContent(function (event) {
        me.code = me.editor.getValue()
      })
    },
    resize () {
      this.editor.layout()
    }
  }
}
</script>
<style lang="scss" scoped>
.c-editor{
  background-color: #1e1e1e;
  height: 100%;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
</style>

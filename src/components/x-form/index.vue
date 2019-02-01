<template>
  <div class="x-form">
    <editor
      :options="options"
      mode="wysiwyg"
      v-model="editorText"
      height="100%"
      ref="tuiEditor"
      v-if="editable"
    />
    <viewer
      class="viewer"
      height="100%"
      :value="editorText"
      ref="tuiEditor"
      v-else
      @change="onEditorChange"
      @stateChange="onEditorChange"
    />
  </div>
</template>
<script>
import 'tui-editor/dist/tui-editor.css'
import 'tui-editor/dist/tui-editor-contents.css'
import 'tui-color-picker/dist/tui-color-picker.css'
import 'codemirror/lib/codemirror.css'
import { Viewer, Editor } from '@toast-ui/vue-editor'
import 'tui-editor/dist/tui-editor-extTable'
import 'tui-editor/dist/tui-editor-extColorSyntax'
export default {
  name: 'x-form',
  components: {
    'editor': Editor,
    'viewer': Viewer
  },
  props: {
    editable: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      editorText: '',
      options: {
        language: 'zh_CN',
        hideModeSwitch: true,
        usageStatistics: false,
        previewStyle: 'vertical',
        exts: ['table', 'colorSyntax'],
        toolbarItems: [
          'heading',
          'bold',
          'italic',
          'strike',
          'divider',
          'hr',
          'quote',
          'divider',
          'ul',
          'ol',
          'divider',
          'table',
          'image',
          'link',
          'divider',
          'code',
          'codeblock'
        ]
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
.x-form{
  height: 100%;
  width: 100%;
  min-height: 300px;
}
</style>

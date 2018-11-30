<template>
  <div class="editor">
    <editor :init='editorInit' v-model='tinymceHtml'></editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/modern/theme'
import 'tinymce/plugins/table'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/textcolor'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/print'
import 'tinymce/plugins/link'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/hr'
import Editor from '@tinymce/tinymce-vue'
export default {
  name: 'RForm',
  components: {
    'editor': Editor
  },
  data () {
    return {
      editorInit: {
        plugins: 'table paste textcolor colorpicker print link preview lists fullscreen image imagetools codesample hr',
        language_url: '/static/tinymce/zh_CN.js',
        content_css: '/static/tinymce/custom.css',
        language: 'zh_CN',
        toolbar: [
          'undo redo | fontsizeselect styleselect | bold italic strikethrough forecolor backcolor removeformat | alignleft aligncenter alignright alignjustify | bullist numlist table | hr link image codesample | preview print fullscreen'
        ],
        menubar: false,
        statusbar: false,
        branding: false,
        resize: false,
        skin_url: '/static/tinymce/skins/lightgray',
        elementpath: false,
        insert_toolbar: 'quickimage quicktable',
        table_responsive_width: true,
        codesample_languages: [
          {text: 'HTML/XML', value: 'markup'},
          {text: 'JavaScript', value: 'javascript'},
          {text: 'CSS', value: 'css'},
          {text: 'PHP', value: 'php'},
          {text: 'Ruby', value: 'ruby'},
          {text: 'Python', value: 'python'},
          {text: 'Java', value: 'java'},
          {text: 'C', value: 'c'},
          {text: 'C#', value: 'csharp'},
          {text: 'C++', value: 'cpp'}
        ]
      },
      tinymceHtml: ''
    }
  },
  mounted () {
    tinymce.init({})
  }
}
</script>
<style scoped>
.editor{
  height: 100%;
}
</style>

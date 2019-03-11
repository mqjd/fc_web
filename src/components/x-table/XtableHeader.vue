<template>
  <tr>
    <td
      v-for="(width, index) in header"
      :key="index"
    >
      <div :style="{width: width + 'px'}"></div>
    </td>
  </tr>
</template>
<script>
export default {
  name: 'xtable-header',
  props: {
    header: {
      type: Array,
      required: true
    }
  }
}
</script>

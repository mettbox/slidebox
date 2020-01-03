<template>
  <div class="help">
    <div class="button" @click="$emit('help')">
      <i v-if="show" class="icon">help</i>
      <i v-if="!show" class="icon">help_outline</i>
    </div>

    <div v-if="show" class="modal">
      <ul>
        <li><code>esc</code> Home</li>
        <li><code>←</code>/ <code>→</code> Prev/ next Slide</li>
        <li><code>t</code> Toggle TOC</li>
        <li><code>h</code> Toggle Help</li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Help',

  props: {
    show: {
      type: Boolean
    }
  }
}
</script>

<style lang="stylus" scoped></style>

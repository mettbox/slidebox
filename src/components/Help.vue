<template>
  <div class="help">
    <div class="button" @click="$emit('help')">
      <i v-if="show" class="icon">help</i>
      <i v-if="!show" class="icon">help_outline</i>
    </div>

    <transition name="fade" mode="out-in">
      <div v-if="show" class="modal">
        <ul>
          <li><code>esc</code> Home</li>
          <li><code>→</code> / <code>space</code> Next Slide</li>
          <li><code>←</code> Previuos Slide</li>
          <li><code>t</code> Toggle TOC</li>
          <li><code>h</code> Toggle Help</li>
        </ul>
      </div>
    </transition>
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

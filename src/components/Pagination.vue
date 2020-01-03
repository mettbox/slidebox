<template>
  <div class="pagination">
    <button @click="navigatePrev" class="button" :class="{disabled: !prev}">
      <i class="icon">keyboard_arrow_left</i>
    </button>
    <button @click="navigateNext" class="button" :class="{disabled: !next}">
      <i class="icon">keyboard_arrow_right</i>
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',

  props: {
    prev: {
      type: String
    },
    next: {
      type: String
    }
  },

  methods: {
    navigatePrev () {
      this.$emit('navigate', 'prev')
    },
    navigateNext () {
      this.$emit('navigate', 'next')
    }
  }
}
</script>

<style lang="stylus" scoped></style>

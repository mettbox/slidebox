<template>
  <div class="progress-bar">
    <div class="indicator" :style="{ 'width': percentage }"></div>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',

  props: {
    current: {
      type: Number
    },
    total: {
      type: Number
    }
  },

  computed: {
    percentage () {
      return Math.round((this.current * 100) / this.total) + '%'
    }
  }
}
</script>

<style lang="stylus" scoped></style>

<template>
  <div class="progress-bar">
    <div class="indicator" :style="{ 'width': percentage }">
      <div v-if="numbers" class="numbers">{{ current }} / {{ total }}</div>
    </div>
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
    },
    numbers: {
      type: Boolean
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

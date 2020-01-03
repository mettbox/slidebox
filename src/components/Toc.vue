<template>
  <transition name="fade" mode="out-in">
    <div class="toc">
      <ul v-for="slide in slides" :key="slide.id">
        <li v-if="!slide.isFirst && !slide.chapter" :class="{ active: isCurrent(slide.id) }" @click="goTo(slide.id)">
          {{ slide.title }}
        </li>
        <ul v-if="slide.chapter">
          <li v-if="!slide.isFirst && slide.chapter" :class="{ active: isCurrent(slide.id) }" @click="goTo(slide.id)">
            {{ slide.title }}
          </li>
        </ul>
      </ul>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Toc',

  props: {
    slides: {
      type: Array
    },
    slide: {
      type: Number
    },
    path: {
      type: String
    }
  },

  computed: {
    currentSlide () {
      return this.slides[this.slide]
    }
  },

  methods: {
    isCurrent (id) {
      return id === this.currentSlide.id
    },
    goTo (id) {
      this.$router.push({ path: `/${this.path}/${id}` })
      this.$emit('toc-goto')
    }
  }
}
</script>

<style lang="stylus" scoped></style>

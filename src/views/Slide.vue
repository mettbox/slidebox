<template>
  <div class="slide">
    <transition :name="currentTransition" mode="out-in">
      <router-view />
    </transition>

    <breadcrump :section="section" :chapter="chapter" />

    <pagination :prev="prev" :next="next" v-on:navigate="navigate" />

    <progress-bar :current="current" :total="total" />

    <toc v-if="showToc"
      :slides="sectionSlides"
      :slide="current -1"
      :path="path"
      v-on:toc-goto="toc"
    />

    <help v-on:help="help" :show="showHelp" />
  </div>
</template>

<script>
import Slides from '@/assets/content/slides.json'
import Breadcrump from '@/components/Breadcrump.vue'
import Pagination from '@/components/Pagination.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import Toc from '@/components/Toc.vue'
import Help from '@/components/Help.vue'

export default {
  name: 'slide',

  components: {
    Breadcrump,
    Pagination,
    ProgressBar,
    Toc,
    Help
  },

  data () {
    return {
      currentTransition: 'next',
      prev: '',
      next: '',
      total: 0,
      current: 0,
      section: '',
      chapter: '',
      path: '',
      sectionSlides: [],
      isFirst: false,
      showToc: false,
      showHelp: false
    }
  },

  methods: {
    toc () {
      this.showToc = !this.showToc
    },
    help () {
      this.showHelp = !this.showHelp
    },
    navigate (dir) {
      if (dir === 'next') {
        this.navigateNext()
      } else {
        this.navigatePrev()
      }
    },
    init () {
      const [section, slide] = this.$router.currentRoute.fullPath.slice(1).split('/')
      const currentIndex = Slides[section].findIndex(i => i.id === slide)
      const current = Slides[section][currentIndex]

      this.prev = Slides[section][currentIndex - 1]
        ? `/${section}/${Slides[section][currentIndex - 1].id}`
        : ''

      this.next = Slides[section][currentIndex + 1]
        ? `/${section}/${Slides[section][currentIndex + 1].id}`
        : ''

      this.sectionSlides = Slides[section]

      this.current = currentIndex + 1
      this.total = Slides[section].length
      this.section = Slides[section][0].title
      this.path = section
      this.chapter = current.chapter ? current.chapter : ''
      this.isFirst = current.isFirst | false
    },
    onKeyDown (e) {
      switch (e.keyCode) {
        case 27:
          this.$router.push('/')
          break
        case 37:
          this.navigatePrev()
          break
        case 39:
        case 32:
          this.navigateNext()
          break
        case 84:
          this.showToc = !this.showToc
          break
        case 72:
          this.showHelp = !this.showHelp
          break
        default:
          break
      }
    },
    navigatePrev () {
      if (!this.prev) return
      this.currentTransition = 'prev'
      this.$router.push({ path: this.prev })
    },
    navigateNext () {
      if (!this.next) return
      this.currentTransition = 'next'
      this.$router.push({ path: this.next })
    }
  },

  created () {
    this.onKeyDown = this.onKeyDown.bind(this)
    document.addEventListener('keydown', this.onKeyDown)
  },

  destroyed () {
    document.removeEventListener('keydown', this.onKeyDown)
  },

  watch: {
    $route () {
      this.init()
    }
  },

  mounted () {
    this.init()
  }
}
</script>

<style lang="stylus" scoped></style>

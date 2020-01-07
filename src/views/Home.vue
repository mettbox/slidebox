<template>
  <div class="home">

    <ul v-if="meta && meta.topics && meta.topics.length" class="breadcrumb">
      <li v-for="(topic, index) in meta.topics" :key="index">{{ topic }}</li>
    </ul>

    <h1 v-if="meta && meta.title" class="center">
      {{ meta.title }}
    </h1>

    <div class="cards-wrapper">
      <div class="cards-container" :style="cardsContainerStyles">
        <div v-for="section in Object.keys(entries)" :key="section" class="card">
          <div @click="$router.push({ name: entries[section][0].id })" class="face face1">
            <div class="content">
              <h2>{{ entries[section][0].title }}</h2>
            </div>
          </div>
          <div class="face face2">
            <div class="content">
              <p>
                <span v-for="(entry, index) in entries[section]" :key="entry.id">
                  <a
                    v-if="!entry.isFirst && !entry.chapter"
                    @click="$router.push({ name: entry.id })"
                    :class="{ last : last(section, index) }"
                  >
                    {{ entry.title }}
                  </a>
                </span>
              </p>

            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Meta from '@/assets/meta.json'
import Slides from '@/assets/presentations/slides.json'

export default {
  name: 'home',
  computed: {
    meta () {
      return Meta
    },
    entries () {
      return Slides
    },
    cardsContainerStyles () {
      return {
        width: '1560px'
      }
    }
  },
  methods: {
    last (section, index) {
      return index === this.entries[section].length - 1
    }
  }
}
</script>

<style lang="stylus" scoped></style>

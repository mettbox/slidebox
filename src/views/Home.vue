<template>
  <div class="home">

    <ul v-if="meta && meta.topics && meta.topics.length" class="breadcrumb">
      <li v-for="(topic, index) in meta.topics" :key="index">{{ topic }}</li>
    </ul>

    <h1 v-if="meta && meta.title" class="center">{{ meta.title }}</h1>

    <div v-for="section in Object.keys(entries)" :key="section" class="card">
      <div v-for="(entry, index) in entries[section]" :key="entry.id">
        <h2 v-if="entry.isFirst" @click="$router.push({ name: entry.id })">
          {{ entry.title }}
        </h2>
        <a
          v-if="!entry.isFirst && !entry.chapter"
          @click="$router.push({ name: entry.id })"
          :class="{ last : last(section, index) }"
        >
          {{ entry.title }}
        </a>
      </div>
    </div>

  </div>
</template>

<script>
import Meta from '@/assets/meta.json'
import Slides from '@/assets/content/slides.json'

export default {
  name: 'home',
  computed: {
    meta () {
      return Meta
    },
    entries () {
      return Slides
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

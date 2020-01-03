<template>
  <ul class="breadcrumb">
    <li><router-link to="/"><i class="icon">home</i></router-link></li>
    <li>{{ section }}</li>
    <li v-if="chapter">{{ chapter }}</li>
  </ul>
</template>

<script>
export default {
  name: 'Breadcrump',

  props: {
    section: {
      type: String
    },
    chapter: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped></style>

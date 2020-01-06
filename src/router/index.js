import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import Slides from '@/assets/presentations/slides.json'

Vue.use(Router)

const slideRoutes = Object.keys(Slides).map(section => {
  const children = Slides[section].map(child => ({
    path: child.id,
    name: child.id,
    component: () => import(`@/assets/presentations/${section}/${child.id}.md`)
  }))

  return {
    path: `/${section}`,
    name: section,
    component: () => import('@/views/Slide.vue'),
    children
  }
})

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    ...slideRoutes
  ]
})

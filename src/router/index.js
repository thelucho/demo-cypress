import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue'
import Add from '../views/Add.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import System from '@/components/System'

import ProductList from '@/components/commons/ProductList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/System',
      name: 'System',
      component: System,
      children: [
        {
          path: '/ProductList',
          name: 'ProductList',
          component: ProductList
        }]
    }
  ]
})

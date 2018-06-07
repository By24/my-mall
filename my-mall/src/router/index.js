import Vue from 'vue'
import Router from 'vue-router'
// import Home from '@/components/Home'
import Login from '@/components/Login'
import System from '@/components/System'

import ProductList from '@/components/commons/ProductList'
import UserList from '@/components/commons/UserList'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }, {
      path: '/',
      name: 'System',
      component: System,
      children: [
        {
          path: '/ProductList',
          name: 'ProductList',
          component: ProductList
        }, {
          path: '/UserList',
          name: 'UserList',
          component: UserList
        }]
    }
  ]
})

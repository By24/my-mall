// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/reset.css'
import echarts from 'echarts'
import world from 'echarts/map/json/world.json'

import { requestLogin } from './api/api'

import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

router.beforeEach((to, from, next) => {
  var userInfo = sessionStorage.getItem('userInfoStorage')
  if (userInfo != undefined) {
    requestLogin(userInfo).then(res => {
      var { msg, code, data } = res
      if (code === 200) {
        next()
      } else {
        this.$message({
          message: msg,
          type: 'warning'
        })
      }
    })
  } else {
    if (to.path === '/Login') {
      next()
    } else {
      next('/Login')
    }
  }
})
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueQuillEditor)
Vue.prototype.$echarts = echarts
echarts.registerMap('world', world)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

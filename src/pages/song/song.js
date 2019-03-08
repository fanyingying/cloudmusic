// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import FastClick from 'fastclick'
import router from '@/router'
import store from '@/store'
import '@/assets/fonts/iconfont.css'
import axios from 'axios'
import qs from 'qs'
import musicApi from '@/utils/api'
import localData from '@/local'

// import VueRouter from 'vue-router'
// import Home from './components/HelloFromVux'

// Vue.use(VueRouter)

// const routes = [{
//   path: '/',
//   component: Home
// }]

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

Vue.config.productionTip = false

Vue.prototype.$http = axios
Vue.prototype.$qs = qs
Vue.prototype.$musicApi = musicApi
Vue.prototype.$localData = localData

/* eslint-disable no-new */
new Vue({
  router,
  store, // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  render: h => h(App)
}).$mount('#app-box')

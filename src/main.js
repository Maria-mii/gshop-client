/*
入口js
*/

import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock/mockServer'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import loading from './common/imgs/loading.gif'
import './filters'

Vue.use(VueLazyload, { loading })

Vue.component(Button.name, Button)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router, // 注册路由器
  store // 注册store
})

/*
创建路由器对象
*/

import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '../pages/Home/Home'
// import Search from '../pages/Search/Search'
// import Order from '../pages/Order/Order'
// import Personal from '../pages/Personal/Personal'

// 路由懒加载
const Home = () => import('../pages/Home/Home')
const Search = () => import('../pages/Search/Search')
const Order = () => import('../pages/Order/Order')
const Personal = () => import('../pages/Personal/Personal')

import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from '../pages/Shop/ShopGoods/ShopGoods'
import ShopRatings from '../pages/Shop/ShopRatings/ShopRatings'
import ShopInfo from '../pages/Shop/ShopInfo/ShopInfo'

// const HOME ='/home'
// const SEARCH = '/search'
// const ORDER = '/order'
// const PERSONAL = '/personal'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home, // 返回路由组件的函数，只有执行此函数才会加载路由组件，这个函数在请求对应的路由路径时才会执行
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/personal',
      component: Personal,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: ShopGoods
        },
        {
          path: '/shop/ratings',
          component: ShopRatings
        },
        {
          path: '/shop/info',
          component: ShopInfo
        },
        {
          path: '/',
          redirect: '/shop/goods'
        },
      ]
    },
  ]
})

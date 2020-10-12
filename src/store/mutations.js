// vuex的mutation模块

import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RECEIVE_RESET_USERINFO,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import Vue from 'vue'

export default {
  [RECEIVE_ADDRESS] (state, {address}) {
    state.address = address
  },
  [RECEIVE_CATEGORY] (state, {category}) {
    state.category = category
  },
  [RECEIVE_SHOPS] (state, {shops}) {
    state.shops = shops
  },
  [RECEIVE_USERINFO] (state, {userInfo}) {
    state.userInfo = userInfo
  },
  [RECEIVE_RESET_USERINFO] (state) {
    state.userInfo = {}
  },
  [RECEIVE_GOODS] (state, {goods}) {
    state.goods = goods
  },
  [RECEIVE_RATINGS] (state, {ratings}) {
    state.ratings = ratings
  },
  [RECEIVE_INFO] (state, {info}) {
    state.info = info
  },
  [INCREMENT_FOOD_COUNT](state, {food}){
    if (!food.count) {
      // 给food增加新的属性count 并数据绑定
      Vue.set(food, 'count', 1)
      state.cartFoods.push(food)
    }else {
      food.count++
    }
  },
  [DECREMENT_FOOD_COUNT](state, {food,cartFoods}){
    if(food.count){
      food.count--
      if(food.count ===0){
        state.cartFoods.splice(state.cartFoods.indexOf(food),1)
      }
    }
  },
  [CLEAR_CART_FOODS] (state) {
    // 删除食品的数量
    state.cartFoods.forEach(food => food.count= 0)
    // 清空购物车
    state.cartFoods = []
  },
  [RECEIVE_SEARCH_SHOPS] (state, {searchShops}) {
    state.searchShops = searchShops
  },

}

// vuex的actions模块
import Vue from 'vue'
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORY,
  RECEIVE_SHOPS,
  RECEIVE_USERINFO,
  RECEIVE_RESET_USERINFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  DECREMENT_FOOD_COUNT,
  INCREMENT_FOOD_COUNT,
  CLEAR_CART_FOODS,
  RECEIVE_SEARCH_SHOPS
} from './mutation-types'
import {
  reqAddress,
  reqFoodCategory,
  reqShops,
  reqUserInfo,
  reqLogOut,
  reqShopGoods,
  reqShopRatings,
  reqShopInfo,
  reqShopList
} from '../api'

export default {
  // 异步获取地址信息
  async getAddress ({commit, state}) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqAddress(geohash)
    // 发送mutation请求
    commit(RECEIVE_ADDRESS, {address: result.data})
  },

  // 异步获取食品分类
  async getCategory ({commit}) {
    const result = await reqFoodCategory()
    // 发送mutation请求
    commit(RECEIVE_CATEGORY, {category: result.data})
  },

  // 异步获取商铺信息
  async getShops ({commit, state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    // 发送mutation请求
    commit(RECEIVE_SHOPS, {shops: result.data})
  },

  // 同步获取用户信息
  getUserInfo ({commit}, userInfo) {
    commit(RECEIVE_USERINFO, {userInfo})
  },
  // 异步获取用户信息  getUserInfo
  async getInfoAsync ({commit}) {
    const result = await reqUserInfo()
    if (result.code === 0) {
      const userInfo = result.data
      commit(RECEIVE_USERINFO, {userInfo})
    }
  },
  // 异步登出
  async logout ({commit}) {
    const result = await reqLogOut()
    if (result.code === 0) {
      commit(RECEIVE_RESET_USERINFO)
    }
  },
  // 异步获取商品信息
  async getShopGoods ({commit},callback) {
    const result = await reqShopGoods()
    if (result.code === 0) {
      const goods = result.data
      commit(RECEIVE_GOODS, {goods})
      // 数据更新了，通知组件更新
      callback && callback()
    }
  },
  // 异步获取用户信息
  async getRatings ({commit},callback) {
    const result = await reqShopRatings()
    if (result.code === 0) {
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      // 数据更新了，通知组件更新
      callback && callback()
    }
  },
  // 异步获取商铺信息
  async getShopInfo ({commit}) {
    const result = await reqShopInfo()
    if (result.code === 0) {
      const info = result.data
      commit(RECEIVE_INFO, {info})
    }
  },

  // 同步更新购物车数据
  updateFoodCount({commit},{food,isAdd}){
   if(isAdd){ // 增加
     commit(INCREMENT_FOOD_COUNT,{food})
   }else { // 减少
     commit(DECREMENT_FOOD_COUNT,{food})
   }
  },

  // 同步删除购物车中商品
  clearCartFoods({commit}) {
    commit(CLEAR_CART_FOODS)
  },


  // 异步获取搜索的商铺信息
  async searchShops ({commit,state},keyword) {
    const geohash = state.latitude + ',' + state.longitude
    const result = await reqShopList(geohash, keyword)
    if (result.code === 0) {
      const searchShops = result.data
      commit(RECEIVE_SEARCH_SHOPS, {searchShops})
    }
  },
}

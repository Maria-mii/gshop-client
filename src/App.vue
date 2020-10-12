<template>
  <div class="app">
    <router-view/>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import FooterGuide from './components/FooterGuide/FooterGuide'
// import {reqShopList,reqAddress} from './api'
export default {
  mounted () {
    // this.$store.dispatch('getAddress')
    // this.$store.dispatch('getShops')
    // 初始化 自动获取用户信息
    this.getAddress()
    this.getInfoAsync()
  },
  components: {
    FooterGuide
  },
  methods: {
    ...mapActions(['getAddress', 'getInfoAsync'])
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  #app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>

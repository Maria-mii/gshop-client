<template>
  <section class="home">
    <!--首页头部-->
    <TopHeader :title="address.name">
      <router-link class="header_search" slot="search" to="/search" >
        <i class="iconfont icon-sousuo"></i>
      </router-link>
      <router-link class="header_login" slot="login" :to="userInfo._id?'/userinfo':'/ogin'">
        <span class="header_login_text" v-if="!userInfo._id">登录|注册</span>
        <span class="header_login_text" v-else><i class="iconfont icon-person"></i></span>
      </router-link>

    </TopHeader>

    <!--首页导航-->
    <nav class="home_nav">
      <div class="swiper-container" v-if="categoryArr.length">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(category,index) in categoryArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(c,index2) in category" :key="index2">
              <div class="food_container">
                <img :src="BaseImageUrl+c.image_url">
              </div>
              <span>{{c.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
      <img src="./images/msite_back.svg" alt="back" v-else>
    </nav>
    <!--首页附近商家-->
    <div class="home_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <ShopList/>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'

import TopHeader from '../../components/TopHeader/TopHeader'
import ShopList from '../../components/ShopList/ShopList'
export default {
  data () {
    return {
      BaseImageUrl: 'https://fuss10.elemecdn.com'
    }
  },
  components: {
    TopHeader,
    ShopList
  },

  mounted () {
    this.$store.dispatch('getCategory')
  },

  watch: {
    category () {
      // 界面更新之后立即执行
      this.$nextTick(() => {
        /* eslint-disable no-new */
        new Swiper('.swiper-container', {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination'
          },
          autoplay: true, // 可选选项，自动滑动
          loop: true// 循环模式选项
        })
      })
    }
  },

  computed: {
    // 读数据
    ...mapState(['address', 'category', 'userInfo']),

    // 创建一个二维数组
    categoryArr () {
      const {category} = this
      // 创建大小数组
      let arr = []
      let minArr = []
      // 遍历逻辑
      category.forEach((c, index) => {
        minArr.push(c)
        if (minArr.length === 8 || category.length === index + 1) {
          arr.push(minArr)
          minArr = []
        }
      })

      /*let length = category.length
      let pageNum = length % 8 === 0 ? length / 8 : length / 8 + 1
      for (let i = 0; i < pageNum; i++) {
        let end = i === pageNum - 1 ? i * 8 + 8 : length
        let subarray = category.slice(i * 8, 8)
        arr.push(subarray)
        subarray = []
      }*/

      /*const size = category.length
      for (let i = 0; i < size; i++) {
        let c = category[i]
        minArr.push(c)
        if (minArr.length === 8 || i === size - 1) {
          arr.push(minArr)
          minArr = []
        }
      }*/
      // console.log(arr)
      return arr
    }
  },

  // methods:{
  //   search(){
  //     this.$router.replace('/search')
  //   }
  // }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .home  //首页
    width 100%
    .header
      background-color #02a774
      position fixed
      z-index 100
      left 0
      top 0
      width 100%
      height 45px
      .header_search
        position absolute
        left 15px
        top 50%
        transform translateY(-50%)
        width 10%
        height 50%
        .icon-sousuo
          font-size 25px
          color #fff
      .header_title
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -50%)
        width 50%
        color #fff
        text-align center
        .header_title_text
          font-size 20px
          color #fff
          display block
      .header_login
        font-size 14px
        color #fff
        position absolute
        right 15px
        top 50%
        transform translateY(-50%)
        .header_login_text
          color #fff
    .home_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .home_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>

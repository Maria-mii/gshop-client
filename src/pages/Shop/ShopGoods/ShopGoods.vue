<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :key="index" @click="clickMenuItem(index)" :class="{current:currentIndex===index}">
					<span class="text bottom-border-1px">
						<img class="icon" :src="good.icon" v-if="good.icon">{{good.name}}</span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="foodsUL">
          <li class="food-list food-list-hook"  v-for="(good,index) in goods" :key="index">
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" @click="showFood(food)" :key="index">
                <div class="icon">
                  <img width="57" height="57" :src="food.icon">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ShopCart />
    </div>
    <Food :food="food" ref="food"/>

  </div>

</template>

<script>
import ShopCart from '../../../components/ShopCart/ShopCart'
import Food from '../../../components/Food/Food'
import CartControl from '../../../components/CartControl/CartControl'
import {mapState} from 'vuex'
import BScroll from 'better-scroll'
export default {
  data(){
    return{
      scrollY: 0, //右侧 Y 轴滑动的坐标
      tops: [], // 包含右侧所有分类小列表的 top 值
      food:{}
    }
  },
  components:{
    CartControl,Food,ShopCart
  },

  mounted () {
    this.$store.dispatch('getShopGoods',() => {
      this.$nextTick(() => {
        this._initScroll()
        this._initTops()
      })
    })
  },

  methods:{
    _initScroll(){
      // 左侧列表的BScroll
      new BScroll('.menu-wrapper',{
        click:true // 响应点击
      })
      // 右侧商品的BScroll
      this.foodsScroll = new BScroll('.foods-wrapper',{
        probeType: 2, // 手指滑动
        click:true
      })

      // 监视滑动过程
      this.foodsScroll.on('scroll',(pos) =>{
        this.scrollY = Math.abs(pos.y)
      })
      // 监视滑动结束
      this.foodsScroll.on('scrollEnd',(pos) =>{
        this.scrollY = Math.abs(pos.y) // 解决惯性滑动更新
      })
    },

    _initTops(){
      // 1.初始化tops
      const tops = []
      let top = 0
      // 计算各个top并存到tops中
      tops.push(top)

      // 2.收集 找到所有li标签
      const lis = this.$refs.foodsUL.children
      // console.log(lis)
      // 伪数组转化为真数组
      Array.prototype.slice.call(lis).forEach(li => {
        //获取每个li的高度，并追加到数组中
        top += li.clientHeight
        tops.push(top)
      })
      // 3.更新数据
      this.tops = tops
      // console.log(tops)
    },

    clickMenuItem(index){
      // 得到滚动目标的坐标
      const top = this.tops[index]
      // 更新目标scrollY值
      this.scrollY = top
      // 平滑滚动到指定位置
      this.foodsScroll.scrollTo(0, -top, 300)
    },

    showFood(food){
      // 更新food数据
      this.food = food
      // 显示食品介绍
      this.$refs.food.toggleShow()
    }
  },

  computed: {
    ...mapState(['goods']),

    currentIndex(){
      const { scrollY,tops } = this
      // 返回结果
      return tops.findIndex((top, index)=> {
        return scrollY>=top && scrollY<this.tops[index+1]
        })
  }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/mixins.styl"
  .goods
    display: flex
    position: absolute
    top: 195px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden

    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7

      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px

        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700

          .text
            border-none()

        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat

        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px

    .foods-wrapper
      flex: 1

      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7

      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))

        &:last-child
          border-none()
          margin-bottom: 0

        .icon
          flex: 0 0 57px
          margin-right: 10px

        .content
          flex: 1

          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)

          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)

          .desc
            line-height: 12px
            margin-bottom: 8px

          .extra
            .count
              margin-right: 12px

          .price
            font-weight: 700
            line-height: 24px

            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)

            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)

          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>


<template>
  <div class="star" :class ="`star-${size}`" >
    <span class="star-item" v-for="(sc,index) in starClasses" :key="index" :class="sc"></span>
  </div>
</template>

<script>
export default {
  props: {
    score: Number,
    size: Number
  },

  computed: {
    starClasses () {
      const CLASS_ON = 'on'
      const CLASS_HALF = 'half'
      const CLASS_OFF = 'off'
      const { score } = this
      const scs = [ ]
      // score 3.2(3个全星，2个灰星） 3.7 （3个全星，1个半星，2个灰星）
      // 取分数的最大整数部分
      const scoreInterger = Math.floor(score)
      // 有n个全星-- on
      for (let i = 0; i < scoreInterger; i++) {
        scs.push(CLASS_ON)
      }
      // 有0/1个半星 -- half
      if (score * 10 - scoreInterger * 10 > 5) {
        scs.push(CLASS_HALF)
      }
      // 有n个灰星 -- off
      while (scs.length < 5) {
        scs.push(CLASS_OFF)
      }
      return scs
      // console.log(scs)
    }
  }

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/star48_on')
        &.half
          bg-image('./images/star48_half')
        &.off
          bg-image('./images/star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star36_on')
        &.half
          bg-image('./images/star36_half')
        &.off
          bg-image('./images/star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/star24_on')
        &.half
          bg-image('./images/star24_half')
        &.off
          bg-image('./images/star24_off')
</style>

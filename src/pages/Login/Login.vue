<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">
            <section class="login_message">
              <input type="text" maxlength="11" placeholder="手机号" v-model="phone">
              <button :disabled="!phoneCheck || !!computedTime" :class ="{phone_check:phoneCheck}" class="get_verification" @click.prevent="getCode">
                {{ computedTime>0 ? `已发送(${computedTime}s)`:'获取验证码' }}</button>
            </section>
            <section class="login_verification">
              <input type="text" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name" />
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" autocomplete="off"  maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" :class="showPwd?'on':'off'" @click.prevent="showPwd =!showPwd">
                  <div class="switch_circle" :class="{right:showPwd}"></div>
                  <span class="switch_text">{{showPwd?'abc':''}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="getCaptcha" ref="captcha">
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"></AlertTip>
  </section>
</template>

<script>
import {reqSendCode,reqSmsLogin,reqPwdLogin} from '../../api'
import AlertTip from '../../components/AlertTip/AlertTip'
export default {
  components: {
    AlertTip
  },

  data () {
    return {
      loginWay: true, // true为短信登录，false为密码登录
      phone: '', // 初始手机号
      code: '', // 手机验证码
      computedTime: 0, // 计时时间
      showPwd: false, // 是否显示密码
      name: '', // 用户名
      pwd: '', // 密码
      captcha: '', // 图形验证码
      alertShow: false,
      alertText: ''
    }
  },

  computed: {
    phoneCheck () {
      const phone = this.phone
      return /^1\d{10}$/.test(phone)
    }
  },

  methods: {
    // 获取验证码
    async getCode () {
      if (!this.computedTime) {
        this.computedTime = 30
        // 启动循环定时器
        this.intervalId = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.intervalId)
          }
        }, 1000)
        // 发送ajax请求获取验证码
        const result = await reqSendCode(this.phone)
        console.log(this.phone, result)
        // 如果发送失败 显示失败消息 停止定时器
        if (result === 1) {
          this.ShowMessage(result.msg)
          clearInterval(this.intervalId)
        } else {
          // 登录成功
          alert('登录成功')
        }
      }
    },
    ShowMessage (alertText) {
      this.alertShow = true
      this.alertText = alertText
    },
    // 登录
    async login () {
      const {phone, code, captcha, name, pwd} = this
      let result
      // 判断登录方式
      // 短信登录
      if (this.loginWay) {
        // 判断手机号和验证码
        if (!this.phoneCheck) {
          // 手机号不合法
          this.ShowMessage('手机号不合法')
        } else if (!/\d{6}$/.test(code)) {
          // 验证码必须为6位数字
          this.ShowMessage('验证码必须为6位数字')
        } else {
          // 登录
          result = await reqSmsLogin(phone, code)
        }
      } else {
        // 密码登录
        if (!name) {
          // 用户名不能为空
          this.ShowMessage('用户名不能为空')
        } else if (!pwd) {
          // 密码不能为空
          this.ShowMessage('密码不能为空')
        } else if (!captcha) {
          // 图形验证码不能为空
          this.ShowMessage('图形验证码不能为空')
        } else {
          result = await reqPwdLogin({name, pwd, captcha})
        }
      }
      // 清除定时器
      if (this.computedTime === 0) {
        clearInterval(this.intervalId)
      }
      // 发送回应信息
      if (result.code === 0) {
        const user = result.data
        // console.log(userInfo)
        // 将user保存到vuex的state中
        this.$store.dispatch('getUserInfo', user)
        // 去个人中心
        this.$router.replace('/personal')
      } else {
        this.ShowMessage(result.msg)
      }
      // 刷新图形验证码
      this.getCaptcha()
    },
    // 关闭弹窗
    closeTip () {
      this.alertShow = false
      this.alertText = ''
    },
    // 刷新图形验证码
    getCaptcha () {
      this.$refs.captcha.src = 'http://localhost:4000/captcha?time=' + Date.now()
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.phone_check
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 15px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  //transform translateX(27px)
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>

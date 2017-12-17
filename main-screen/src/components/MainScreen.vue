<template>
  <div>
    <transition name="fade">
      <img src="../assets/imgs/flash.png" v-if="isAlive" class="flash"/>
    </transition>
    <div class="container" v-if="isRunning">
      <img class="title" src="../assets/imgs/start-title.png"/>
      <img class="bottom" src="../assets/imgs/start-bottom.png"/>
      <count-down class="countdown" :sec="countdown" :isRunning="isRunning"/>
    </div>
    <div class="container" v-else>
      <img class="title" src="../assets/imgs/main-title.png"/>
      <img class="bottom" src="../assets/imgs/main-bottom.png"/>
      <a class="number">{{count}}</a>   
    </div>
  </div>
</template>

<script>
import CountDown from "./CountDown"

export default {
  name: "MainScreen",
  components: {
    CountDown
  },
  data () {
    return {
      socket: null,
      msg: 0,
      count: 0,
      isRunning: false,
      isAlive: false,       //与服务器连接是否alive，控制呼吸灯
      flag: false           //服务端每0.5s发送一次数据，判断当前是1s内的第一次还是第二次
    }
  },
  computed: {
    countdown () {
      return (this.msg < 18) ? (18 - this.msg) : 0
    }
  },
  created () {
    this.socket = new WebSocket("wss://myseu.cn/redpack/main")
    this.socket.onmessage = this.cb
    this.checkSocket()
  }, 
  methods: {
    //检查socket连接状态
    checkSocket () {
      let that = this
      setInterval(() => {
      if (that.socket.readyState == WebSocket.CLOSED 
        || that.socket.readyState == WebSocket.CLOSING) {
        that.socket = new WebSocket("wss://myseu.cn/redpack/main")
        that.socket.onmessage = that.cb
      }
      }, 200)
    }, 
    //socket的onmessage绑定函数
    cb (event) {
      var temp = JSON.parse(event.data)
      let that = this

      //设置呼吸灯每0.25s闪一次
      this.isAlive = true
      setTimeout(() => {
        this.isAlive = false
      }, 250)
      
      if (that.msg == 17) {           //服务器已经发来17，最后一秒
        if (!that.flag) {             //flag为false，说明此时是17.5s
          that.flag = true
        }
        else {                        //flag为true， 说明此时是18s
          that.isRunning = true
          that.msg = 18               //手动设置倒计时为0
          that.socket.close()              //关掉websocket，避免后续数据影响前端状态

          setTimeout(() => {          //手动设置1s后渲染回结束页面
            that.isRunning = false
            that.socket = new WebSocket("wss://myseu.cn/redpack/main")
            that.socket.onmessage = cb
          }, 1000)
        }
      }
      else {
        that.isRunning = temp.r
        that.msg = temp.t
        that.count = temp.c
      }
    }
  }
}
</script>

<style scoped>
.flash{
  width: 50px;
  height: 50px;
  position: absolute;
  top: 1900px;
  left: 200px; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s
}

.fade-enter, .fade-leave-to {
  opacity: 0
}

.container{
  width: 3000px;
  height: 2250px;
  background-image: url("../assets/imgs/main-bg.png");
  background-repeat: no-repeat;
}

.title{
  width: 600px;
  height: 210px;
  margin-left: 1610px;
  margin-top: 880px;
}

.bottom{
  width: 820px;
  height: 500px;
  margin-left: 1100px;
  margin-top: 90px;
}

.countdown{
  margin-top: -300px;
  margin-left: 1300px;
}

.number{
  display: block;
  margin-top: 40px;
  margin-left: 1470px; 
  font-size: 110px;
  color: #E89181;
}
</style>
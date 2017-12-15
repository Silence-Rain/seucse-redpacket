<template>
  <div>
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
import socket from "../api/socket"
import CountDown from "./CountDown"

export default {
  name: "MainScreen",
  components: {
    CountDown
  },
  data () {
    return {
      msg: 0,
      count: 0,
      isRunning: false,
      flag: false           //服务端每0.5s发送一次数据，判断当前是1s内的第一次还是第二次
    }
  },
  computed: {
    countdown () {
      return (this.msg < 18) ? (18 - this.msg) : 0
    }
  },
  created () {
    socket.init("main")
    let that = this

    socket.sock_main.onmessage = function (event) {
      var temp = JSON.parse(event.data)
      
      if (that.msg == 17) {           //服务器已经发来17，最后一秒
        if (!that.flag) {             //flag为false，说明此时是17.5s
          that.flag = true
        }
        else {                        //flag为true， 说明此时是18s
          that.isRunning = true
          that.msg = 18               //手动设置倒计时为0
          socket.close("main")        //关掉websocket，避免后续数据影响前端状态

          setTimeout(() => {          //手动设置1s后渲染回结束页面
            that.isRunning = false
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
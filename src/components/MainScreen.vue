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
      msg: 3,
      count: 0,
      isRunning: false,
      //flag: false
    }
  },
  computed: {
    countdown () {
      return (this.msg < 18) ? (19 - this.msg) : 0
    }
  },
  created () {
    socket.init("main")
    let that = this

    socket.sock_main.onmessage = function (event) {
      var temp = JSON.parse(event.data)
      that.isRunning = temp.r
      that.msg = temp.t
      that.count = temp.c
      console.log(that.msg, that.isRunning)
    }
  },
  watch: {
    // isRunning (val, oldVal) {
    //   if (!val && oldVal && !this.flag) {
    //     this.isRunning = true
    //     this.msg = 18
    //     this.flag = true
    //     console.log(this.msg)
    //     setTimeout(() => {
    //       this.isRunning = false
    //     }, 1000)
    //   }
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
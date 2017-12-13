<template>
  <div>
    <div class="container" v-if="isRunning">
      <img class="bg" src="../assets/imgs/main-start.png"/>
      <count-down class="countdown" :sec="countdown" :isRunning="isRunning"/>
    </div>
    <div class="container" v-else>
      <img class="bg" src="../assets/imgs/main.png"/>
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
      isRunning: false
    }
  },
  computed: {
    countdown () {
      return (this.msg < 18) ? (18 - this.msg) : 0
    }
  },
  watch: {
    isRunning (val, oldVal) {
      if (val == false && oldVal == true) {
        socket.sock_main.close()
      }
    }
  },
  created () {
    socket.init("main")
    let that = this

    // socket.sock_main.onmessage = function (event) {
    //   var temp = JSON.parse(event.data)
    //   that.isRunning = temp.r

    //   if (temp.r) {
    //     that.msg = temp.t
    //     that.count = temp.c
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.bg{
  position: relative;
  z-index: 1000;
}

.countdown{
  position: absolute;
  top: 1400px;
  z-index: 9999;
}

.number{
  position: absolute;
  top: 1720px;
  z-index: 9999;
  font-family: yijun-clover;
  font-size: 110px;
  color: #E89181;
}
</style>
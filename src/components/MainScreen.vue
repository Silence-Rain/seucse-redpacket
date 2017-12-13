<template>
  <div class="container">
    <div v-if="isRunning">
      <div style="margin-top:-100px;">
        <h1>计软网安2017-2018新年晚会</h1>
        <h1>计软网红包雨</h1>
      </div>
      <div style="margin-top:120px;">

        <count-down :sec="countdown" :isRunning="isRunning"/>

        <h2 style="margin-top:150px;">活动进行中~</h2>
      </div>
    </div>
    <div v-else>
      <div>
        <h1>计软网安2017-2018新年晚会</h1>
        <h1>计软网大作战</h1>
      </div>
      <div style="margin-top:150px;">
        <h2 v-if="readyToGo">红包传送门将在 
          <span>{{ready}}</span> 
        秒后开启</h2>
        <h2 v-else>活动马上开始，大批红包is loading~</h2>
        <h2 style="margin-top:150px;">当前在线人数：{{count}}</h2>   
      </div>
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
      readyToGo: true
    }
  },
  computed: {
    countdown () {
      return (this.msg < 18) ? (18 - this.msg) : 0
    }, 
    ready () {
      return (this.msg < 5) ? (5 - this.msg) : 0
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

    socket.sock_main.onmessage = function (event) {
      var temp = JSON.parse(event.data)
      that.readyToGo = temp.r

      if (temp.r) {
        that.isRunning = (temp.t >= 5) ? true : false
        that.msg = temp.t
        that.count = temp.c
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;
  text-align: center;
}

h1{
  font-size: 65px;
}

h2{
  font-size: 40px;
}

span{
  margin: 0 20px;
  font-size: 70px;
  color: #DC143C;
}
</style>
<template>
  <div class="container">
    <div v-if="isRunning">
      <h1>计软网安2017-2018新年晚会</h1>
      <h1>计软网红包雨</h1>
      <h2>倒计时：</h2>
      <h2>00：{{msg}}</h2>
      <h2>活动进行中~</h2>
    </div>
    <div v-else>
      <h1>计软网安2017-2018新年晚会</h1>
      <h1>计软网大作战</h1>
      <h2>活动马上开始，大批红包is loading~</h2>
      <h2>当前在线人数：{{count}}</h2>
    </div>
  </div>
</template>

<script>
import socket from "../api/socket"

export default {
  name: 'MainScreen',
  data () {
    return {
      msg: 0,
      count: 0,
      isRunning: false,
      isEnd: false
    }
  },
  watch: {
    isRunning: function (val, oldVal) {
      if (val == false && oldVal == true) {
        socket.sock_main.close()
      }
    }
  },
  created: function () {
    socket.init("main")
    let that = this

    socket.sock_main.onmessage = function (event) {
      var temp = JSON.parse(event.data)
      that.isRunning = temp.r

      if (temp.r) {
        that.msg = (temp.t < 18) ? 18 - temp.t : 0
        that.count = temp.c
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
  text-align: center;
}
</style>
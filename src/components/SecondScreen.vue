<template>
  <div class="container">
    <div class="table">
      <div class="cell" v-for="(item, index) in list" :key="index">
        <img :src="item.a"/>
        <a class="nickname">{{item.n}}</a>
        <a class="count" v-if="index == 0" style="color:#DC143C;">{{item.s}}</a>
        <a class="count" v-else-if="index == 1" style="color:#FF8C00;">{{item.s}}</a>
        <a class="count" v-else-if="index == 2" style="color:#FFD700;">{{item.s}}</a>
        <a class="count" v-else>{{item.s}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import socket from "../api/socket"

export default {
  name: 'SecondScreen',
  data () {
    return {
      list: [],
      isRunning: false
    }
  },
  created: function () {
    let that = this
    socket.init("second")

    socket.sock_second.onmessage = function (event) {
      var temp = JSON.parse(event.data)
      that.isRunning = temp.r

      if (temp.r) {
        that.list = temp.l
      }
    } 
  },
  watch: {
    isRunning: function (val, oldVal) {
      if (val == false && oldVal == true) {
        socket.sock_second.close()
      }
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  width: 800px;
  height: 1200px;
  background-image: url("../assets/background.png");
  background-repeat: no-repeat;
  padding-top: 390px;
  padding-left: 150px;
}

.table{
  width: 570px;
  height: 710px;
}

.cell{
  width: 570px;
  height: 60px;
  border-radius: 30px;
  background-color: #EAEAEA;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
  padding: 0 20px;
}

.cell img{
  width: 60px;
  height: 60px;
}

.nickname{
  width: 380px;
  margin-left: 20px;
  font-size: 30px;
}

.count{
  font-size: 40px;
}
</style>
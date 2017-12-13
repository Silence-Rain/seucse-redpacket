<template>
  <div class="container">
    <div class="table">
      <div class="cell" v-for="(item, index) in list" :key="index">
        <img :src="item.a"/>
        <a class="nickname"><span>{{item.n}}</span></a>
        <a class="count" v-if="index == 0" style="color:#DC143C;">{{item.s}}</a>
        <a class="count" v-else-if="index == 1" style="color:#FF8C00;">{{item.s}}</a>
        <a class="count" v-else-if="index == 2" style="color:#FFD700;">{{item.s}}</a>
        <a class="count" v-else>{{item.s}}</a>
      </div>
    </div>

    <div class="packet-amount">
      <div v-for="(item, index) in amount" :key="index">
        <img src="../assets/redpacket.png"/>
        <a v-if="index == 0" style="color:#DC143C;">{{item}}</a>
        <a v-else-if="index == 1" style="color:#FF8C00;">{{item}}</a>
        <a v-else-if="index == 2" style="color:#FFD700;">{{item}}</a>
        <a v-else>{{item}}</a>
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
      list: [
      {
        s: 666,
        n: "草莓牛奶冰激凌蛋糕",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "cv接的迟到专家",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      {
        s: 666,
        n: "Silence心雨",
        a: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513767086&di=4ef91092a02f6a1300f9e22863b0501b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.yxzoo.com%2Fallimg%2F160725%2F1-160H5095628.png"
      },
      ],
      amount: [66.66, 20.18, 20.18, 17.18, 17.18, 17.18, 17.18, 17.18, 9.71, 9.71],
      isRunning: false
    }
  },
  created () {
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
    isRunning (val, oldVal) {
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
  display: flex;
  flex-direction: row;
}

.table{
  width: 420px;
  height: 710px;
}

.cell{
  width: 420px;
  height: 60px;
  border-radius: 30px;
  background-color: #EAEAEA;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
}

.cell img{
  width: 60px;
  height: 60px;
  border-radius: 30px;
}

.nickname{
  width: 250px;
  height: 60px;
  line-height: 60px;
  margin-left: 10px;
  font-size: 30px;
  overflow: hidden;
}

.count{
  font-size: 40px;
}

.packet-amount{
  height: 710px;
  width: 200px;
  margin-left: 20px;
}

.packet-amount div{
  height: 60px;
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 12px 0;
}

.packet-amount div img{
  height: 35px;
  width: 35px;
  margin-right: 5px;
}

.packet-amount div a{
  font-size: 30px;
}
</style>
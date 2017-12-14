<template>
  <section class="ctD-wrap" >
    <canvas id="cD" width="400" height="400"></canvas>
  </section>
</template>

<script>
  import { mapState, mapActions } from "vuex"

  export default {
    data () {
      return {
        ctx: null,
        timer: null,
        r: 200,                             // 背景圆半径r
        rB: 180,                            // 圆环半径
        lineWidth: 40,                      // 圆环粗细程度
        color: "rgba(0, 255, 0, .6)",       // 圆环颜色
      }
    },
    props: {
      sec: Number,
      isRunning: Boolean
    },
    computed: {
      // 在坐标系的度数：逆时针旋转90度
      degCs () {
        // 走了一圈的百分之多少（一圈18s）
        let pro = (1 - this.sec / 18)
        // 走的度数
        let deg = pro * Math.PI * 2
        return deg - Math.PI / 2
      }
    },
    methods: {
      drawText (text, fontSize, x, y) {
        // 文字
        this.ctx.fillStyle = "#ED4D2F"
        this.ctx.font = `bold ${fontSize}px ""`
        this.ctx.textAlign = "center"
        this.ctx.textBaseline = "middle"
        this.ctx.fillText(text, x, y)
      },
      drawCirBg () {
        // 圆形背景
        this.ctx.beginPath()
        this.ctx.arc(0, 0, this.r, 0, Math.PI * 2, false)
        this.ctx.fillStyle = "rgba(255, 255, 255, .6)"
        this.ctx.fill()
      },
      drawCirBd () {
        // 圆环
        this.ctx.beginPath()
        this.ctx.arc(0, 0, this.rB, this.degCs, Math.PI * 2 - Math.PI / 2, false)
        this.ctx.strokeStyle = this.color
        this.ctx.stroke()
      },
      colorChange () {
        switch (true) {
          case this.sec >= 10 :
            this.color = "rgba(0, 255, 0, .6)"    //绿色
            break
          case this.sec >= 5 :
            this.color = "rgba(255, 255, 0, .6)"  //黄色
            break
          case this.sec <= 5 :
            this.color = "rgba(255, 0, 0, .6)"    //红色
            break
        }
      },
      // canvas绘图
      drawCd () {
        // 移动原点
        this.ctx.clearRect((-1) * this.r, (-1) * this.r, 2 * this.r, 2 * this.r)

        this.drawCirBg()
        this.ctx.lineWidth = this.lineWidth
        this.colorChange()
        this.drawCirBd()

        // 文字
        let time = this.sec
        this.drawText(time, 120, 0, -30)
        this.drawText("sec", 50, 0, 70)   
      },
    },
    mounted () {
      let drawing = document.querySelector("#cD")
      this.ctx = drawing.getContext("2d")
      // 移动原点
      this.ctx.translate(this.r, this.r) 
    },
    watch: {
      sec: {
        immediate: true,
        handler (val) {
          if (this.isRunning && this.ctx) {
            this.drawCd()
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>
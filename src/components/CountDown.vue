<template>
  <section class="ctD-wrap" >
    <canvas id="cD" width="400" height="400"></canvas>
  </section>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    data () {
      return {
        ctx: null,
        timer: null,
        ms: 10,
        r: 200,        // 背景圆半径r。这里100为cavans宽的一半
        rB: 180,        // 圆环半径90
        lineWidth: 40,  // 圆环粗细程度
        color: ['rgba(0, 255, 0, .6)', 'rgba(0, 100, 0, .6)'],      // 颜色
      }
    },
    props: {
      sec: Number,
      isRunning: Boolean
    },
    computed: {
      // 在坐标系的度数：逆时针旋转90度
      degCs () {
        // 走了一圈的百分之多少
        let pro = (1 - this.ms / (this.sec * 1000))
        // 走的度数
        let deg = pro * Math.PI * 2
        return deg - Math.PI / 2
      }
    },
    methods: {
      drawText (text, fontSize, x, y) {
        // 文字
        this.ctx.fillStyle = '#000'
        this.ctx.font = `bold ${fontSize}px ''`
        this.ctx.textAlign = 'center'
        this.ctx.textBaseline = 'middle'
        this.ctx.fillText(text, x, y)
      },
      drawCirBg () {
        // 圆形背景
        this.ctx.beginPath()
        this.ctx.arc(0, 0, this.r, 0, Math.PI * 2, false)
        this.ctx.fillStyle = 'rgba(255, 255, 255, .6)'
        this.ctx.fill()
      },
      drawCirBd () {
        // 圆环
        this.ctx.beginPath()
        this.ctx.arc(0, 0, this.rB, this.degCs, Math.PI * 2 - Math.PI / 2, false)
        this.ctx.strokeStyle = this.color[0]
        this.ctx.stroke()
      },
      colorChange () {
        switch (true) {
          case this.ms >= 10000 :
            this.color[0] = 'rgba(0, 255, 0, .6)'
            this.color[1] = 'rgba(0, 100, 0, .6)'
            break
          case this.ms >= 5000 :
            this.color[0] = 'rgba(255, 255, 0, .6)'
            this.color[1] = 'rgba(100, 100, 0, .6)'
            this.speedFan += 0.01
            break
          case this.ms <= 5000 :
            this.color[0] = 'rgba(255, 0, 0, .6)'
            this.color[1] = 'rgba(100, 0, 0, .6)'
            this.speedFan += 0.02
            break
        }
      },
      clearTimer () {
        clearInterval(this.timer)
        this.timer = null
      },
      // canvas绘图
      drawCd () {
        let self = this
        this.ctx.clearRect((-1) * this.r, (-1) * this.r, 2 * this.r, 2 * this.r)
        // 原点移动

        this.drawCirBg()

        if (this.ms <= 0) {
          this.clearTimer()
        } else {
          this.ctx.lineWidth = this.lineWidth
          this.colorChange()

          this.drawCirBd()

          // 文字
          let time = Math.ceil(this.ms / 1000)
          this.drawText(time, 120, 0, -30)
          this.drawText('sec', 50, 0, 70)
        }
      },
      // 启动定时器，开始倒计时
      startCd () {
        // fps：1s的帧数
        let fps = 100
        let sepTime = 1000 / fps
        this.timer = setInterval(() => {
          this.drawCd()
          this.ms -= sepTime
//          console.log(this.ms)
        }, sepTime)
      }
    },
    mounted () {
      const self = this
      let drawing = document.querySelector('#cD')
      this.ctx = drawing.getContext('2d')
      // 移动原点
      this.ctx.translate(this.r, this.r)

      if (this.isRunning)
        this.startCd()
    },
    watch: {
      sec: {
        immediate: true,
        handler: function (val) {
          this.ms = 1000 * val
        }
      }
    }
  }
</script>

<style scoped>

</style>
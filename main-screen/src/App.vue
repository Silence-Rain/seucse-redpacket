<template>
  <div id="app">
    <main-screen/>
  </div>
</template>

<script>
import MainScreen from './components/MainScreen'
import CountDown from './components/CountDown'

export default {
  name: 'app',
  components: {
    MainScreen,
    CountDown
  }
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei UI";
}
</style>


<template>
  <div id="app">
	<!-- <main-screen/> -->
  <second-screen/> 
  </div>
</template>

<script>
import MainScreen from './components/MainScreen'
import SecondScreen from './components/SecondScreen'
import CountDown from './components/CountDown'

export default {
  name: 'app',
  components: {
    MainScreen,
    SecondScreen,
    CountDown
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft Yahei UI';
}
</style>

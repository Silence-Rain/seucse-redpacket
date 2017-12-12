<template>
  <div id="app">
    <main-screen/>
    <second-screen/>
  </div>
</template>

<script>
import MainScreen from './components/MainScreen'
import SecondScreen from './components/SecondScreen'

export default {
  name: 'app',
  components: {
    MainScreen,
    SecondScreen
  }
}
</script>

<style>
#app {
  font-family: 'Microsoft Yahei UI';
}
</style>

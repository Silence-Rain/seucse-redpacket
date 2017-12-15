<template>
  <div id="app">
    <second-screen/>
  </div>
</template>

<script>
import SecondScreen from './components/SecondScreen'

export default {
  name: 'app',
  components: {
    SecondScreen
  }
}
</script>

<style>
#app {
  font-family: "Microsoft YaHei UI";
}
</style>

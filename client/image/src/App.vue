<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <imageList><imageList>
  </div>
</template>

<script>
import imageList from './components/imageList'
export default {
  name: 'app',
  components: {
    imageList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

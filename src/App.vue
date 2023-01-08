<template>
  <div id="app">
    <Navbar /> <!-- 3 -->
    <router-view></router-view> <!-- 라우팅에 따라 대체되는 부분 -->
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue' //1

export default {
  name: 'app',
  components: {Navbar}, //2
  data () {
    return {
    }
  }
}
</script>

<style>
</style>

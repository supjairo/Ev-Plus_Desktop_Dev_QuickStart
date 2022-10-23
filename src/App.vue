<template>
  <p>使用EV-Plus建议先了解使用文档</p>
  <router-link to="/">Home页面</router-link>
  |
  <router-link to="/About">About页面</router-link>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

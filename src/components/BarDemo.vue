<template>
  <div>
    <p>这是组件BarDemo产生的路径信息</p>
    <span>当前正在访问的路径是{{route.path}}</span>
  </div>
</template>

<script setup>
//根据路由的不同，显示不同的内容
import {useRoute} from 'vue-router'
const route = useRoute()

</script>

<style scoped>

</style>

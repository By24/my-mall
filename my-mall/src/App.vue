<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{padding: 0;margin: 0;}
html, body, #app {height: 100%;}
.toolbar {background:#f2f2f2;padding: 10px;border: 1px solid #dfe6ec;margin: 10px 0px;}
.toolbar .el-form-item {margin-bottom: 10px;}
</style>

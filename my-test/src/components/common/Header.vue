<template>
  <header>
    <div class="header">
      <div class="logo">LOGO</div>
      <div class="nav">
        <div v-for="(item,i) in nav" :key="i" class="nav_list">{{item.name}}</div>
      </div>
      <div class="user">
        <img src="../../assets/logo.png" alt="logo">
        <div>个人中心</div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      nav: [{name: 'nav1'}, {name: 'nav1'}, {name: 'nav1'}, {name: 'nav1'}]
    }
  }
}
</script>

<style scoped>

header{
  background: #000;
  opacity: 0.8;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.header{
  width: 1200px;
  display: flex;
  margin: 0 auto
}
.logo {
  width: 100px;
}
.nav {
  display: flex;
  flex: 1;
  padding: 0 80px;
  color: #fff;
}
.nav div{
  padding: 0 50px;
}
.nav_list:hover{
  color: #ccc;
  cursor:pointer
}
.user{
  display: flex;
  height: 100px;
  color: #fff;
  line-height: 100px;
  background: #000;
  opacity: 0.8;
  text-align: right;
}
.user img{
  margin: 25px 0;
  line-height: 100px;
  width: 50px;
  height: 50px;
}
.user div{
  flex: 1;
}
</style>

<template>
    <div class="cont">
       <div :class="isShow ? 'nav_left' : 'hide'">
          <nav>
            <div class="logo">LOGO</div>
            <ul v-for="(item,i) in leftNav" :key="i">
              <li class="nav_name">{{item.name}}</li>
            </ul>
          </nav>
       </div>
       <div :class="isShow ? 'cont_right' : 'rHide'">
           <header>
               <a href="javascript:;" class="scale" @click='scale'></a>
           </header>
           <div class="page">
             <y-product-list></y-product-list>
           </div>
       </div>
    </div>
</template>

<script>
import YProductList from './commons/ProductList'
export default {
  name: 'Home',
  data () {
    return {
      isShow: true,
      leftNav: [{name: 'nav1'}, {name: 'nav2'}]
    }
  },
  methods: {
    scale: function () {
      this.isShow = !this.isShow
    }
  },
  components: {
    YProductList
  }
}
</script>
<style scoped>
.cont{
  height: 100%;
  display: flex;
}
.nav_left{
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  background: #000;
  opacity: 0.8;
}
.cont_right{
  flex: 1;
  margin-left: 200px;
}
header{
  position: relative;
  height: 70px;
  line-height: 70px;
  background: #000;
  opacity: 0.8;
}
.scale{
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  background: #ccc;
  top: 20px;
  left: 20px;
}
.nav{
  overflow-y: scroll
}
.nav_name{
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    cursor:pointer
}
.nav_name:hover{
    background: #ccc;
    opacity: .8;
}
.hide{
  animation: myfirst .5s;
  width: 50px;
  height: 100%;
  position: fixed;
  left: 0;
  background: #000;
  opacity: 0.8;
}
.rHide{
  animation: myfirsts .5s;
  flex: 1;
  margin-left: 50px;
}
@keyframes myfirst
{
from {width: 200px;}
to {width: 50px;}
}
@keyframes myfirsts
{
from {margin-left: 200px;}
to {margin-left: 50px;}
}
.page{
  padding: 25px;
}
.logo{
  text-align: center;
  height: 70PX;
  line-height: 70px
}
</style>

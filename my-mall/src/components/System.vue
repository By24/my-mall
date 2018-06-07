<template>
    <el-row>
        <el-col :span='4'>
          <div :class="isShow ? 'nav_left' : 'hide'">
              <nav>
                <div class='logo' @click="onHome">LOGO</div>
                <ul v-for='(item,i) in leftNav' :key='i'>
                  <li class='nav_name' @click="toPage(i,item.list.length)" :id="'nav_'+ i">
                    <p v-if="isShow">{{item.name}}</p>
                    <img v-else :src="item.icon" alt="图标" class="nav_icon">
                    <ul :class="isShow ? 'nav_shor' : 'hides'">
                      <li class='' v-for='(pen,i) in item.list' :key='i'>{{pen.name}}</li>
                    </ul>
                    <ul :class="isBottom ? 'nav_shors' : 'hidess'">
                      <li class='' v-for='(pen,i) in item.list' :key='i'>{{pen.name}}</li>
                    </ul>
                  </li>
                </ul>
              </nav>
          </div>
        </el-col>
        <el-col :span='24'>
          <div :class="isShow ? 'cont_right' : 'rHide'">
              <header>
                  <a href='javascript:;' class='scale' @click='scale'></a>
                  <div class='userInfo'>
                    <p>{{ userName }}</p>
                    <ul>
                      <li @click='loginOut'>退出</li>
                    </ul>
                  </div>
              </header>
              <div :class="!isShow ? 'page' : 'pages'">
                <router-view/>
              </div>
          </div>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      isShow: true,
      isBottom: true,
      leftNav: [{
        name: '商品管理',
        icon: '../assets/icon/goodsClass.png',
        path: '/ProductList',
        list: [{
          name: '商品列表',
          icon: '../assets/icon/goodsClass.png',
          path: '/ProductList'
        }, {
          name: '商品1',
          icon: '../assets/icon/goodsClass.png',
          path: '/ProductList'
        }, {
          name: '商品2',
          icon: '../assets/icon/goodsClass.png',
          path: '/ProductList'
        }]
      }, {
        name: '订单管理',
        icon: '../assets/icon/goodsClass.png',
        path: '/ProductList',
        list: [{
          name: '商品45',
          icon: '../assets/icon/goodsClass.png',
          path: '/ProductList'
        }]
      }],
      userName: '',
      page: 'page1'
    }
  },
  mounted () {
    this.userName = JSON.parse(sessionStorage.getItem('userInfoStorage'))
  },
  methods: {
    scale () {
      this.isShow = !this.isShow
      this.isBottom = !this.isBottom
    },
    toPage (n, index, path) {
      for (var i = 0; i < document.getElementsByClassName('active').length; i++) {
        document.getElementsByClassName('active')[i].classList.remove('active')
      }
      document.getElementById('nav_' + n).classList.add('active')
      document.getElementsByClassName('active')[0].style.marginButtom = (n * 50) + 'px'
      this.$router.push({ path: this.leftNav[index].path })
    },
    onHome () {
      this.$router.push({ path: '/' })
    },
    loginOut () {
      sessionStorage.clear('userInfoStorage')
      this.$router.push({ path: 'Login' })
    }
  }
}
</script>
<style scoped>
.cont{
  height: 100%;
  display: flex;
}
.nav_left{
  transition: width .5s linear 0s;
  width: 200px;
  height: 100%;
  position: fixed;
  left: 0;
  background: #000;
  opacity: 0.8;
}
.cont_right{
  transition: margin-left .5s linear 0s;
  flex: 1;
  margin-left: 200px;
}
header{
  transition: width .5s linear 0s;
  position: relative;
  height: 70px;
  line-height: 70px;
  background: #000;
  opacity: 0.8;
}
.scale{
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAASCAYAAABb0P4QAAAAPUlEQVQ4jWP8////EQYGBmsG6oAjTFQyCAYYGf///09VE6ntwlEDqWTgEQYGhv9UwodH0+GogWQaOLjTIQBb2jHJtVzZ1AAAAABJRU5ErkJggg==") no-repeat;
  background-size: cover;
  top: 25px;
  left: 20px;
}
.userInfo{
  width: 100px;
  text-align: center;
  position: absolute;
  right: 20px;
}
.userInfo p{
 cursor:pointer;
}
.userInfo:hover ul{
  display: block;
}
.userInfo ul li{
  /* width: 100%; */
  height: 40px;
  line-height: 40px;
  background: #ccc;
  margin: 1px 0;
  cursor:pointer;
}
.userInfo ul{
  display: none;
  margin-top: 10px;
}
.nav{
  overflow-y: scroll;
}
.nav_icon{
  width: 22px;
  height: 22px;
}
.nav_name{
  /* overflow: hidden; */
  position: relative;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  cursor:pointer
}
.nav_name .hides{
  display: none;
  position: absolute;
  left: 50px;
  top: 2px;
  padding-left: 2px
}
.hides li{
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
  background: #000;
  opacity: 0.8;
  height: 50px;
  line-height: 50px;
  width: 100px;
}
.hides li:hover {
   background: red
}
.nav_name:hover .hides{
  display: block;
}
.nav_name .hidess{
  display: none;
}
.nav_name .nav_shor{
  display: none;
  background: #ccc;
  opacity: .8;
  display: none
}
.nav_name .nav_shors{
  display: none;
  opacity: .8;
  background: #ccc;
}
.nav_name .nav_shors li{
  border-bottom: 1px solid #7e7e7e;
  height: 50px;
}
.active {
  border-bottom: 1px solid #7e7e7e;
  height: auto;
}
.active .nav_shors{
  display: block;
}
.nav_name .nav_shors li:hover{
  background: red
}
.nav_name p:hover{
    background: red;
    opacity: .8;
}
.hide{
  transition: width .5s linear 0s;
  width: 50px;
  height: 100%;
  position: fixed;
  left: 0;
  background: #000;
  opacity: 0.8;
}
.rHide{
  transition: margin-left .5s linear 0s;
  flex: 1;
  margin-left: 50px;
}
.rHide .scale{
  transform:rotate(90deg)
}
.page{
  transition: left .5s linear 0s;
  padding: 25px;
  position: absolute;
  right: 0;
  left: 50px;
  z-index: -100;
}
.pages{
  padding: 25px;
  position: absolute;
  right: 0;
  left: 200px;
  z-index: -100;
  transition: left .5s linear 0s;
  -moz-transition:left 1s linear 0s;
  -webkit-transition:left 1s linear 0s;
  -o-transition:left 1s linear 0s;
}
.logo{
  text-align: center;
  height: 70PX;
  line-height: 70px;
  cursor:pointer
}
</style>

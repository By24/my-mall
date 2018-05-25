<template>
    <el-row>
        <el-col :span='4'>
          <div :class="isShow ? 'nav_left' : 'hide'">
              <nav>
                <div class='logo' @click="onHome">LOGO</div>
                <ul v-for='(item,i) in leftNav' :key='i'>
                  <li class='nav_name' @click="toPage(i)">{{item.name}}</li>
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
              <div class='page'>
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
      leftNav: [{name: 'nav1', path: '/ProductList'}, {name: 'nav2', path: 'UserList'}],
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
    },
    toPage (index) {
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
  cursor:pointer
}
.userInfo ul{
  display: none;
  margin-top: 10px;
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
  line-height: 70px;
  cursor:pointer
}
</style>

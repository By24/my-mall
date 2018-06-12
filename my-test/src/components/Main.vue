<template>
  <div class="hello">
    <y-header></y-header>
    <b-utton></b-utton>
    <!-- <div class="el-carousel">
      <el-carousel height="400px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3>{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <section v-for="item in card" :key="item.name">
      <div class="card_titel"><p class="card_name">{{item.title}}</p><a href="" class="card_more">更多 ></a></div>
      <div class="card_cont">
        {{item.left}}
      </div>
    </section>
    <y-footer></y-footer>
  </div>
</template>

<script>
import YHeader from './common/Header'
import YFooter from './common/Footer'
import BUtton from './common/Btn'
import { requestSysList } from '../api/api'
export default {
  name: 'Home',
  data () {
    return {
      card: [{
        name: 'card_1',
        left: 'sdsdsdd'
      }, {
        name: 'card_2',
        left: 'sdsdsdd'
      }]
    }
  },
  components: {
    YHeader,
    BUtton,
    YFooter
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    // 获取用户列表
    getUsers () {
      let para = {
        page: 1,
        limit: 10
      }
      requestSysList(para).then((res) => {
        this.card = res.data
        console.log(this.card)
      })
    }
  }
}
</script>

<style scoped>
.el-carousel{
  width: 1200px;
  margin: 50px auto 0;
}
.el-carousel__item h3{
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.el-carousel__item:nth-child(2n){
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1){
    background-color: #d3dce6;
}
section{
  width: 1200px;
  margin: 50px auto 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.card_titel{
  height: 50px;
  line-height: 50px;
  padding-left: 10px;
  border-bottom: 1px solid #CCC;
  /* padding-left: 30px; */
  position: relative;
  z-index: 10;
  /* height: 60px;
  padding: 0 10px 0 24px; */
  border-bottom: 1px solid #d4d4d4;
  border-radius: 8px 8px 0 0;
  box-shadow: 0 1px 7px rgba(0,0,0,.06);
  background: #f3f3f3;
  background: linear-gradient(#fbfbfb,#ececec);
  line-height: 50px;
  /* font-size: 18px; */
  color: #333;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.card_name{
 flex: 1;
}
.card_more{
  margin-right: 10px
}
.card_cont{
  padding: 10px;
  height: 400px;
  background: #ffffff
}
</style>

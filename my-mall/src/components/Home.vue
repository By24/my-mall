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
      <div class="card_titel"><p class="card_name">{{item.name}}</p><a href="" class="card_more">更多 ></a></div>
      <div class="card_cont">
        <div class="card_cont_left">
          <img src="../assets/timg.jpg" alt="">
        </div>

        <div class="card_cont_right">
          <div class="good-item" >
            <div><div class="good-img">
              <a href="/goodsDetails?productId=100022201" class="">
                <img alt="《深泽直人》" src="http://image.smartisanos.cn/resource/5e4e40120d09fb6791f9430f914c6f68.jpg" lazy="loaded">
              </a>
              </div> 
              <h6 class="good-title">《深泽直人》</h6> 
              <h3 class="sub-title ellipsis">首次面向中国读者介绍其作品</h3> 
              <div class="good-price pr">
                <div class="ds pa">
                <a href="/goodsDetails?productId=100022201" class="">
                  <input data-v-02725a06="" type="button" readonly="readonly" class="default-btn" value="查看详情" style="margin: 0px 5px;">
                </a> 
                <input data-v-02725a06="" type="button" readonly="readonly" class="main-btn" value="加入购物车" style="margin: 0px 5px;">
                </div>
                  <p><span style="font-size: 16px;">￥</span>199</p>
                </div>
            </div>
          </div>

          <div class="good-item" >
            <div><div class="good-img">
              <a href="/goodsDetails?productId=100022201" class="">
              <img alt="《深泽直人》" src="http://image.smartisanos.cn/resource/5e4e40120d09fb6791f9430f914c6f68.jpg" lazy="loaded">
              </a>
              </div> 
              <h6 class="good-title">《深泽直人》</h6> 
              <h3 class="sub-title ellipsis">首次面向中国读者介绍其作品</h3> 
              <div class="good-price pr">
                <div class="ds pa">
                <a href="/goodsDetails?productId=100022201" class="">
                  <input data-v-02725a06="" type="button" readonly="readonly" class="default-btn" value="查看详情" style="margin: 0px 5px;">
                </a> 
                <input data-v-02725a06="" type="button" readonly="readonly" class="main-btn" value="加入购物车" style="margin: 0px 5px;">
                </div>
                  <p><span style="font-size: 16px;">￥</span>199</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <y-footer></y-footer>
  </div>
</template>

<script>
import YHeader from './common/Header'
import YFooter from './common/Footer'
import BUtton from './common/Btn'
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
  display: flex;
  /* padding: 10px; */
  height: 440px;
  background: #ffffff
}
.card_cont_left{
  height: 100%;
  width: 600px;
}
.card_cont_left img{
  width: 100%;
  height: 100%;
}
.card_cont_right{
  display: flex;
  height: 100%;
  width: 600px;
}
.card_cont_right ul{
  height: 100%;
  display: flex;
}
.card_cont_right ul li{
  width:50%;
  height:100%;
}
.goods{
  width: 100%;
  height: 100%;
}
.good-item{
    background: #fff;
    width: 50%;
    transition: all .5s;
}
.good-item .good-img img{
    margin: 50px auto 10px;
    width: 206px;
    height: 206px;
    display: block;
}
.good-item .good-title {
    line-height: 1.2;
    font-size: 16px;
    color: #424242;
    margin: 0 auto;
    padding: 0 14px;
    text-align: center;
    overflow: hidden;
}
.good-item h3{
    text-align: center;
    line-height: 1.2;
    font-size: 12px;
    color: #d0d0d0;
    padding: 10px;
}
.ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.good-item .good-price {
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #e4393c;
    font-size: 20px;
}
.good-item .ds{
    width: 100%;
    display: none;
}
a {
    font-style: normal;
    text-decoration: none;
    color: #5079d9;
    cursor: pointer;
    transition: all .15s ease-out;
}
.good-item .ds{
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
}
.main-btn{
    border: 1px solid #5c81e3;
    border-radius: 4px;
    font-size: 12px;
    color: #fff;
    background-color: #678ee7;
    background-image: linear-gradient(180deg,#678ee7,#5078df);
}
.default-btn{
    border: 1px solid #e1e1e1;
    border-radius: 4px;
    font-size: 12px;
    color: #646464;
    background-color: #f9f9f9;
    background-image: linear-gradient(180deg,#fff,#f9f9f9);
}
.pr {
    position: relative;
}
.pa {
    position: absolute;
}
.good-item .good-price{
    margin: 15px 0;
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: #e4393c;
    font-size: 20px;
}
.default-btn, .disabled-btn, .main-btn{
    width: 100px;
    height: 30px;
    line-height: 28px;
    vertical-align: middle;
}
input{
    display: inline-block;
    cursor: pointer;
    text-align: center;
}
</style>

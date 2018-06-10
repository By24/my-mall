import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import NotFound from '@/components/404.vue'
import Home from '@/components/Home.vue'
//商城
import mallModuleManage from '@/components/page/mallModuleManage'
import mallCarouselManage from '@/components/page/mallCarouselManage'
import mallPlateManage from '@/components/page/mallPlateManage'
import mallOtherPlateManage from '@/components/page/mallOtherPlateManage'
import mallCourierManage from '@/components/page/mallCourierManage'
// 商品
import GoodsAddPage from '@/components/page/GoodsAddPage'
import GoodsClassifyManage from '@/components/page/GoodsClassifyManage'
import GoodsManageList from '@/components/page/GoodsManageList'
// 订单
import OrdersManageList from '@/components/page/OrdersManageList'
// 评论
import ReviewManage from '@/components/page/ReviewManage'
// 用户
import UserAddPage from '@/components/page/UserAddPage'
import UserManageList from '@/components/page/UserManageList'
import UserDistributedManage from '@/components/page/UserDistributedManage'
//系统报表
import StatisticalOrders from '@/components/page/StatisticalOrders'
// 系统
import SystemBasic from '@/components/page/SystemBasic'
import SystemUserList from '@/components/page/SystemUserList'
import SystemInfo from '@/components/page/SystemInfo'
import SystemLog from '@/components/page/SystemLog'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      hidden: true
    }, {
      path: '/404',
      component: NotFound,
      name: '',
      hidden: true
    }, {
      path: '/',
      name: '主页',
      component: Main,
      iconCls: 'el-icon-menu',
      // leaf: true, // 只有一个节点
      hidden: true,
      children: [{ path: '/Home', name: '', component: Home }]
    }, {
      path: '/',
      name: '商城管理',
      component: Main,
      iconCls: 'el-icon-menu',
      // leaf: true, // 只有一个节点
      children: [
        { path: '/mallModuleManage', name: '首页模块管理', component: mallModuleManage },
        { path: '/mallCarouselManage', name: '首页轮播图管理', component: mallCarouselManage },
        { path: '/mallPlateManage', name: '首页板块内容管理', component: mallPlateManage },
        { path: '/mallOtherPlateManage', name: '其他板块内容管理', component: mallOtherPlateManage },
        { path: '/mallCourierManage', name: '快递设置', component: mallCourierManage }]
    }, {
      path: '/',
      name: '商品管理',
      component: Main,
      iconCls: 'el-icon-goods',
      children: [
        // { path: '/GoodsAddPage', name: '添加商品', component: GoodsAddPage },
        { path: '/GoodsClassifyManage', name: '商品分类管理', component: GoodsClassifyManage },
        { path: '/GoodsManageList', name: '商品管理列表', component: GoodsManageList }]
    }, {
      path: '/',
      name: '订单管理',
      component: Main,
      iconCls: 'el-icon-edit-outline',
      children: [
        { path: '/OrdersManageList', name: '订单列表', component: OrdersManageList }]
    }, {
      path: '/',
      name: '评论管理',
      component: Main,
      iconCls: 'el-icon-edit',
      children: [
        { path: '/ReviewManage', name: '畅言评论管理', component: ReviewManage }]
    }, {
      path: '/',
      name: '会员管理',
      component: Main,
      iconCls: 'el-icon-news',
      children: [
        // { path: '/UserAddPage', name: '添加用户', component: UserAddPage },
        { path: '/UserManageList', name: '用户管理列表', component: UserManageList },
        { path: '/UserDistributedManage', name: '用户分布图', component: UserDistributedManage }]
    }, {
      path: '/',
      name: '系统报表',
      component: Main,
      iconCls: 'el-icon-setting',
      children: [
        { path: '/StatisticalOrders', name: '订单销量统计', component: StatisticalOrders }]
    }, {
      path: '/',
      name: '系统设置',
      component: Main,
      iconCls: 'el-icon-loading',
      // leaf: true, // 只有一个节点
      children: [
        { path: '/SystemBasic', name: '基本设置', component: SystemBasic },
        { path: '/SystemUserList', name: '管理员管理', component: SystemUserList },
        { path: '/SystemInfo', name: '系统信息', component: SystemInfo },
        { path: '/SystemLog', name: '系统日志', component: SystemLog }]
    }, {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

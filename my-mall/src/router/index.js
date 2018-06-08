import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import NotFound from '@/components/404.vue'
// 用户
import UserAddPage from '@/components/page/UserAddPage'
import UserManageList from '@/components/page/UserManageList'
import UserDistributedManage from '@/components/page/UserDistributedManage'
// 商品
import GoodsManageList from '@/components/page/GoodsManageList'
import GoodsClassifyManage from '@/components/page/GoodsClassifyManage'
import GoodsAddPage from '@/components/page/GoodsAddPage'
// 订单
import OrdersManageList from '@/components/page/OrdersManageList'
// 系统
import SystemUserAddPage from '@/components/page/SystemUserAddPage'
import SystemUserList from '@/components/page/SystemUserList'
import SystemInfo from '@/components/page/SystemInfo'
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
      name: 'UserManagement',
      component: Main,
      iconCls: 'el-icon-message',
      children: [
        { path: '/UserAddPage', name: 'UserAddPage', component: UserAddPage },
        { path: '/UserManageList', name: 'UserManageList', component: UserManageList },
        { path: '/UserDistributedManage', name: 'UserDistributedManage', component: UserDistributedManage }]
    }, {
      path: '/',
      name: 'GoodsManagement',
      component: Main,
      iconCls: 'el-icon-message',
      children: [
        { path: '/GoodsAddPage', name: 'GoodsAddPage', component: GoodsAddPage },
        { path: '/GoodsManageList', name: 'GoodsManageList', component: GoodsManageList },
        { path: '/GoodsClassifyManage', name: 'GoodsClassifyManage', component: GoodsClassifyManage }]
    }, {
      path: '/',
      name: 'OrdersManage',
      component: Main,
      iconCls: 'el-icon-message',
      children: [
        { path: '/OrdersManageList', name: 'OrdersManageList', component: OrdersManageList }]
    }, {
      path: '/',
      name: 'SystemSettings',
      component: Main,
      iconCls: 'el-icon-message',
      // leaf: true, // 只有一个节点
      children: [
        { path: '/SystemUserAddPage', name: 'SystemUserAddPage', component: SystemUserAddPage },
        { path: '/SystemUserList', name: 'SystemUserList', component: SystemUserList },
        { path: '/SystemInfo', name: 'SystemInfo', component: SystemInfo }]
    }, {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    }
  ]
})

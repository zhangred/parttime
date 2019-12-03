import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Index from './pages/index/index'
import Indexa from './pages/index/index01'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/map',  name: 'map', component: resolve=> require(['./pages/single/map'], resolve)},
    { path: '/',redirect: '/map', name: 'indexmap', component: Index },
    { path: '/index', name: 'index', component: Index },
    { path: '/index01',  name: 'index01', component: Indexa},
    { path: '/pages/question', name: 'question', component: resolve => require(['./pages/question/index'], resolve) },
    { path: '/lottery',  name: 'lottery', component: resolve=> require(['./pages/lottery/index'], resolve)},
    { path: '/lottery/mine',  name: 'lotteryMine', component: resolve=> require(['./pages/lottery/mine'], resolve)},
    { path: '/category', name: 'category', component: resolve => require(['./pages/category/index'], resolve) },
    { path: '/category01', name: 'category01', component: resolve => require(['./pages/category/index01'], resolve) },
    { path: '/category/list', name: 'categoryList', component: resolve => require(['./pages/category/list'], resolve) },
    { path: '/category/detail', name: 'gooddetail', component: resolve => require(['./pages/gooddetails/normal'], resolve) },
    { path: '/category/ordersave', name: 'cateordersave', component: resolve => require(['./pages/ordersave/normal'], resolve) },
    { path: '/cart', name: 'cart', component: resolve => require(['./pages/cart/index'], resolve) },
    { path: '/mine', name: 'mine', component: resolve => require(['./pages/mine/index'], resolve) },
    { path: '/mine01', name: 'mine01', component: resolve => require(['./pages/mine/index01'], resolve) },
    { path: '/mine/setting', name: 'mineSetting', component: resolve => require(['./pages/mine/setting'], resolve) },
    { path: '/pages/feedback', name: 'feedback', component: resolve => require(['./pages/single/feedback'], resolve) },
    { path: '/mine/couponlist', name: 'couponlist', component: resolve => require(['./pages/mine/coupon'], resolve) },
    { path: '/seckill', name: 'seckill', component: resolve => require(['./pages/seckill/index'], resolve) },
    { path: '/seckill/detail', name: 'seckillDetail', component: resolve => require(['./pages/gooddetails/seckill'], resolve) },
    { path: '/signin', name: 'signin', component: resolve => require(['./pages/single/signin'], resolve) },
    { path: '/assemble/goodDetail', name: 'assembleGoodDetail', component: resolve => require(['./pages/gooddetails/assemble'], resolve) },
    { path: '/coupanCenter', name: 'coupanCenter', component: resolve => require(['./pages/single/couponcenter'], resolve) },
    { path: '/mine/address', name: 'address', component: resolve => require(['./pages/mine/address/list'], resolve) },
    { path: '/mine/address/edit', name: 'addressEdit', component: resolve => require(['./pages/mine/address/edit'], resolve) },
    //发票
    { path: '/mine/invoicelist', name: 'invoiceList', component: resolve => require(['./pages/mine/invoice/list'], resolve) },
    { path: '/mine/invoice/edit', name: 'invoiceEdit', component: resolve => require(['./pages/mine/invoice/edit'], resolve) },
    //团购
    { path: '/assemble', name: 'assemble', component: resolve => require(['./pages/assemble/index'], resolve) },
    { path: '/assemble/detail', name: 'assembleDetail', component: resolve => require(['./pages/assemble/detail'], resolve) },
    { path: '/assemble/ordersave', name: 'assembleOrdersave', component: resolve => require(['./pages/ordersave/assemble'], resolve) },
    //我的订单
    { path: '/order/list', name: 'orderlist', component: resolve => require(['./pages/order/list'], resolve) },
    { path: '/order/detail', name: 'orderdetail', component: resolve => require(['./pages/order/detail'], resolve) },
    { path: '/order/logistics', name: 'orderlogistics', component: resolve => require(['./pages/order/logistics'], resolve) },
    { path: '/order/refundApply', name: 'orderrefundApply', component: resolve => require(['./pages/order/refund_apply'], resolve) },
    { path: '/order/refundDetail', name: 'orefundDetail', component: resolve => require(['./pages/order/refund_detail'], resolve) },
    
  ]
})
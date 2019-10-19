import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Index from './pages/index/index'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/map',  name: 'map', component: resolve=> require(['./pages/single/map'], resolve)},
    { path: '/',redirect: '/map', name: 'index', component: Index },
    { path: '/index', name: 'index', component: Index },
    { path: '/index01',  name: 'lotteryMine', component: resolve=> require(['./pages/index/index01'], resolve)},
    { path: '/question', name: 'question', component: resolve => require(['./pages/question/index'], resolve) },
    { path: '/lottery',  name: 'lottery', component: resolve=> require(['./pages/lottery/index'], resolve)},
    { path: '/lottery/mine',  name: 'lotteryMine', component: resolve=> require(['./pages/lottery/mine'], resolve)},
    { path: '/category', name: 'category', component: resolve => require(['./pages/category/index'], resolve) }
  ]
})
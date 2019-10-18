import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Index from './pages/index/index'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/',redirect: '/map', name: 'index', component: Index },
    { path: '/question', name: 'question', component: resolve => require(['./pages/question/index'], resolve) },
    { path: '/category', name: 'category', component: resolve => require(['./pages/category/index'], resolve) },
    { path: '/map',  name: 'map', component: resolve=> require(['./pages/single/map'], resolve)},
    { path: '/lottery',  name: 'lottery', component: resolve=> require(['./pages/lottery/index'], resolve)},
    { path: '/lottery/mine',  name: 'lotteryMine', component: resolve=> require(['./pages/lottery/mine'], resolve)},
    { path: '/index', name: 'index', component: Index }
  ]
})
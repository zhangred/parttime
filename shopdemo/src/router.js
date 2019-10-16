import Vue from 'vue'
import Router from 'vue-router'
 
//组件模块
import Index from './pages/index/index'
// import Category from './pages/category/index'
// import Admin from './components/admin/admin'
 
Vue.use(Router)
 
export default new Router({
  routes: [
    { path: '/', name: 'index', component: Index },
    { path: '/category', name: 'category', component: resolve => require(['./pages/category/index'], resolve) }
    // { path: '/header',  name: 'Header', component: Header},
    // { path: '/admin',  name: 'Admin', component: Admin}
  ]
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import {Toast,Image,Dialog,Icon } from 'vant'

import './filters/filters'
import './components/BaseComponents'

import './assets/css/base.less'
import './assets/js/rem'

import tools from './assets/js/tools'


var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }    
})
Vue.use(VueAxios, axios_instance,Toast);
Vue.use(Image)
Vue.use(Dialog);
Vue.use(Icon);


router.beforeEach((to, from, next) => {
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})

Vue.config.productionTip = false
Vue.prototype.Ob = new Vue();

Vue.prototype.themes = {};
Vue.prototype.themes.color = "#ff7921";
Vue.prototype.$tools = tools;

console.log(5,process.env);

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

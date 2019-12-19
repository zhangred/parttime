import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'
import {Toast,Image,Dialog,Icon,Button } from 'vant'

import './filters/filters'
import './directive/directive'
import './components/BaseComponents'


import './assets/js/rem'
import tools from './assets/js/tools'

import './assets/css/base.less'

// console.log(5,process.env);


var axios_instance = axios.create({
    transformRequest: [function (data) {
        data = Qs.stringify(data);
        return data;
    }],
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }    
})
Vue.use(VueAxios, axios_instance);
Vue.use(Image);
Vue.use(Button);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Icon);


router.beforeEach((to, from, next) => {
    if (from.meta&&from.meta.keepAlive) {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;
        from.meta.scrollTop = scrollTop;
    }
    if (!to.meta||!to.meta.keepAlive) {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        window.pageYOffset = 0
    }
    next()
})

Vue.config.productionTip = false
Vue.prototype.Ob = new Vue();

Vue.prototype.themes = {};
Vue.prototype.$tools = tools;

Vue.prototype.themes.assemble = {
    'default':{color:'#ff7021',second:'#ffb48a'},
    'theme-red':{color:'#ff4444',second:'#ff8855'},
    'theme-tangerine':{color:'#ff5f15',second:'#ff9200'},
    'theme-roseo':{color:'#ff5f15',second:'#ff9200'},
    'theme-darkred':{color:'#ff4344',second:'#555555'},
    'theme-blackish':{color:'#66c4aa',second:'#def3ec'},
    'theme-darkgreen':{color:'#08ba07',second:'#383838'},
    'theme-lightgreen':{color:'#63bf73',second:'#e0f4e2'},
    'theme-yellow':{color:'#fcc600',second:'#1d262e'},
    'theme-blue':{color:'#4a90e2',second:'#dbe9f9'},
    'theme-brown':{color:'#c3a769',second:'#f4efe2'},
    'theme-darkblack':{color:'#2f2f34',second:'#ebecf2'},
    'theme-purple':{color:'#884cff',second:'#efe6ff'},
}

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

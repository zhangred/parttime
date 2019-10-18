import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Qs from 'qs'

import './filters/filters'

import './assets/css/base.css'
import './assets/js/rem'

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

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

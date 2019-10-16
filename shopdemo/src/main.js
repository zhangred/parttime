import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './assets/css/base.css'
import './assets/js/rem'

Vue.config.productionTip = false
Vue.prototype.Ob = new Vue();

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')

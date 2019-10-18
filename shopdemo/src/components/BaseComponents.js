import Vue from 'vue'


// 底部导航
Vue.component('botnav',{
    props:['active'],
    template:`<div class="cm-botnav">
        <div class="cb-cont">
            <div :class="{'cb-item':true,'active':active=='home'}" @click="go('/')">
                <div class="cb-ico cb-ico-home"></div>
                <div class="cb-tx">首页</div>
            </div>
            <div :class="{'cb-item':true,'active':active=='cate'}" @click="go('/category')">
                <div class="cb-ico cb-ico-cate"></div>
                <div class="cb-tx">分类</div>
            </div>
            <div :class="{'cb-item':true,'active':active=='cart'}" @click="go('/cart')">
                <div class="cb-ico cb-ico-cart"></div>
                <div class="cb-tx">购物车</div>
            </div>
            <div :class="{'cb-item':true,'active':active=='mine'}" @click="go('/mine')">
                <div class="cb-ico cb-ico-mine"></div>
                <div class="cb-tx">我的</div>
            </div>
        </div>
    </div>`,
    created(){
    },
    methods:{
        go(path){
            this.$router.push(path)
        }
    }
})

//指示器
Vue.component('indicator',{
    props:['length','current','color','colorhover','bottom'],
    props:{
        length: {
            type: Number,
            default: 0
        },
        current: {
            type: Number,
            default: 0
        },
        color: {
            type: String,
            default: '#ffffff',
        },
        colorhover: {
            type: String,
            default: '#ff7021'
        },
        bottom: {
            type: String,
            default: '.1rem'
        },
    },
    template:`<div class="cm-indicator" :style="'bottom:'+bottom">
                    <span :style="'background:'+(item-1==current?colorhover:color)" class="ci-tor" :class="{'ci-tor':true,'ci-tor-cur':item-1==current}" v-for="item in length" v-bind:key="item"></span>
                </div>`
})

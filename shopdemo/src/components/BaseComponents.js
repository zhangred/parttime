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

//倒计时
Vue.component('backtime',{
    props:{
        lasttime:{
            type: Number,
            default:0
        },
        classname:{
            type:String,
            default:''
        },
        format:{
            type:String,
            default:'h:m:s'
        },
        tag:{
            type:Object,
            default:{}
        }
    },
    data(){
        return {
            str:'',
            format_in:this.format,
            intime_in:parseInt(this.lasttime)||0
        }
    },
    template:`<span :class="[classname]">{{str}}</span>`,
    created(){
        let inter;
        inter = setInterval(()=>{
            this.intime_in --;
            var intime = this.intime_in,
                format = this.format_in;
            format = format.replace('s',this.fullFormat(intime%60))
            format = format.replace('m',this.fullFormat(Math.floor((intime/60)%60)))
            format = format.replace('h',this.fullFormat(Math.floor(intime/3600)))
            this.str = format;
            if(this.intime_in<=0){
                clearInterval(inter);
                this.$emit('timeend',this.tag)
            }
        },1000)
    },
    methods:{
        fullFormat(v){
            v = Math.round(v);
            return v<10?'0'+v:v;
        }
    }
})

Vue.component('orderico',{
    props:{
        colorhover:{
            type:String,
            default:'#ff7021'
        },
        color:{
            type:String,
            default:'#ccc'
        },
        order:{
            type:String,
            default:''
        }
    },
    template:`<span class="cm-oico">
        <span class="oar oar-t" :style="'border-bottom-color:'+(order=='asc'?colorhover:color)"></span>
        <span class="oar oar-b" :style="'border-top-color:'+(order=='desc'?colorhover:color)"></span>
    </span>`
})

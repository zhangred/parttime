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
            default:function(){
                return 0;
            }
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
            default:function(){
                return {}
            }
        }
    },
     watch:{
        lasttime:function(newv,oldv){
            this.intime_in = parseInt(newv)
            if(!this.inter){
                this.setinter();
            }
        }
    },
    data(){
        return {
            str:'',
            format_in:this.format,
            intime_in:this.lasttime,
            inter:null
        }
    },
    template:`<span :class="[classname]">{{str}}</span>`,
    created(){
        if(this.intime_in){
            this.setinter();
        }
    },
    methods:{
        fullFormat(v){
            v = Math.round(v);
            return v<10?'0'+v:v;
        },
        setinter(){
            this.inter = setInterval(()=>{
                this.intime_in --;
                var intime = this.intime_in,
                    format = this.format_in;
                format = format.replace('s',this.fullFormat(intime%60))
                format = format.replace('m',this.fullFormat(Math.floor((intime/60)%60)))
                format = format.replace('h',this.fullFormat(Math.floor(intime/3600)))
                this.str = format;
                if(this.intime_in<=0){
                    clearInterval(this.inter);
                    this.$emit('timeend',this.tag)
                }
            },1000)
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

Vue.component('swipeCell',{
    props:{
        rightwidth:{
            type:Number,
            default:100
        }
    },
    template:`<div class="cm-swipecell">
            <div class="wrap" ref="wrap"><slot></slot></div>
            <div class="right"><slot name="right"></slot></div>
        </div>`,
    created(){
    },
    mounted(){
        this.bindEvent()
    },
    methods:{
        bindEvent(){
            var elm = this.$el,
                wrap = this.$refs.wrap,
                that = this;

            var fx = 0,
                lx=0,
                fy = 0,
                isx = null;
            
            elm.addEventListener('touchstart',function(event){
                wrap.style.webkitTransition = "all 0s";
                var touches = event.targetTouches;
                fx = touches[0].pageX;
                fy = touches[0].pageY;
            },false);
            elm.addEventListener('touchmove',function(event){
                if(isx==false) return;
                var touches = event.targetTouches;
                if(Math.abs(touches[0].pageX-fx)>Math.abs(touches[0].pageY-fy)){
                    isx = true
                }else{
                    isx = false;
                }

                lx = touches[0].pageX;
                var cx =  lx - fx;


                if(!isx) return;

                wrap.style.webkitTransform = 'translateZ(0) translateX('+(cx)+'px)';
                event.preventDefault();
            },false)
            elm.addEventListener('touchend',function(event){
                wrap.style.webkitTransition = "all .3s";
                if(lx==0){
                    fx = lx = 0;
                    return false;
                }
                var ox = fx -lx;
                if(ox<that.rightwidth){
                    ox = 0;
                }else{
                    ox = that.rightwidth;
                };
                wrap.style.webkitTransform = 'translateZ(0) translateX(-'+(ox)+'px)';
                fx =  lx = fy = 0;
                isx = null;
                if(ox){
                    that.$tools.event_once('touchstart',null,function(){
                        setTimeout(()=>{
                            wrap.style.webkitTransition = "all .3s";
                            wrap.style.webkitTransform = 'translateZ(0) translateX(0)';
                        },400)   
                    })
                }
            },false);
        }
    }
})

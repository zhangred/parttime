<template>
    <div class="pages pcategory">
        <div class="search"><input type="text" class="ctrol" placeholder="搜索您感兴趣的商品" v-on:blur="searchkey($event)" /></div>

        <div class="leftbox">
            <div :class="{'item':true,'active gb-c':cate_ac==item.id}" v-for="item in list" v-bind:key="item.id" @click="goitem(item.id)"><span :class="['ibd',{'gb-bgc':cate_ac==item.id}]"></span>{{item.name}}</div>
        </div>

        <div class="rightbox">
            <div class="cm-lprolist">
                <div v-for="cate in list" v-bind:key="cate.id" class="ritem" :cateid="cate.id" :id="'J_ritem'+cate.id">
                    <div class="pl-item"  v-for="item in cate.list" v-bind:key="item.id">
                        <router-link to="/category/detail" class="pl-imgo">
                            <van-image fit="cover" class="pl-img" :src="item.img" />
                        </router-link>
                        <div class="pl-info">
                            <router-link to="/category/detail" class="pl-rtop">
                                <p class="pl-title">{{cate.name+item.title}}</p>
                                <p class="pl-tp">500g&ensp;x&ensp;1箱</p>
                            </router-link>
                            <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price|tofix(2)}}</p>
                            <div class="step flex">
                                <a href="javascript:;" :class="['step-do flex flex-center',{'gb-c':item.num>0},{'setp-dis':item.num<=0}]"  @click="numchange(item,-1)"><i class="iconfont iconfont-jian"></i></a>
                                <span class="step-num">{{item.num||0}}</span>
                                <a href="javascript:;" class="step-do flex flex-center gb-c"  @click="numchange(item,1)"><i class="iconfont iconfont-jia"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <botnav active="cate"></botnav>

        <div class="botline">
            <a href="javascript:;" class="bl-cart flex flex-center" @click="showcart"><i class="bl-ico-cart iconfont iconfont-cart"></i><span class="bl-num">{{count.num||0}}</span></a>
            <div class="bl-count">
                <p class="bl-moeny">¥<span>{{count.money|tofix(2)}}</span></p>
                <p class="bl-fare">另需快递费¥{{count.fare|tofix(2)}}</p>
            </div>
            <a href="javascript:;" :class="['bl-btn',{'disable':cartlist.list.length==0}]" @click="statement">结算</a>
        </div>

        <p class="cart-bg" @click="cartlist.show=false" v-show="cartlist.show"></p>
        <div class="cartgood">
            <p class="cg-cp">再买<span class="c gb-c">16.80</span>元,可减<span class="c gb-c">20</span>元</p>
            <div class="cm-sliderbox" v-sliderbox="{show:cartlist.show}">
                <div class="cg-top">已选商品<a href="javascript:;" class="cg-tbtn c gb-c" @click="clearcart">清空购物车</a></div>
                <div class="cg-list">
                    <div class="cg-item flex" v-for="item in cartlist.list" :key="item.id">
                        <p class="cg-iname ellipsis">{{item.title}}</p>
                        <p class="cg-price c gb-c">¥{{item.price|tofix(2)}}</p>
                        <div class="step flex">
                            <a href="javascript:;" :class="['step-do flex flex-center',{'gb-c':item.num>0},{'setp-dis':item.num<=0}]"  @click="numchange(item,-1,true)"><i class="iconfont iconfont-jian"></i></a>
                            <span class="step-num">{{item.num||0}}</span>
                            <a href="javascript:;" class="step-do flex flex-center gb-c"  @click="numchange(item,1,true)"><i class="iconfont iconfont-jia"></i></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- sku 暂存 -->
        <van-sku
            v-model="goodSkuShow"
            :sku="goodSku.sku"
            :goods="goodSku.goods"
            :goods-id="goodSku.goodsId"
            :quota="goodSku.quota"
            :hide-stock="goodSku.sku.hide_stock"
            :initial-sku="goodSku.initialSku"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked">
            <template slot="sku-actions" slot-scope="props">
                <div class="van-sku-actions">
                <van-button
                    square
                    size="large"
                    type="warning"
                    class="vbtn gb-bgc3"
                    @click="props.skuEventBus.$emit('sku:addCart')"
                >
                    加入购物车
                </van-button>
                <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                <van-button
                    square
                    size="large"
                    type="danger"
                    class="vbtn gb-bgc"
                    @click="props.skuEventBus.$emit('sku:buy')"
                >
                    立即购买
                </van-button>
                </div>
            </template>
        </van-sku>


    </div>
</template>
<style lang="less">
    .pcategory{ 
        background: #fff;
        .search{
            position: fixed; left: 0; top: 0; z-index: 3; width: 100%; background: #fff; padding: .05rem .12rem;
            .ctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        }
        .leftbox{
            position: fixed; left: 0; top: 0; bottom: 0; z-index: 1; width: .8rem; height: 100%; padding: .4rem 0 .5rem; background:#f2f2f2; overflow-y: scroll; -webkit-overflow-scrolling: touch;;
            .item{ position: relative; display: block; height: .48rem; text-align: center; line-height: .48rem; font-size: .13rem;}
            .item.active{ background: #fff; color: @base;}
            .ibd{ display: block; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;background: #f2f2f2;}
        }
        .rightbox{padding: .4rem 0 .1rem .8rem; background: #fff;}
        .cm-lprolist{
            padding-left: .1rem;
            .pl-item{ height: 1.2rem; padding: .1rem .07rem 0 0;}
            .pl-imgo{height: 1rem; width: 1rem;}
            .pl-img{  height: 1rem; width: 1rem; }
            .pl-info{ width: 1.65rem;}
            .pl-rtop{ height: .78rem;}
            .pl-title{ font-size: .14rem; line-height: .18rem; max-height: .36rem;}
            .pl-price{ font-size: .14rem; color: @base;}
            .pl-pun{ font-size: .1rem;}
            .pl-tp{ font-size: .12rem; color: #999;}
        }
        .step{ position: absolute; right: .04rem; bottom: 0; line-height: .3rem;}
        .step-do{ width: .2rem; color: @base;}
        .step-num{ width: .2rem; text-align: center;}
        .setp-dis{ color: #ccc;}
        .botline{ position: fixed; left: 0; bottom: .5rem; right: 0; z-index: 9; height: .44rem; padding: 0 1.1rem 0 .8rem; background: rgba(0,0,0,0.85); color: #fff;}
        .bl-cart{ position: absolute; left: .14rem; top: -.16rem; height: .5rem; width: .5rem; border-radius: 50%; background: @base; color: #fff;}
        .bl-ico-cart{ font-size: .26rem;}
        .bl-count{ padding-top: .06rem; line-height: .18rem;}
        .bl-fare{ font-size: .1rem; color: #ccc;}
        .bl-btn{ position: absolute; right: 0; bottom: 0; top: 0; width: 1.1rem; background: @base; color: #fff; text-align: center; font-size: .16rem; line-height: .44rem;}
        .bl-btn.disable{ opacity: .6; }
        .bl-num{ position: absolute; right: -.03rem; top: -.05rem; padding: 0 .05rem; border:1px solid @base; background: #fff; color: @base; line-height: .18rem; border-radius: .11rem;}
        .cartgood{position: fixed; left: 0; bottom: .94rem; right: 0; z-index: 8;}
        .cg-cp{ line-height: .24rem; font-size: .12rem; text-align: center; background: #fbf4e2;}
        .cg-top{ padding: 0 .14rem; background: #ededed; line-height: .32rem; }
        .cg-tbtn{ float: right; font-size: .13rem;}
        .cg-list{ padding-bottom: .24rem; background: #f6f6f6;}
        .cg-item{ position: relative; padding: .1rem 0 .1rem .14rem; border-bottom: 1px solid #eee; background: #fff;}
        .cg-iname{ width: 2.02rem; font-size: .15rem;}
        .cg-price{ width: .9rem; padding-right: .2rem; text-align: right;}
        .cartgood .step{ position: relative; line-height: .24rem;}
        .cart-bg{ position: fixed; left: 0; top: 0; bottom: 0; right: 0; z-index: 7; background: rgba(0,0,0,.5);}
        .xxxx{}
        .xxxx{}
    }
</style>
<script>
import { Sku } from 'vant';
export default {
    components:{
        [Sku.name]:Sku
    },
    data(){
        return {
            img:false,
            cate_ac:11001,
            list:[],
            domstate:false,
            scrolllocked:false,
            good_cur:{},
            goodSku:{
                sku:{}
            },
            customStepperConfig:{},
            goodSkuShow:false,
            count:{},
            cartlist:{show:false,list:[]}
        }
    },
    created(){
        this.Ob.$emit('changetitle','商品分类');
        this.getcatelist()

        this.throttle = new this.$tools.throttle_o(200);
        this.throttle.callback = ()=>{
            this.checkoffset();
        }
    },
    activated() {
        this.$tools.setScrollTop(this.$route.meta.scrollTop||0)
        
        this.bindscroll();
    },
    deactivated() {
        window.removeEventListener('scroll',this.scroll);
    },
    methods:{
        searchkey(event){
            var key = event.currentTarget.value.trim();
            if(key){
                this.$router.push('/category/list?key='+key)
            }
        },
        bindscroll(){
            window.addEventListener('scroll',this.scroll)
        },
        scroll(){
            this.throttle.trigger()
        },
        //定位dom对象
        checkoffset(){
            if(this.scrolllocked) return;
            let elms = this.$el.getElementsByClassName('ritem'),
                len = elms.length,
                id = 0,
                otop = window.rem*.4;
            for(var i=0;i<len;i++){
                var ofs = elms[i].getBoundingClientRect();
                if(ofs.top<=otop&&(ofs.top+ofs.height)>=otop){
                    id = elms[i].getAttribute('cateid')
                    break;
                }
            }
            this.cate_ac = id;
        },
        //点击定位
        goitem(id){
            let elm = document.getElementById('J_ritem'+id),
                ofs = elm.getBoundingClientRect().top,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                top = scrollTop+ofs - window.rem*.4+2;
            if(top<3){ top=0}

            this.scrolllocked = true;
            setTimeout(()=>{
                this.scrolllocked = false;
            },300)
            this.cate_ac = id;
            document.body.scrollTop = top
            document.documentElement.scrollTop = top
            window.pageYOffset = top
        },
        //获取分类列表
        getcatelist(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:11001,name:'热搜推荐',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:18.5,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:1,name:'数码电器',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:2,name:'内搭服饰',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:3,name:'家居生活',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:4,name:'时令蔬菜',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:6,name:'潮流靴鞋',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:7,name:'精品美妆',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]},
                        {id:8,name:'床上用品',list:[
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                            {id:Math.random()*1000,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        ]}
                    ];
                    //添加数字字段
                    list.map(cate=>{
                        cate.list.map(item=>{
                            item.num = 0;
                        })
                    })
                    this.list = list;
                    setTimeout(()=>{
                        this.bindscroll()
                    },200)
                }
            });
        },
        //展示sku
        showsku(item,num){
            if(item.num){
                item.num += num
            }else{
                this.$toast.loading('请求中···')
                this.$http.get("./api/sku.json", {
                    params: 'params'
                }).then((res) => {
                //延时处理 模拟请求延时
                    this.$tools.delay(500).then(()=>{
                        let rs = res.data;
                        if(rs.code==0){
                            this.goodSku = rs.data;
                            this.goodSkuShow = true
                        }
                        this.$toast.clear();
                    })
                });
            }
        },
        //立即购买
        onBuyClicked(rs){
            console.log(rs)
            this.rs = rs;
            this.goodSkuShow = false;
            this.$router.push('/category/ordersave')
        },
        //加入购物车
        onAddCartClicked(rs){
            console.log(rs)
            this.rs = rs;
            this.goodSkuShow = false;
            this.$toast.success('成功加入购物车');
        },
        // 改变数字
        numchange(item,num,incart){
            if(item.num==0&&num==-1) return;
            var v = item.num + num;
            if(incart&&v==0){
                this.$dialog.confirm({
                    title: '提示',
                    message: '是否从购物车中删除？'
                }).then(() => {
                    this.updatacart(item,v);
                });
            }else{
                this.updatacart(item,v);
            }
        },
        updatacart(item,num){
            this.$toast.loading({duration:2000,message:'更新中···',forbidClick:true})
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                this.$tools.delay(200).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        item.num = num;
                        this.$toast.clear();
                        this.filtercart(item);
                    }
                })
            });
        },
        //统计购物车
        filtercart(item){
            //判断是否在购物车
            var inidx = -1,
                list = this.cartlist.list;
            for(var i=0;i<list.length;i++){
                if(list[i].id==item.id){
                    inidx = i;
                }
            }
            if(inidx==-1&&item.num){
                list.push(item);
            }else if(inidx>-1&&!item.num){
                list.splice(inidx,1)
            }
            this.getcount();
        },
        getcount(){
            var list = this.cartlist.list,
                total = {num:0,money:0};
            for(var i=0;i<list.length;i++){
                total.num += list[i].num;
                total.money += Math.round(list[i].price*100*list[i].num);
            }

            this.count.num = total.num;
            this.count.money = total.money/100
        },
        //展示购物车
        showcart(){
            if(this.cartlist.list.length==0){
                this.$notify({ type: 'danger', message: '购物车暂无商品，请选择添加' });
            }else{
                this.cartlist.show = !this.cartlist.show;
            }
        },
        //清空购物车
        clearcart(){
            this.$dialog.confirm({
                title: '提示',
                message: '是否清空购物车？'
            }).then(() => {
                this.$toast.loading({duration:2000,message:'更新中···',forbidClick:true})
                this.$http.get("./api/callback.json", {
                    params: 'params'
                }).then((res) => {
                    this.$tools.delay(200).then(()=>{
                        let rs = res.data;
                        if(rs.code==0){
                            this.$toast.clear();
                            this.cartlist.list = [];
                            this.cartlist.show = false;
                        }
                    })
                });
            });
        },
        //清空购物车
        statement(){
            if(this.cartlist.list.length==0) return;
            this.$toast.loading({duration:2000,message:'结算中···',forbidClick:true})
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                this.$tools.delay(200).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        this.$toast.clear();
                        this.$router.push('/category/ordersave')
                    }
                })
            });
        },
    }
}
</script>

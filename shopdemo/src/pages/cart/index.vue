<template>
    <div class="pages">

        <div class="emp" v-show="list.length==0">
            <div class="emp-img">
                <img src="~@/assets/images/empty_cart.png" class="emp-ico" />
                <p class="emp-tx">您的购物车空空如也！</p>
            </div>
            <p class="til">为您推荐</p>
            <div class="cm-prolist">
                <router-link to="/category/detail" class="tl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="tl-imgo">
                        <img src="~@/assets/images/new.png" class="tl-new" />
                        <van-image fit="cover" class="tl-img" :src="item.img" />
                    </div>
                    <div class="tl-info">
                        <p class="tl-title">{{item.title}}</p>
                        <p class="tl-price"><span class="tl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </div>


        <div class="glist">
            <div class="gitem" v-for="shop in list" v-bind:key="shop.id">
                <div class="gtil"><van-checkbox class="radio" v-model="shop.check" checked-color="#ff7021"></van-checkbox>{{shop.name}}</div>
                <div class="pros">
                    <van-swipe-cell  v-for="good in shop.list" v-bind:key="good.id">
                        <div class="pro">
                            <div class="pro-check"><van-checkbox class="radio" v-model="good.check" checked-color="#ff7021"></van-checkbox></div>
                            <div class="pro-img"><van-image fit="cover" class="psimg" :src="good.img" /></div>
                            <div class="pro-info">
                                <div class="pro-itop">
                                    <p class="pro-til">{{good.name}}</p>
                                    <p class="pro-unit" v-if="good.unit">{{good.unit}}</p>
                                </div>
                                <div class="pro-price"><span class="pro-uy">¥</span>{{good.price}}</div>
                                <van-stepper class="pro-step" v-model="good.number" integer :button-size="rem.ha" />
                            </div>
                        </div>

                        <template slot="right">
                            <van-button square type="danger" text="删除" />
                        </template>
                    </van-swipe-cell>
                    
                </div>
            </div>
        </div>

        <div class="botdo">
            <div class="bd-l">
                <van-checkbox class="fl bd-rado" v-model="checked">全选</van-checkbox>
                <p class="fl bd-edit">编辑</p>
            </div>
            <div class="bd-r">合计：<span class="bd-un">¥</span><span class="bd-total">34.34</span></div>
            <div class="bd-btn">结算<span>(5)</span></div>
        </div>
        <!-- <div class="botdo">
            <div class="bd-l">
                <van-checkbox class="fl bd-rado" v-model="checked">全选</van-checkbox>
                <p class="fl bd-edit">完成</p>
            </div>
            <div class="bd-btn">删除<span>(5)</span></div>
        </div> -->

        <botnav active="cart"></botnav>
    </div>
</template>
<style lang="less"  scoped>
    .pages{padding-bottom: .6rem;}
    .emp{
        .emp-img{ padding: .8rem 0; text-align: center; color: #999; font-size: .16rem;}
        .emp-ico{ display: block; margin: 0 auto; width: 1.3rem;}
        .emp-tx{ padding-top: .3rem;}
        .til{ text-align: center; padding-bottom: .1rem; font-weight: bold; font-size: .16rem;}
    }
    .radio{ display: inline-block; width: 20px; vertical-align: middle;}
    .glist{
        background: #fff;
        .gitem{ position: relative;}
        .gtil{ padding-left: .15rem; background: #f8f8f8; line-height: .4rem;}
        .radio{ margin-right: .05rem;}
    }
    .pro{
        position: relative; height: 1.1rem;
        &:after{ content: ""; display: block; position: absolute; left: .5rem; bottom: 0; border-bottom: 1px solid #f0f0f0; width: 3.25rem}
        &:nth-last-child(1):after{ display: none;}
        .pro-check{ position: relative; width: .5rem; height: 1.1rem; float: left;}
        .radio{ position: absolute; left: .15rem; top: 50%; margin-top: -10px;}
        .pro-img{ float: left; height: .9rem; width: .9rem; overflow: hidden; margin-top: .1rem; border-radius: .06rem; border:1px solid #e4e3e8;}
        .psimg{ height: .9rem; width: .9rem;}
        .pro-info{position: relative; float: right; width: 2.2rem; height: 1.1rem; overflow: hidden; padding-top: .08rem;}
        .pro-til{ line-height: .20rem; max-height: .45rem; display: -webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden;}
        .pro-unit{ color: #999; font-size: .12rem; line-height: .2rem;}
        .pro-itop{ height: .7rem;}
        .pro-price{ font-size: .15rem; color: #ff7021;}
        .pro-uy{ font-size: .12rem;}
        .pro-step{ position: absolute; right: .1rem; bottom: .1rem;}
    }
    .botdo{
        position: fixed; left: 0; bottom: .5rem; right: 0; height: .5rem; padding-right: .8rem; background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; line-height: .48rem;
        .bd-l{ float: left; padding-left: .15rem; overflow: hidden;}
        .bd-rado{ height: .48rem;}
        .bd-edit{ padding-left: .2rem;}
        .bd-btn{position: absolute; width: .8rem; height: .5rem; top: 0; right: 0; background: #c1c1c1; text-align: center; color: #fff;}
        .bd-r{ float: right; padding-right: .2rem;}
        .bd-un{ margin-right: .03rem; font-size: .12rem; color: #ff7021;}
        .bd-total{ color: #ff7021;}
    }
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
</style>
<script>
import { Checkbox,Stepper,SwipeCell } from 'vant';
export default {
    components:{
        [Checkbox.name]:Checkbox,
        [Stepper.name]:Stepper,
        [SwipeCell.name]:SwipeCell
    },
    data(){
        return {
            rem:{ha:window.rem*.28},
            list:[],
            goodlist:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','购物车');

        this.getreco();
        setTimeout(()=>{
            this.getData();
        },2000)
    },
    methods:{
        getData(){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let cart = [
                        {id:1,name:'美妆旗舰店',list:[
                            {id:1,name:'Morphy Richards 摩飞便携式榨汁机果汁杯网红爆款 能榨汁的杯机果汁杯网红爆款 能榨汁的杯',img:'/tempimg/0banner01.jpg',price:28.88,number:1,unit:'蓝色，大号'},
                            {id:2,name:'便携式海滩明亮装',img:'/tempimg/0banner02.jpg',price:99.88,number:1,unit:'蓝色，大号'},
                            {id:3,name:'居家划算套餐',img:'/tempimg/0banner03.jpg',price:100,number:1}
                        ]},
                         {id:2,name:'潮流靴鞋',list:[
                            {id:1,name:'Morphy Richards 摩飞便携式榨汁机果汁杯网红爆款 能榨汁的杯',img:'/tempimg/0banner01.jpg',price:28.88,number:1,unit:'蓝色，大号'}
                        ]},
                         {id:3,name:'可口美食',list:[
                            {id:1,name:'Morphy Richards 摩飞便',img:'/tempimg/0banner02.jpg',price:28.88,number:1,unit:'蓝色，大号'},
                            {id:2,name:'便携式海滩明亮装',img:'/tempimg/0banner03.jpg',price:99.88,number:1,unit:'蓝色，大号'}
                        ]}
                    ];
                    this.fullkey(cart);
                    this.list = cart;
                }
            });
        },
        fullkey(list){
            for(let i=0,len=list.length;i<len;i++){
                list[i].checked = false;
                if(list[i].list){
                    for(let k=0,klen=list[i].list.length;k<klen;k++){
                        list[i].list[k].checked = false;
                    }
                }
            }
        },
        //获取推荐数据
        getreco(){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    //获取商品列表
                    let goodlist = [
                        {id:1,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:2,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:3,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:4,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false}
                    ]
                    this.goodlist = goodlist;
                }
            });
        }
    }
}
</script>

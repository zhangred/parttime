<template>
    <div class="pages">

        <div class="emp" v-show="state==2">
            <div class="emp-img">
                <img src="~@/assets/images/empty_cart.png" class="emp-ico" />
                <p class="emp-tx">您的购物车空空如也！</p>
            </div>
            <p class="til">为您推荐</p>
            <div class="cm-prolist">
                <router-link to="/category/detail" class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <img src="~@/assets/images/new.png" class="pl-new" />
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                    </div>
                    <div class="pl-info">
                        <p class="pl-title">{{item.title}}</p>
                        <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </div>

        <div v-show="state==1">
            <div class="glist">
                <div class="gitem" v-for="shop in list" v-bind:key="shop.id" v-show="shop.list.length">
                    <div class="gtil"><van-checkbox class="radio" v-model="shop.checked" :checked-color="gobal.color" @click="checkshop(shop)"></van-checkbox>{{shop.name}}</div>
                    <div class="pros">
                        <swipe-cell class="tedfd" v-for="(good) in shop.list" v-bind:key="good.id">
                            <div class="pro">
                                <div class="pro-check"><van-checkbox class="radio" v-model="good.checked" :checked-color="gobal.color" @click="checkgood(good,shop)"></van-checkbox></div>
                                <div class="pro-img"><van-image fit="cover" class="psimg" :src="good.img" /></div>
                                <div class="pro-info">
                                    <div class="pro-itop">
                                        <p class="pro-til">{{good.name}}</p>
                                        <p class="pro-unit" v-if="good.unit">{{good.unit}}</p>
                                    </div>
                                    <div class="pro-price gb-c"><span class="pro-uy">¥</span>{{good.price}}</div>
                                    <van-stepper class="pro-step" v-model="good.number" integer :button-size="rem.ha" @change="numberchange" @blur="numberchange" />
                                </div>
                            </div>

                            <template slot="right">
                                <p class="cellbtn" @click="deletegood(good.id)">删除</p>
                            </template>
                        </swipe-cell>
                    </div>
                </div>
            </div>

            <div class="botdo" v-show="!isedit">
                <div class="bd-l">
                    <van-checkbox class="fl bd-rado" v-model="chooseall" :checked-color="gobal.color" @click="getall">全选</van-checkbox>
                    <p class="fl bd-edit" @click="isedit=true">编辑</p>
                </div>
                <div class="bd-r">合计：<span class="bd-un gb-c">¥</span><span class="bd-total gb-c">{{total.money}}</span></div>
                <div :class="{'bd-btn':true,'active gb-bgc':total.number}" @click="statement">结算<span v-show="total.number">({{total.number}})</span></div>
            </div>
            <div class="botdo" v-show="isedit">
                <div class="bd-l">
                    <van-checkbox class="fl bd-rado" v-model="chooseall" :checked-color="gobal.color" @click="getall">全选</van-checkbox>
                    <p class="fl bd-edit" @click="isedit=false">完成</p>
                </div>
                <div :class="{'bd-btn':true,'active gb-bgc':total.number}" @click="deleteall">删除<span>(5)</span></div>
            </div>
        </div>
        <botnav active="cart"></botnav>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">有商品</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">无商品</p>
            </div>
        </over-touch>
    </div>
</template>
<style lang="less"  scoped>
.tedfd{ height: 1.1rem; width: 3.75rem;}
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
        .pro-price{ font-size: .15rem; color: @base;}
        .pro-uy{ font-size: .12rem;}
        .pro-step{ position: absolute; right: .1rem; bottom: .1rem;}
    }
    .cellbtn{ line-height: 1.1rem; color: #fff; text-align: center; width: 100px}
    .botdo{
        position: fixed; left: 0; bottom: .5rem; right: 0; z-index: 3; height: .5rem; padding-right: .8rem; background: #fff; border-top: 1px solid #eee; border-bottom: 1px solid #eee; line-height: .48rem;
        .bd-l{ float: left; padding-left: .15rem; overflow: hidden;}
        .bd-rado{ height: .48rem;}
        .bd-edit{ padding-left: .2rem;}
        .bd-btn{position: absolute; width: .8rem; height: .5rem; top: 0; right: 0; background: #c1c1c1; text-align: center; color: #fff;}
        .bd-btn.active{ background: @base;}
        .bd-r{ float: right; padding-right: .2rem;}
        .bd-un{ margin-right: .03rem; font-size: .12rem; color: @base;}
        .bd-total{ color: @base;}
    }
</style>
<script>
import { Checkbox,Stepper } from 'vant';
export default {
    components:{
        [Checkbox.name]:Checkbox,
        [Stepper.name]:Stepper
    },
    data(){
        return {
            gobal:this.themes.setting,
            state:1,
            rem:{ha:window.rem*.28},
            list:[],
            goodlist:[],
            total:{money:0,number:0},
            isedit:false,
            chooseall:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','购物车');

        this.getreco();
        setTimeout(()=>{
            this.getData();
        },1000)
    },
    methods:{
        getData(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let cart = [
                        {id:1,name:'美妆旗舰店',list:[
                            {id:1,name:'Morphy Richards 摩飞便携式榨汁机果汁杯网红爆款 能榨汁的杯机果汁杯网红爆款 能榨汁的杯',img:'./tempimg/0banner01.jpg',price:28.88,number:1,unit:'蓝色，大号'},
                            {id:2,name:'便携式海滩明亮装',img:'./tempimg/0banner02.jpg',price:99.88,number:1,unit:'蓝色，大号'},
                            {id:3,name:'居家划算套餐',img:'./tempimg/0banner03.jpg',price:100,number:1}
                        ]},
                         {id:2,name:'潮流靴鞋',list:[
                            {id:4,name:'Morphy Richards 摩飞便携式榨汁机果汁杯网红爆款 能榨汁的杯',img:'./tempimg/0banner01.jpg',price:28.88,number:1,unit:'蓝色，大号'}
                        ]},
                         {id:3,name:'可口美食',list:[
                            {id:5,name:'Morphy Richards 摩飞便',img:'./tempimg/0banner02.jpg',price:28.88,number:1,unit:'蓝色，大号'},
                            {id:6,name:'便携式海滩明亮装',img:'./tempimg/0banner03.jpg',price:99.88,number:1,unit:'蓝色，大号'}
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
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    //获取商品列表
                    let goodlist = [
                        {id:1,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:2,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:3,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:4,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false}
                    ]
                    this.goodlist = goodlist;
                }
            });
        },
        //选中店铺
        checkshop(item){
            setTimeout(()=>{
                for(let i=0,len=item.list.length;i<len;i++){
                    item.list[i].checked = item.checked;
                }
                this.getCountTotal();
            },10)
        },
        //选中商品
        checkgood(good,shop){
            setTimeout(()=>{
                let all = true;
                for(let i=0,len=shop.list.length;i<len;i++){
                    if(!shop.list[i].checked){
                        all = false;
                    }
                }
                shop.checked = all;
                this.getCountTotal();
            },10)
        },
        //计算总金额
        getCountTotal(){
            let money = 0,
                number = 0,
                list = this.list;
            for(let i=0,len=list.length;i<len;i++){
                for(let k=0,klen=list[i].list.length;k<klen;k++){
                    var v = list[i].list[k];
                    if(v.checked){
                        money += Math.round(v.price*100)*v.number;
                        number += v.number;
                    }
                }
            }
            this.total.money = money/100;
            this.total.number = number;
        },
        numberchange(){
            setTimeout(()=>{
                this.getCountTotal();
            },10);
        },
        deletegood(id){
            this.$dialog.confirm({
                title: '提示',
                message: '是否删除此条商品？'
            }).then(() => {
                
                this.$http.get("./api/callback.json", {
                    params: 'params'
                }).then((res) => {
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        this.$toast.success('删除成功');
                        this.deleteids([id])
                    }
                });
            });
        },
        deleteall(){
            let ids = this.getChoose();
            this.$dialog.confirm({
                title: '提示',
                message: '是否删除所选商品？'
            }).then(() => {
                
                this.$http.get("./api/callback.json", {
                    params: 'params'
                }).then((res) => {
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        this.$toast.success('删除成功');
                        this.deleteids(ids)
                    }
                });
            });
        },
        getChoose(){
            let ids = [],
                list = this.list;
            for(let i=0,len=list.length;i<len;i++){
                for(let k=0,klen=list[i].list.length;k<klen;k++){
                    var v = list[i].list[k];
                    if(v.checked){
                        ids.push(v.id)
                    }
                }
            }
            return ids;
        },
        deleteids(ids){
            var list = this.list;
            for(let len=list.length,i=len-1;i>=0;i--){
                for(let klen=list[i].list.length,k=klen-1;k>=0;k--){
                    if(ids.indexOf(list[i].list[k].id)>=0){
                        list[i].list.splice(k,1);
                    }
                }
            }
            setTimeout(()=>{
                this.getCountTotal();
            },10)
        },
        getall(){
            setTimeout(()=>{
                let list = this.list;
                let rs = this.chooseall;
                for(let i=0,len=list.length;i<len;i++){
                    list[i].checked = rs;
                    for(let k=0,klen=list[i].list.length;k<klen;k++){
                        list[i].list[k].checked = rs;
                    }
                }
                setTimeout(()=>{
                    this.getCountTotal();
                },10)
            },10)
        },
        statement(){
            if(this.total.number==0) return;
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
        }
    }
}
</script>

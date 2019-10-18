<template>
  <div class="pages">
        <van-notice-bar class="text" text="满199减20,满599减50,部分商品满188减100,新老客户赶紧的过来看啊" color="#f94122" background="#fdf1e9" left-icon="volume-o"/>
        <div class="search"><input type="text" class="sctrol" placeholder="搜索您感兴趣的内容" /></div>
        <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in banner" v-bind:key="item"><img :src="item" class="banner_img"></van-swipe-item>
        </van-swipe>
        <!-- 分类 -->
        <div class="cate-list">
            <router-link to="/singin" class="cate-item"><img src="~@/assets/images/cate_item01.png" class="cate-ico" /><p class="cate-tx">签到有礼</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item02.png" class="cate-ico" /><p class="cate-tx">居家生活</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item03.png" class="cate-ico" /><p class="cate-tx">服饰美妆</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item04.png" class="cate-ico" /><p class="cate-tx">数码电器</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item05.png" class="cate-ico" /><p class="cate-tx">时令蔬菜</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item06.png" class="cate-ico" /><p class="cate-tx">新鲜水果</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item07.png" class="cate-ico" /><p class="cate-tx">水产冻品</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item08.png" class="cate-ico" /><p class="cate-tx">肉禽蛋类</p></router-link>
            <router-link to="/category/list?id=0" class="cate-item"><img src="~@/assets/images/cate_item09.png" class="cate-ico" /><p class="cate-tx">粗粮调味</p></router-link>
            <router-link to="/category" class="cate-item"><img src="~@/assets/images/cate_item10.png" class="cate-ico" /><p class="cate-tx">分类</p></router-link>
        </div>

        <!-- 优惠券 -->
        <div class="coup">
            <div :class="{'citem':true,'disable':item.receive}" v-for="item in couponlist" v-bind:key="item.id">
                <p class="cleft">{{item.money}}</p>
                <div class="cright">
                    <p class="ctil">{{item.rule}}</p>
                    <p class="cbtn" @click="receivecp(item)">{{item.receive?'已领取':'立即领取'}}</p>
                </div>
            </div>
        </div>

        <!-- 拼团 -->
        <div class="tuan">
            <div class="ptil">今日必拼<router-link class="pmore" to="/assemble">更多</router-link></div>
            <van-swipe class="tuangoods" :autoplay="4000" :show-indicators="false" @change="changetuan">
                <van-swipe-item v-for="index in tuan.loop" v-bind:key="index">
                    <div class="t-list">
                        <router-link to="/assemble/detail" class="t-item" v-for="sub in 3" v-bind:key="sub" v-if="tuan.list[index*3-4+sub]">
                            <van-image fit="cover" class="t-img" :src="tuan.list[index*3-4+sub].img" />
                            <p class="t-info"><span class="t-peo">{{tuan.list[index*3-4+sub].people}}人拼团</span><span class="t-un">¥</span><span class="t-pri">{{tuan.list[index*3-4+sub].price}}</span></p>
                            <p class="t-total">已有{{tuan.list[index*3-4+sub].total}}人拼</p>
                        </router-link>
                    </div>
                </van-swipe-item>
                <indicator :length="tuan.loop" :current="tuan.current" color="#cccccc" bottom=".05rem" slot="indicator"></indicator>
            </van-swipe>
        </div>

        <!-- 推荐 -->
        <div class="jingx">
            <div class="ptil">精选新品推荐<router-link class="pmore" to="/goodlist">更多</router-link></div>
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

        <!-- 秒杀 -->
        <div class="seckill">
            <div class="ptil">限时秒杀<router-link class="pmore" to="/seckill">更多</router-link></div>
            <div class="cm-vprolist">
                <router-link to="/seckill/detail" class="pl">
                    <div class="tl-imgo">
                        <van-image fit="cover" class="tl-img" src="http://card.biaotu.net/banner01.jpg" />
                        <p class="tl-btime">据结束<span class="tl-time">23:23:23</span></p>
                    </div>
                    <div class="tl-info">
                        
                    </div>
                </router-link>
            </div>
        </div>
        <div>asdfasdsa</div>

        <botnav active="home" cartnumber="5"></botnav>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
    .text{ height: auto; line-height: 24px;}
    .search{ padding-left: .51rem; background: url(~@/assets/images/search.png) no-repeat .2rem center #fff; background-size: .16rem .18rem; line-height: .44rem; }
    .sctrol{ display: block; height: .44rem; width: 100%; border: none; font-size: .14rem; }
    .banner,.banner_img{ height: 1.67rem; }
    .cate-list{
        overflow: hidden; padding:  .2rem 0 .1rem; background: #fff; text-align: center;
        .cate-item{ float: left; width: 20%; height: .7rem; }
        .cate-ico{ display: block; margin: 0 auto; width: .42rem; }
        .cate-tx{ font-size: .12rem;} 
    }
    
    .coup{
        overflow: hidden; padding: .1rem .05rem;
        .citem{ position: relative; width: 1.78rem; height: .64rem; float: left; background: #fff; border-radius: .06rem; text-align: center; color: #ff7021;}
        .citem:nth-child(2){ float: right;}
        .citem:after{ content: ""; display: block; position: absolute; left: .8rem; top: .1rem; bottom: .1rem; border-left: 1px solid #e6d9d2;}
        .cleft{ float: left; width: .8rem; line-height: .64rem; font-size: .5rem;}
        .cright{ float: right; width: .97rem;}
        .ctil{ padding: .07rem 0 .02rem; color: #333; }
        .cbtn{ width: .68rem; margin: 0 auto; line-height: .18rem; font-size: .1rem; color: #fff; background: #ff7021; border-radius: .09rem;}
        .disable .cbtn{ background: #999;}
        .disable .ctil,.disable .cleft{ color: #999;}
    }
    .tuan{
        background: #fff; margin-bottom: .1rem;
        .tuangoods{ height: 1.8rem;}
        .t-list{ overflow: hidden; padding-left: .15rem; }
        .t-item{ float: left; width: 1.08rem; margin-right: .1rem;}
        .t-un{ margin-left:.05rem;}
        .t-pri{ font-size: .18rem;}
        .t-total{text-align: center;font-size: .12rem; line-height: .18rem; color: #999;}
        .t-img{display: block; width: 1.08rem; height: 1.08rem; border-radius: .1rem; overflow: hidden;}
        .t-info{ padding: .02rem 0 0; font-size: .12rem; color: #ff7021; text-align: center;}
        .ci-tor{ width: 20px;}
    }
    .ptil{
        position: relative; padding: 0 .15rem; line-height: .42rem; font-size: .15rem; font-weight: bold;
        .pmore{ float: right; padding-right: .14rem; font-weight: normal; font-size: .14rem; color: #aaa; background: url(~@/assets/images/arr_r01.png) no-repeat right center; background-size: .07rem .13rem;}
     }
    
    .jingx{  margin-bottom: .1rem;}

    .xxxx{ }
    .xxxx{ }
    .xxxx{ }
</style>
<style>
    .tuan .ci-tor-cur{ width: 14px;}
</style>
<script>
import {NoticeBar,Swipe, SwipeItem } from 'vant';
export default {
    components:{
        [NoticeBar.name]:NoticeBar,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem
    },
    data(){
        return {
            banner:[],
            catelist:[],
            couponlist:[],
            gbcolor:'#ff7921',
            tuan:{loop:0,list:[],current:0},
            goodlist:[]
        }
    },
    created(){
        this.getBanner();
        this.getCoupon();
        this.getTuan();
        this.getGoodlist();
    },
    methods:{
        //获取banner
        getBanner(){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        'http://card.biaotu.net/banner01.jpg',
                        'http://card.biaotu.net/banner02.jpg',
                        'http://card.biaotu.net/banner03.jpg'
                    ]
                    this.banner = list;
                }
            });
        },
        //获取优惠券
        getCoupon(){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,money:50,rule:'满199可用',receive:false},
                        {id:2,money:30,rule:'满199可用',receive:true}
                    ]
                    this.couponlist = list;
                }
            });
        },
        //领取优惠券
        receivecp(item){
            if(item.receive){ return;}
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    item.receive = true;
                    this.$toast.success({message:'领取成功',duration:1000});
                }
            });
        },
        //获取拼团商品
        getTuan(){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,img:'http://card.biaotu.net/banner01.jpg',people:2,price:9.99,total:1280},
                        {id:2,img:'http://card.biaotu.net/banner02.jpg',people:4,price:9.99,total:180},
                        {id:3,img:'http://card.biaotu.net/banner03.jpg',people:2,price:9.99,total:123},
                        {id:4,img:'http://card.biaotu.net/banner03.jpg',people:6,price:9.99,total:280},
                        {id:5,img:'http://card.biaotu.net/banner02.jpg',people:2,price:9.99,total:1280},
                        {id:6,img:'http://card.biaotu.net/banner01.jpg',people:2,price:9.99,total:1280},
                        {id:7,img:'http://card.biaotu.net/banner02.jpg',people:2,price:9.99,total:1280},
                        {id:8,img:'http://card.biaotu.net/banner03.jpg',people:1,price:9.99,total:1280},
                        {id:9,img:'http://card.biaotu.net/banner01.jpg',people:2,price:9.99,total:1280}
                    ]
                    this.tuan.loop = Math.ceil(list.length/3);
                    this.tuan.list = list;
                }
            });
        },
        changetuan(index){
            this.tuan.current = index;
        },
        //获取商品列表
        getGoodlist(){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,img:'http://card.biaotu.net/banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:2,img:'http://card.biaotu.net/banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:3,img:'http://card.biaotu.net/banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:4,img:'http://card.biaotu.net/banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false}
                    ]
                    this.goodlist = list;
                }
            });
        }
    }
}
</script>



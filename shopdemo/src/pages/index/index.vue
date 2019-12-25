<template>
  <div class="pages pindex">
        <van-notice-bar class="text" text="满199减20,满599减50,满199减20,满599减50,满199减20,满599减50," color="#f94122" background="#fdf1e9" left-icon="volume-o"/>
        
        <div class="search">
            <i class="sico gb-c iconfont iconfont-search"></i>
            <input type="text" class="sctrol" placeholder="搜索您感兴趣的内容" />
        </div>
        <van-swipe class="banner" :autoplay="3000" indicator-color="white"  @change="changebanner">
            <van-swipe-item v-for="item in banner.list" v-bind:key="item"><img :src="item" class="banner_img"></van-swipe-item>
            <indicator :length="banner.list.length" :current="banner.current" :colorhover="gobal.color" color="#ccc" bottom=".05rem" slot="indicator"></indicator>
        </van-swipe>
        <!-- 分类 -->
        <div class="cate-list">
            <router-link to="/signin" class="cate-item"><img src="~@/assets/images/cate_item01.png" class="cate-ico" /><p class="cate-tx">签到有礼</p></router-link>
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
            <div :class="{'citem gb-c':true,'disable':item.receive}" v-for="item in couponlist" v-bind:key="item.id">
                <p class="cleft">{{item.money}}</p>
                <div class="cright">
                    <p class="ctil">{{item.rule}}</p>
                    <p :class="['cbtn',{'gb-bgc':!item.receive}]" @click="receivecp(item)">{{item.receive?'已领取':'立即领取'}}</p>
                </div>
            </div>
        </div>

        <!-- 拼团 -->
        <div class="tuan">
            <div class="ptil">今日必拼<router-link class="pmore" to="/assemble">更多</router-link></div>
            <van-swipe class="tuangoods" :autoplay="4000" :show-indicators="false" @change="changetuan">
                <van-swipe-item v-for="index in tuan.loop" v-bind:key="index">
                    <div class="t-list">
                        <router-link to="/assemble/detail" class="t-item" v-for="sub in 3" v-bind:key="sub">
                            <div v-if="tuan.list[index*3-4+sub]">
                                <van-image fit="cover" class="t-img" :src="tuan.list[index*3-4+sub].img" />
                                <p class="t-info gb-c"><span class="t-peo">{{tuan.list[index*3-4+sub].people}}人拼团</span><span class="t-un">¥</span><span class="t-pri">{{tuan.list[index*3-4+sub].price}}</span></p>
                                <p class="t-total">已有{{tuan.list[index*3-4+sub].total}}人拼</p>
                            </div>
                        </router-link>
                    </div>
                </van-swipe-item>
                <indicator :length="tuan.loop" :current="tuan.current" :colorhover="gobal.color" color="#ccc" bottom=".05rem" slot="indicator"></indicator>
            </van-swipe>
        </div>

        <!-- 推荐 -->
        <div class="jingx">
            <div class="ptil">精选新品推荐<router-link class="pmore" to="/category/list">更多</router-link></div>
            <div class="cm-prolist">
                <router-link to="/category/detail" class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <img src="~@/assets/images/new.png" class="pl-new" />
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                    </div>
                    <div class="pl-info">
                        <div class="pl-rtop">
                            <p class="pl-title">{{item.title}}</p>
                        </div>
                        <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- 秒杀 -->
        <div class="seckill">
            <div class="ptil">限时秒杀<router-link class="pmore" to="/seckill">更多</router-link></div>
            <div class="cm-vprolist">
                <router-link to="/seckill/detail" class="pl-item" v-for="item in seckill" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                        <p v-if="item.type!=3" class="pl-btime gb-bgc">据结束<backtime :lasttime="item.time_end" classname="fr" :tag="item"></backtime></p>
                        <div v-if="item.type==3" class="pl-cover"><p class="pl-cover-tx">抢光</p></div>
                    </div>
                    <div class="pl-info">
                        <div class="pl-rtop">
                            <p class="pl-title">{{item.title}}</p>
                            <p class="pl-rate gb-c-bdc">{{item.rate+'%'}}好评率</p>
                        </div>
                        <div class="pl-price gb-c"><span class="pl-pun">￥</span><span class="pl-pnum">{{item.price}}</span><span class="pl-oldpri">{{item.oldprice}}</span></div>
                        <p v-if="item.type==1" class="pl-btn gb-bgc">立即抢购</p>
                        <p v-if="item.type==2" class="pl-btn pl-btna">立即预约</p>
                        <p v-if="item.type==3" class="pl-btn pl-btnb">立即抢购</p>
                    </div>
                </router-link>
            </div>
        </div>

        <!-- 还喜欢 -->
        <div class="likem">
            <div class="ptil">你可能还喜欢<router-link class="pmore" to="/category/list">更多</router-link></div>
            <div class="cm-prolist lthree">
                <router-link to="/category/detail" class="pl-item" v-for="item in seckill" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                    </div>
                    <div class="pl-info">
                        <p class="pl-title">{{item.title}}</p>
                        <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </div>
        <div class="bottom">到底啦~</div>

        <botnav active="home"></botnav>

        <!-- 弹层 -->
        <div :class="{'cm-pop':true,'cm-pop-active':pop_new.show}">
            <p class="cm-pop-bg" @click="pop_new.show=false"></p>
            <div class="cm-pop-cont cm-pop-mid-cont pop-redpack gb-bgc">
                <img class="cm-pop-closea"  @click="pop_new.show=false" src="~@/assets/images/close02.png" />
                <p class="til">送你88元新人红包</p>
                <div class="rlist">
                    <div class="item" v-for="item in pop_new.data" v-bind:key="item.id">
                        <div class="item-l">
                            <p class="item-lt gb-c"><span class="item-ltn">¥</span>{{item.money}}</p>
                            <p class="item-lru">{{item.rule}}</p>
                        </div>
                        <div class="item-r">
                            <p class="item-rt">{{item.title}}</p>
                            <p class="item-rb">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                        </div>
                    </div>
                </div>
                <p class="btn gb-c" @click="pop_new.show=false">立即使用</p>
            </div>
        </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .pindex{
        .text{ height: auto; line-height: 24px;}
        .search{ position: relative; padding-left: .51rem; background: #fff; line-height: .44rem; }
        .sctrol{ display: block; height: .44rem; width: 100%; border: none; font-size: .14rem; }
        .sico{ position: absolute; left: .16rem; top: 0; font-size: .24rem; line-height: .44rem; color:@base;}
        .banner,.banner_img{ height: 1.67rem; }
        .cate-list{
            overflow: hidden; padding:  .2rem 0 .1rem; background: #fff; text-align: center;
            .cate-item{ float: left; width: 20%; height: .7rem; }
            .cate-ico{ display: block; margin: 0 auto; width: .42rem; }
            .cate-tx{ font-size: .12rem;} 
        }
        
        .coup{
            overflow: hidden; padding: .1rem .05rem;
            .citem{ position: relative; width: 1.78rem; height: .64rem; float: left; background: #fff; border-radius: .06rem; text-align: center; color: @base;}
            .citem:nth-child(2){ float: right;}
            .citem:after{ content: ""; display: block; position: absolute; left: .8rem; top: .1rem; bottom: .1rem; border-left: 1px solid #e6d9d2;}
            .cleft{ float: left; width: .8rem; line-height: .64rem; font-size: .5rem;}
            .cright{ float: right; width: .97rem;}
            .ctil{ padding: .07rem 0 .02rem; color: #333; }
            .cbtn{ width: .68rem; margin: 0 auto; line-height: .18rem; font-size: .1rem; color: #fff; background: @base; border-radius: .09rem;}
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
            .t-info{ padding: .02rem 0 0; font-size: .12rem; color: @base; text-align: center;}
        }
        .ptil{
            position: relative; padding: 0 .15rem; line-height: .42rem; font-size: .15rem; font-weight: bold;
            .pmore{ float: right; padding-right: .14rem; font-weight: normal; font-size: .14rem; color: #aaa; background: url(~@/assets/images/arr_r01.png) no-repeat right center; background-size: .07rem .13rem;}
        }
        .jingx{ padding-bottom: .1rem;}
        .seckill{ margin-bottom: .1rem;}
        .bottom{ text-align: center; color: #999; font-size: .12rem; color: #999; line-height: .4rem; }
        .likem{padding-bottom: .1rem; background: #fff; }
        .pop-redpack{
            background: #fc7421;
            .item{ width: 2.78rem; height: .75rem; margin: 0 auto; padding: .06rem .03rem 0 .1rem; background: url(~@/assets/images/cpbg.png); background-size: 100% 100%;}
            .item-l{float: left; width: .8rem; padding-top: .08rem;  font-size: .12rem; color: #777; text-align: center; line-height: .18rem;}
            .item-lt{ color: #ff7921; font-size: .2rem; line-height: .28rem;}
            .item-ltn{ font-size: .15rem; line-height: .24rem;}
            .item-r{ float: right; width: 1.72rem; font-size: .12rem; color: #999; line-height: .18rem;}
            .item-rt{ padding:.08rem 0 0; color: #222; font-size: .16rem; line-height: .28rem;}
            .btn{ width: 2rem; margin: .14rem auto .24rem; background: #fff; text-align: center; line-height: .36rem; font-size: .15rem; color: @base; border-radius: .18rem;}
            .til{ padding: .16rem 0 .1rem; line-height: .48rem; font-size: .24rem; text-align: center; color: #fff; font-weight: bold;}
        }
    }
    
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
            gobal:this.themes.setting,
            banner:{list:[],current:0},
            catelist:[],
            couponlist:[],
            gbcolor:'#ff7921',
            tuan:{loop:0,list:[],current:0},
            goodlist:[],
            seckill:[],
            pop_new:{show:true,list:[4,5,6]}
        }
    },
    created(){
        this.Ob.$emit('changetitle','首页');

        this.getNewred();
        this.getPageData();
        
    },
    activated() {
        this.$tools.setScrollTop(this.$route.meta.scrollTop||0)
    },
    methods:{
        //获取首页数据
        getPageData(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let banner = [
                        './tempimg/0banner01.jpg',
                        './tempimg/0banner02.jpg',
                        './tempimg/0banner03.jpg'
                    ]
                    this.banner.list = banner;
                    
                    //获取优惠券
                    let couponlist = [
                        {id:1,money:50,rule:'满199可用',receive:false},
                        {id:2,money:30,rule:'满199可用',receive:true}
                    ]
                    this.couponlist = couponlist;
                    
                    //获取拼团商品
                    let tuanlist = [
                        {id:1,img:'./tempimg/0banner01.jpg',people:2,price:9.99,total:1280},
                        {id:2,img:'./tempimg/0banner02.jpg',people:4,price:9.99,total:180},
                        {id:3,img:'./tempimg/0banner03.jpg',people:2,price:9.99,total:123},
                        {id:4,img:'./tempimg/0banner03.jpg',people:6,price:9.99,total:280},
                        {id:5,img:'./tempimg/0banner02.jpg',people:2,price:9.99,total:1280},
                        {id:6,img:'./tempimg/0banner01.jpg',people:2,price:9.99,total:1280},
                        {id:7,img:'./tempimg/0banner02.jpg',people:2,price:9.99,total:1280},
                        {id:8,img:'./tempimg/0banner03.jpg',people:1,price:9.99,total:1280},
                        {id:9,img:'./tempimg/0banner01.jpg',people:2,price:9.99,total:1280}
                    ]
                    this.tuan.loop = Math.ceil(tuanlist.length/3);
                    this.tuan.list = tuanlist;

                    //获取商品列表
                    let goodlist = [
                        {id:1,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:2,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:3,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                        {id:4,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false}
                    ]
                    this.goodlist = goodlist;

                    //秒杀商品列表
                    let seckill = [
                        {id:1,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,rate:100},
                        {id:2,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,rate:90},
                        {id:3,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,rate:95}
                    ]
                    this.seckill = seckill;
                }
            });
        },
        changetuan(index){
            this.tuan.current = index;
        },
        changebanner(index){
            this.banner.current = index;
        },
        getNewred(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,phone:'158****3345',money:50,rule:'满199可用',title:'满199减50优惠券',time_start:1564848000000,time_end:1571370725296},
                        {id:2,phone:'158****3345',money:30,rule:'满199可用',title:'满199减100优惠券',time_start:1564848000000,time_end:1571070725296},
                        {id:3,phone:'158****3345',money:8,rule:'满199可用',title:'满减优惠券',time_start:1564848000000,time_end:1570770725296}
                    ]
                    this.pop_new.show = true;
                    this.pop_new.data = list;
                }
            });
        },
        //领取优惠券
        receivecp(item){
            item.receive = true;
            this.$toast.success("领取成功")
        }
    }
}
</script>



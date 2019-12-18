<template>
    <div class="pages">
        <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in detail.banner" v-bind:key="item"><van-image fit="cover" class="banner_img" :src="item" /></van-swipe-item>
        </van-swipe>
        <div class="tstate">
            <p v-show="!hastime" class="st-end">活动已结束</p>
            <div v-show="hastime" class="st-goon">
                <div class="st-gol"><span>秒杀价</span><span class="st-gun">¥</span><span class="st-pri">{{detail.price}}</span></div>
                <div class="st-gor"><p>距离结束还剩</p><p class="st-gtm"><backtime :lasttime="detail.lasttime" v-on:timeend="timeover"></backtime></p></div>
            </div>
        </div>
        <div class="topinfo">
            <div class="dpice"><span class="ti-un">¥</span><span class="ti-pri">{{detail.price}}</span><span class="ti-oldp">价格<span class="ti-oldpri">{{detail.oldprice}}</span></span></div>
            <div class="ti-til">{{detail.title}}</div>
            <div class="ti-tips">
                <p class="ti-tip">快递：免运费</p><p class="ti-tip">月销量{{detail.sales}}笔</p><p class="ti-tip">{{detail.from}}</p>
            </div>
        </div>
        <div class="editlinebox editlinebox-sm">
            <div class="editline editline-cover editline-select" @click="showpop('coupon')">
                <p class="el-ado">优惠</p>
                <div class="el-text l"><p>满199减100</p><p>满199减100，部分地区包邮</p></div>
            </div>
        </div>
        <div class="editlinebox editlinebox-sm editlinebox-bl0">
            <div class="editline editline-cover editline-select" @click="showpop('canshu')">
                <p class="el-ado">参数</p>
                <div class="el-text l">生产日期，品牌···</div>
            </div>
            <div class="editline editline-cover">
                <p class="el-ado">配送</p>
                <div class="el-text l">蜀道香专递</div>
            </div>
        </div>

        <div class="dcontent" v-html="detail.content"></div>

        <div class="botline">
            <div :class="{'bl-ls':true,'active':detail.collect}" @click="changeCollect">
                <p class="bl-lsico"><van-icon class="ico" v-show="!detail.collect" name="like-o" /><van-icon class="ico" v-show="detail.collect" name="like" /></p>
                <p class="bl-lstx">{{detail.collect?'已收藏':'收藏'}}</p>
            </div>
            <p v-show="hastime" class="bl-btn bl-btnc" @click="onBuyClicked">立即抢购</p>
            <router-link v-show="!hastime" to="/category/list" class="bl-btn bl-btnd">查看店铺其他商品</router-link>
        </div>


        <!-- 优惠券 -->
        <van-popup v-model="pop_coupon.show" closeable position="bottom">
            <p class="poptil">优惠券</p>
            <p class="pop-loading" v-show="!pop_coupon.loaded">正在加载···</p>
            <div class="cp-list" v-show="pop_coupon.loaded">
                <div class="cp-citem" v-for="item in pop_coupon.list" v-bind:key="item.id">
                    <div class="cp-cimon"><span class="cp-ciun">¥</span>{{item.money}}</div>
                    <div class="cp-info flex">
                        <p class="cp-nm">{{item.name}}</p>
                        <p class="cp-time">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                    </div>
                    <div class="cp-rig flex"><p :class="{'cp-btn':true,'disable':item.receive}" @click="getCoupon(item)">{{item.receive?'已领取':'领取'}}</p></div>
                </div>
            </div>
        </van-popup>

        <!-- 参数 -->
        <van-popup v-model="pop_canshu" closeable position="bottom">
            <p class="poptil">产品参数</p>
            <div class="editlinebox editlinebox-sm editlinebox-bl0">
                <div class="editline">
                    <p class="el-ado">品牌</p>
                    <div class="el-text l">华为荣耀</div>
                </div>
                <div class="editline">
                    <p class="el-ado">版本</p>
                    <div class="el-text l">12.4</div>
                </div>
                <div class="editline">
                    <p class="el-ado">产地</p>
                    <div class="el-text l">中国广州东莞</div>
                </div>
                <div class="editline">
                    <p class="el-ado">企业</p>
                    <div class="el-text l">中国华为有限技术公司</div>
                </div>
            </div>
            <br />
        </van-popup>

    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-bottom: .6rem;}
    .banner,.banner_img{ height: 3rem; }
    .topinfo{
        background: #fff; padding: .1rem .14rem;
        .dpice{ line-height: .4rem;}
        .ti-un{ color: #f33b3b; font-size: .18rem;}
        .ti-pri{ color: #f33b3b; font-size: .24rem;}
        .ti-oldp{ margin-left: .2rem; font-size: .12rem; color: #666;}
        .ti-oldpri{ font-size: .12rem; color: #666; text-decoration: line-through;}
        .ti-til{ padding: .05rem 0 .15rem; line-height: .2rem; font-size: .15rem;}
        .ti-tips{display: flex; display: -webkit-flex; justify-content: space-between; font-size: .12rem; color: #666;}
    }
    .dcontent{ margin-top: .1rem;}
    .botline{
        position: fixed; left: 0; bottom: 0; right: 0; z-index: 3; display: flex; display: -webkit-flex; border-top: 1px solid #eee; background: #fff;
        .bl-ls{ padding-top: .02rem; width: .725rem; text-align: center;}
        .bl-ls.active{ color: #ff5000;}
        .bl-lsico{ height: .28rem; display: flex; display: -webkit-flex; justify-content: center; align-items: center;}
        .bl-lsico .ico{font-size: .24rem;}
        .bl-lstx{ font-size: .12rem; line-height: .18rem;}
        .bl-btn{ line-height: .5rem; text-align: center; font-size: .15rem; color: #fff; width: 1.15rem;}
        .bl-btna{ background: #fe9c02;}
        .bl-btnb{ background: #ff5000;}
        .bl-btnc{ width: 3.024rem; background: #ff5000;}
        .bl-btnd{ width: 3.024rem; background: #fe9c02;}
    }
    .poptil{ line-height: 50px; text-align: center; font-size: .16rem;}
    .pop-loading{ padding: .3rem 0; text-align: center; color: #666;}
    .cp-list{
        padding:.2rem .15rem .3rem;
        .cp-citem{display: flex; display: -webkit-flex; padding: .15rem 0; box-shadow: 0 0 3px 0 rgba(0,0,0,.2); margin-bottom: .16rem;}
        .cp-cimon{ width: .9rem; text-align: center; color: #ff7021; font-size: .4rem; line-height: .6rem;}
        .cp-ciun{ font-size: .2rem; line-height: .4rem;}
        .cp-info{ flex-direction: column; width: 1.7rem; align-items: flex-start; justify-content: center; }
        .cp-nm{ font-size: .16rem}
        .cp-time{ font-size: .12rem; color: #999;}
        .cp-rig{ width: .82rem; justify-content: center; align-items: center;}
        .cp-btn{ background: #ff7021; color: #fff; line-height: .3rem; height: .3rem; padding: 0 .15rem; border-radius: .15rem; text-align: center;}
        .cp-btn.disable{ background: #c5c5c5;}
    }
    .tstate{
        color: #fff; background: #fe9c02;
        .st-end{ padding-right: .2rem; text-align: right; line-height: .5rem;}
        .st-goon{overflow: hidden;}
        .st-gol{ float: left; line-height: .5rem; padding-left: .2rem; font-size: .17rem;}
        .st-gun{ margin: 0 .02rem 0 .1rem; font-weight: bold; font-size: .18rem;}
        .st-pri{ font-weight: bold; font-size: .23rem; }
        .st-gor{ float: right; width: 1rem; padding-top: .06rem; font-size: .1rem; line-height: .2rem; }
        .st-gtm{ font-size: .14rem; letter-spacing: .03rem;}
    }
</style>
<script>
import { Popup,Swipe, SwipeItem,Icon,Sku } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Icon.name]:Icon,
        [Sku.name]:Sku
    },
    data(){
        return {
            detail:{
                banner:[],
                lasttime:0
            },
            pop_coupon:{show:false,loaded:false,list:[]},
            pop_canshu:false,
            hastime:true
        }
    },
    created(){
        this.Ob.$emit('changetitle','商品详情');

        this.getDetail();
    },
    methods:{
        //获取商品详情
        getDetail(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let detail = {
                        banner : [
                                './tempimg/0detail01.jpg',
                                './tempimg/0detail02.jpg',
                                './tempimg/0detail03.jpg'
                        ],
                        price:39.99,
                        oldprice:59.99,
                        title:'蜀道香 休闲零食 草莓红薯糍300g蜀道香 休闲零食 草莓红薯糍300g蜀道香 休闲零食 草莓红薯糍300g',
                        sales:8879,
                        from:'广州深圳',
                        coupon:[
                            {id:2,name:'满99包邮'},
                            {id:3,name:'满199包邮减50'}
                        ],
                        content:'<img src="./tempimg/0detail_item01.jpg" /><img src="./tempimg/0detail_item02.jpg" /><img src="./tempimg/0detail_item03.jpg" />',
                        collect:false,
                        lasttime:10
                    }

                    this.detail = detail;
                }
            });
        },
        //收藏/取消
        changeCollect(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    if(this.detail.collect){
                        this.detail.collect = false;
                        this.$toast.success('取消成功');
                    }else{
                        this.detail.collect = true;
                        this.$toast.success('收藏成功');
                    }
                }
            });
        },
        //弹层
        showpop(type){
            if(type=='coupon'){
                if(!this.pop_coupon.loaded){
                    this.$http.get("./api/callback.json", {
                        params: 'params'
                    }).then((res) => {
                        let rs = res.data;
                        if(rs.code==0){
                            //虚拟数据
                            let list = [
                                {id:1,money:50,name:'满100减50',time_start:1568044800000,time_end:1570636800000,receive:false},
                                {id:2,money:30,name:'满80减30',time_start:1568044800000,time_end:1570636800000,receive:true}
                            ]
                            setTimeout(()=>{
                                this.pop_coupon.loaded = true;
                                this.pop_coupon.list = list;
                            },500)
                        }
                    });
                    
                }
                this.pop_coupon.show = true;
            }else if(type=='canshu'){
                this.pop_canshu = true;
            }
        },
        //领取优惠券
        getCoupon(item){
            if(!item.receive){
                this.$http.get("./api/callback.json", {
                    params: 'params'
                }).then((res) => {
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        item.receive = true;
                        this.$toast.success('领取成功');
                    }
                });
            }
        },
        //立即购买
        onBuyClicked(rs){
            // console.log(rs)
            this.rs = rs;
            this.$router.push('/category/ordersave')
        },
        timeover(){
            this.hastime = false;
        }
    }
}
</script>

<template>
    <div class="pages psalecenter" :style="'min-height:'+wheight+'px'">
        <div class="topbox">
            <img :src="head" class="tb-head" />
            <div class="tb-name flex"><span>Mary-Dream</span><p class="tb-tp flex">自购分佣<van-icon name="info-o" class="tb-ico" /></p></div>
            <p class="tb-sub">店铺:人人商城</p>
        </div>
        
        <div class="box">
            <div class="tabs">
                <div class="tab">
                    <p class="tb-til">我的收益</p>
                    <p class="tb-num c">28.00<span class="tb-sp">（今日收益）</span></p>
                    <p class="tb-ao">可提现<span class="tb-tol">8280.00</span></p>
                </div>
                <div class="tab">
                    <div class="tb-tx flex c">资产明细<p class="tb-ho"></p><router-link class="tb-link" to="/salesman/cashout">提现</router-link></div>
                    <p class="tb-ao">累计总收益<span class="tb-tol">8280.00</span></p>
                </div>
            </div>
        </div>

        <div class="box">
            <div class="tabs">
                <router-link to="/salesman/customer" class="tab">
                    <p class="tb-til">我的客户</p>
                    <p class="tb-num c">124<span class="tb-sp">（今日新增客户）</span></p>
                    <p class="tb-ao">累计客户<span class="tb-tol">45</span></p>
                </router-link>
                <div class="tab">
                    <p class="tb-til">我的收益</p>
                    <p class="tb-num c">28<span class="tb-sp">（今日订单）</span></p>
                    <p class="tb-ao">累计订单<span class="tb-tol">145</span></p>
                </div>
            </div>
        </div>

        <div class="bar">
            <router-link class="baritem" to="/salesman/goodlist">
                <img src="~@/assets/images/group01a.png" class="barico" />
                <p class="bartx">商品推广</p>
            </router-link>
            <router-link class="baritem" to="/">
                <img src="~@/assets/images/group01b.png" class="barico" />
                <p class="bartx">邀请好友</p>
            </router-link>
            <router-link class="baritem" to="/">
                <img src="~@/assets/images/group01c.png" class="barico" />
                <p class="bartx">通知中心</p>
            </router-link>
            <router-link class="baritem" to="/salesman/guide">
                <img src="~@/assets/images/group01d.png" class="barico" />
                <p class="bartx">新手指引</p>
            </router-link>
        </div>
    </div>
</template>
<style lang="less">
    .psalecenter{
        padding: .1rem 0 .2rem; background: url(~@/assets/images/bg10.jpg) no-repeat center -.1rem #fff; background-size: 3.75rem .77rem;
        .topbox{ position: relative; width: 3.47rem; margin: 0 auto; padding: .2rem 0 .2rem .9rem; background: #fff; border-radius: .05rem; box-shadow: 0 0 .03rem rgba(0,0,0,.2);}
        .tb-head{ position: absolute; left: .14rem; top: 50%; margin-top: -.3rem; width: .6rem; height: .6rem; border-radius: 50%; border:1px solid #eee;}
        .tb-name{ align-items: center; font-size: .18rem;}
        .tb-tp{ margin-left: .1rem; padding: 0 .05rem; border: 1px solid @base; color: @base; border-radius: .1rem; line-height: .16rem; font-size: .1rem; align-items: center;}
        .tb-ico{ margin-left: .05rem;}
        .tb-sub{ padding-top: .06rem; color: #666;}
        .box{ width: 3.47rem; margin: .12rem auto 0; background: #fff;box-shadow: 0 0 .03rem rgba(0,0,0,.2); border-radius: .05rem;}
        .tabs{ overflow: hidden;}
        .tab{ float: left; width: 50%; padding: .1rem 0 .16rem .18rem;}
        .tb-num{ padding: .07rem 0 .1rem; font-size: .2rem; line-height: .32rem;}
        .tb-sp{ font-size: .12rem; color: #999; line-height: .2rem;}
        .tb-ao{ font-size: .12rem;}
        .tb-tol{ margin-left: .1rem; font-size: .14rem;}
        .bar{width: 3.47rem; overflow: hidden; margin: .12rem auto 0; background: #fff; border-radius: .03rem;box-shadow: 0 0 .03rem rgba(0,0,0,.2); text-align: center;}
        .baritem{ display: block; float: left; width: 25%; padding: .2rem 0 .1rem; line-height: .3rem;}
        .barico{ display: block; margin: 0 auto; height: .29rem;}
        .tb-tx{ height: .24rem; margin-bottom: .49rem; padding-right: .14rem; align-items: center; justify-content: flex-end;}
        .tb-ho{ border-left: 1px solid #ccc; height: .12rem; margin: 0 .1rem;}
        .tb-link{ padding: 0 .1rem; background: @base; color: #fff; border-radius: .1rem; line-height: .2rem;}
    }
</style>
<script>
export default {
    data(){
        return {
            wheight:window.innerHeight||500,
            head:'./tempimg/head01.jpg'
        }
    },
    created(){
        this.Ob.$emit('changetitle','分销员中心');
    },
    methods:{
    }
}
</script>

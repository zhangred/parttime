<template>
    <div class="pages pmine01">
        <div class="bg gb-gradient"></div>
        <div class="top">
             <van-image fit="cover" class="t-img" src="./tempimg/head.jpg" />
             MRs.Zhang杨
        </div>

        <div class="order">
            <div class="otil">我的订单<a href="/order/list" class="oall arr-ra l0">查看全部订单</a></div>
            <div class="olist">
                <router-link class="oitem" to="/order/list?status=pay">
                    <p class="oico"><i class="oicoin gb-c iconfont iconfont-opay"></i></p>
                    <p class="otx">待付款</p>
                </router-link>
                <router-link class="oitem" to="/order/list?status=send">
                    <p class="oico"><i class="oicoin gb-c iconfont iconfont-osend"></i></p>
                    <p class="otx">待发货</p>
                </router-link>
                <router-link class="oitem" to="/order/list?status=receive">
                    <p class="oico"><i class="oicoin gb-c iconfont iconfont-otake"></i></p>
                    <p class="otx">待收货</p>
                </router-link>
                <router-link class="oitem" to="/order/list?status=comment">
                    <p class="oico"><i class="oicoin gb-c iconfont iconfont-orate"></i></p>
                    <p class="otx">待评论</p>
                </router-link>
                <router-link class="oitem" to="/order/list?status=retreat">
                    <p class="oico"><i class="oicoin gb-c iconfont iconfont-otui"></i></p>
                    <p class="otx">退货/退款</p>
                </router-link>
            </div>
        </div>

        <div class="lines">
            <router-link to="/mine/couponlist" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item02.png" />我的优惠券
            </router-link>
            <router-link to="/mine/address" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item03.png" />收货地址
            </router-link>
            <a href="tel:15821670480" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item04.png" />在线客服
            </a>
        </div>
        <div class="lines">
            <router-link to="/pages/question" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item05.png" />常见问题
            </router-link>
            <router-link to="/pages/feedback" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item06.png" />问题反馈
            </router-link>
        </div>
        <div class="lines">
            <router-link to="/mine/setting" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item07.png" />设置
            </router-link>
        </div>

         <botnav active="mine"></botnav>
    </div>
</template>
<style lang="less" >
    .pmine01{ 
        position: relative; padding-bottom: .1rem;
        .bg{ position: absolute; left: 0;top: 0;right: 0; z-index: 1; height: 2rem; width: 100%; background: url(~@/assets/images/bg03.jpg) repeat-x; background-size: 1px 100%;}
        .top{ display: flex; display: -webkit-flex; position: relative; z-index: 2; height: 1.4rem; padding: 0 0 0 .3rem; font-size: .16rem; color: #fff; justify-content: flex-start; align-items: center; }
        .t-img{ height: .65rem; width: .65rem; margin-right: .1rem; border-radius: 50%; overflow: hidden;}
        .order{ position: relative; z-index: 2; width: 3.55rem; margin: 0 auto; background: #fff; border-radius: .08rem;}
        .otil{ padding: 0 .1rem; border-bottom: 1px solid #f3f3f3; line-height: .42rem; font-size: .16rem; font-weight: bold;}
        .oall{ float: right; position: relative; padding-right: .1rem; font-weight: normal; font-size: .13rem;}
        .olist{ overflow: hidden; padding: .2rem 0; text-align: center; font-size: .12rem;}
        .oitem{ float: left; width: 20%;}
        .oico{ display: block; width: .28rem; margin: 0 auto;color: @base;}
        .oicoin{ line-height: .32rem; font-size: .24rem; }
        .lines{width: 3.55rem; margin: .1rem auto 0; margin-bottom: .1rem; background: #fff; border-radius: .08rem;}
        .line{ display: block; position: relative; padding-left: .5rem; line-height: .5rem; border-bottom: 1px solid #f3f3f3;}
        .line:nth-last-child(1){ border: none;}
        .lico{ position: absolute; left: .12rem; top: 50%; height: .28rem; width: .28rem; margin-top: -.14rem;}
    }
</style>
<script>
export default {
    data(){
        return {
        }
    },
    created(){
        this.Ob.$emit('changetitle','我的');
    },
    methods:{
    }
}
</script>

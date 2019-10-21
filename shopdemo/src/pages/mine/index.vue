<template>
    <div class="pages">
        <div class="top">
             <van-image fit="cover" class="t-img" src="/tempimg/head.jpg" />
             <p class="t-name">MRs.Zhang杨</p>
             <img src="~@/assets/images/bg02.jpg" class="tbg" />
        </div>
        <div class="lines linesa">
            <router-link to="/orderlist" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item01.png" />我的订单
            </router-link>
            <router-link to="/couponlist" class="line arr-ra">
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
            <router-link to="/question" class="line arr-ra">
                <img class="lico" src="~@/assets/images/mine_item05.png" />常见问题
            </router-link>
            <router-link to="/single/feedback" class="line arr-ra">
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
<style lang="less"  scoped>
    .pages{padding-bottom: .1rem;}
    .top{ position: relative; height: 1.9rem; padding-top: .3rem; background: url(~@/assets/images/bg01.png) repeat-x; background-size: 1px 100%;}
    .t-img{ display: block; margin: 0 auto; height: .76rem; width: .76rem; border-radius: 50%; border: .02rem solid #fff; overflow: hidden;}
    .t-name{ padding-top: .14rem; color: #fff; font-size: .17rem; text-align: center;}
    .tbg{ position: absolute; left: 0; bottom: 0; right: 0;}
    .lines{ margin-bottom: .1rem; background: #fff; }
    .linesa{ padding-top: .3rem; border-top: none;}
    .line{ display: block; position: relative; padding-left: .5rem; line-height: .5rem; border-bottom: 1px solid #f3f3f3;}
    .line:nth-last-child(1){ border: none;}
    .lico{ position: absolute; left: .12rem; top: 50%; height: .28rem; width: .28rem; margin-top: -.14rem;}
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

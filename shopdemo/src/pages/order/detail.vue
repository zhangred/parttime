<template>
    <div class="pages morderdetail">
        <div class="topsta">交易成功<img src="~@/assets/images/cart.png" class="tsio" /></div>
        
        <div class="lines">
            <router-link to="/order/logistics" href="javascript:;" class="line arr-ra">
                <img src="~@/assets/images/order_cart.png" class="lado a ymid" />
                <p class="ltil">顺丰速递已揽件，请耐心等待</p>
                <p class="ltp">2019-08-20  08:08:08</p>
            </router-link>
            <a href="javascript:;" class="line">
                <img src="~@/assets/images/order_map.png" class="lado b ymid" />
                <p class="lname">Mary-zheng<span class="lph">146****4566</span></p>
                <p class="ltp">湖南省长沙市岳麓区麓谷街道涉外经济学院旁长丰安置小区C区8栋</p>
            </a>
        </div>

        <div class="goodinfo">
            <router-link to="/shop/index" class="gi-shop ovh">
                <p class="gi-sname flex flex-center arr-ra l0 fl"><van-icon name="shop-collect" class="gi-ico c" />麦兜旗舰店</p>
                <span class="gi-sta c fr">交易成功</span>
            </router-link>
            <router-link to="/category/detail" class="gi-gd">
                <van-image fit="cover" class="gi-img" src="./tempimg/0detail_item01.jpg" />
                <p class="gi-til">麦兜包包女2018新款潮真皮女麦兜包包女2018新款潮真皮女包单肩斜挎包时尚锁扣牛包单肩斜挎包时尚锁扣牛</p>
                <p class="gi-sub">颜色：红色【少量现货】</p>
                <div class="gi-pri">
                    <p>¥258.00</p>
                    <p class="gi-num">x4</p>
                </div>
            </router-link>
        </div>

        <div class="price">
            <div class="pit">商品价格<span class="fr">¥258.00</span></div>
            <div class="pit">运费<span class="fr">¥0.00</span></div>
            <div class="pit pita">订单总价<span class="fr">¥258.00</span></div>
        </div>
        <p class="ptotal bdtb">实付款<span class="ptnum fr c">¥258.00</span></p>

        <div class="ltps bdtb">
            <p class="">订单编号：102923930489095059</p>
            <p class="">微信交易：42506702948004094980709897</p>
            <p class="">创建时间：2019-08-18 21:20:20</p>
            <p class="">付款时间：2019-08-20 21:20:20</p>
            <p class="">发货时间：2019-08-23 21:20:20</p>
            <p class="">成交时间：2019-08-18 21:20:20</p>
        </div>

        <div class="botline flex">
            <router-link to="/order/logistics" class="bl-btn">查看物流</router-link>
            <router-link to="/order/rate" class="bl-btn">评价</router-link>
        </div>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">订单已签收</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">拼团成功</p>
            </div>
        </over-touch>

        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less">
    .morderdetail{
        padding-bottom: .6rem;
        .topsta{ position: relative; padding-left: .26rem; color: #fff; font-size: .18rem; line-height: .7rem; background:linear-gradient(90deg,#ff8833 0%,#fd9e43 100%); }
        .tsio{ position: absolute; right: .6rem; top: .13rem; width: .55rem; opacity: .34;}
        .lines{ padding-left: .14rem; background: #fff; border-bottom: 1px solid #eee; }
        .line{position: relative;  display: block; padding: .1rem .14rem .1rem .34rem; border-bottom: 1px solid #eee;}
        .line:nth-last-child(1){ border: none}
        .lado{ position: absolute; left: 0; top: 50%;}
        .lado.a{ width: .26rem}
        .lado.b{ width: .2rem; left: .03rem;}
        .ltp{ line-height: .18rem; color: #666}
        .lname{ font-size: .15rem;}
        .lph{ margin-left: .1rem;}
        .goodinfo{ margin-top: .1rem; border-top: 1px solid #eee; background: #fff;}
        .gi-shop{ display: block; padding: 0 .14rem; border-bottom: 1px solid #eee; line-height: .44rem; }
        .gi-sname{ position: relative; padding-right: .1rem;}
        .gi-ico{ margin-right: .06rem; font-size: .18rem;}
        .gi-sta{ font-size: .12rem;}
        .gi-gd{ display: block; height: 1rem; position: relative; padding: .1rem .14rem .1rem 1rem;}
        .gi-img{ position: absolute; left: .1rem; top: .1rem; width: .8rem; height: .8rem;}
        .gi-til{display: -webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden; padding-right: .7rem; line-height: .18rem;}
        .gi-sub{ padding-top: .05rem; color: #999;}
        .gi-pri{ position: absolute; right: .14rem; top: .07rem; text-align: right; font-size: .15rem;}
        .gi-num{ font-size: .12rem; color: #666;}
        .price{ background: #fff; padding: .1rem .14rem; font-size: .12rem; line-height: .18rem; color: #999;}
        .pita{ font-size: .15rem; line-height: .24rem; color: #333;}
        .ptotal{ padding: 0 .14rem; line-height: .44rem;font-size: .15rem;  background: #fff;}
        .ltps{ margin-top: .1rem; padding: .1rem .14rem; background: #fff; font-size: .12rem; line-height: .2rem; color: #999;}
        .botline{ position: fixed; left: 0; bottom: 0; right: 0; padding: .06rem .14rem; background: #fff; border-top: 1px solid #eee; justify-content: flex-end;}
        .bl-btn{ display: block; margin-left: .1rem; line-height: .3rem; border: 1px solid #ccc; border-radius: .16rem; padding: 0 .14rem; font-size: .12rem;}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
    }
</style>
<script>
import { Popup } from 'vant';
export default {
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            popshow:false,
            state:1
        }
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = this.alive?true:false;
        next();
    },
    activated() {
        
    },
    deactivated() {
        // 不显示
        console.log(2);
    },
    created(){
        this.Ob.$emit('changetitle','订单详情');
    },
    methods:{
        showContent(item){
            
        }
    }
}
</script>

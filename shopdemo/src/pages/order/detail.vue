<template>
    <div class="pages morderdetail">
        <div class="topsta" v-if="state==1">交易成功<img src="~@/assets/images/cart.png" class="tsio" /></div>
        <div class="topsta" v-if="state==2||state==5">买家已付款<img src="~@/assets/images/cart.png" class="tsio" /></div>
        <div class="topsta" v-if="state==3">
            <p class="tsback">等待买家付款<br /><backtime :lasttime="1800" class="tstime" short format="订单m:s后自动关闭" /></p>
            <img src="~@/assets/images/cart01.png" class="tsio" />
        </div>
        <div class="topsta" v-if="state==4">
            <p class="tsback">交易关闭<br /><span class="tstime">原因：信息填写错误，重新拍</span></p>
            <img src="~@/assets/images/cart01.png" class="tsio" />
        </div>
        <div class="topsta" v-if="state==6">交易关闭<img src="~@/assets/images/cart.png" class="tsio" /></div>
        <div class="topsta a" v-if="state==7">
            <van-icon name="clock" class="tsclock" />
            <p class="tsback">待成团<br /><span class="tstime">请尽快邀请好友参与拼团</span></p>
        </div>
        <div class="topsta a" v-if="state==8">
            <van-icon name="clock" class="tsclock" />
            已成团，等待商家发货
            <img src="~@/assets/images/cart01.png" class="tsio" />
        </div>
        <div class="topsta a" v-if="state==9">
            <van-icon name="clock" class="tsclock" />
            已成团
            <img src="~@/assets/images/cart01.png" class="tsio" />
        </div>


        
        <div class="lines">
            <router-link to="/order/logistics" href="javascript:;" class="line arr-ra" v-if="state==1">
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
                <span class="gi-sta c fr" v-if="state==1">交易成功</span>
                <span class="gi-sta c fr" v-if="state==7">待成团</span>
                <span class="gi-sta c fr" v-if="state==2||state==8">买家已付款</span>
                <span class="gi-sta c fr" v-if="state==9">已发货</span>
                <span class="gi-sta c fr" v-if="state==6">交易关闭</span>
            </router-link>
            <router-link to="/category/detail" :class="['gi-gd',{'bg':state==5||state==2||state==6}]">
                <van-image fit="cover" class="gi-img" src="./tempimg/0detail_item01.jpg" />
                <p class="gi-til">麦兜包包女2018新款潮真皮女麦兜包包女2018新款潮真皮女包单肩斜挎包时尚锁扣牛包单肩斜挎包时尚锁扣牛</p>
                <p class="gi-sub">颜色：红色【少量现货】</p>
                <p class="gi-btns" v-if="state==2">
                    <router-link to="/order/refundApply" class="gi-btn">退款</router-link>
                </p>
                <p class="gi-btns" v-if="state==5">
                    <router-link to="/order/refundDetail" class="gi-btn a">退款处理中···</router-link>
                </p>
                <p class="gi-btns" v-if="state==6">
                    <router-link to="/order/refundDetail" class="gi-btn">退款成功</router-link>
                </p>
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

        <div class="botline flex" v-if="state==1">
            <router-link to="/order/logistics" class="bl-btn">查看物流</router-link>
            <router-link to="/order/rate" class="bl-btn a">评价</router-link>
        </div>

        <div class="botline flex" v-if="state==2">
            <p class="bl-btn" @click="remindsend">提醒发货</p>
            <p class="bl-btn">修改地址</p>
        </div>

        <div class="botline flex" v-if="state==3">
            <p class="bl-btn" @click="popCancel.show=true">取消订单</p>
            <p class="bl-btn a">去支付</p>
        </div>

        <div class="botline flex" v-if="state==7">
            <router-link to="/order/refundApply" class="bl-btn">申请退款</router-link>
            <router-link to="/assemble/detail" class="bl-btn b">邀请好友</router-link>
        </div>

        <div class="botline flex" v-if="state==8">
            <router-link to="/order/logistics" class="bl-btn">查看物流</router-link>
            <router-link to="/order/refundApply" class="bl-btn">申请退款</router-link>
        </div>
        <div class="botline flex" v-if="state==9">
            <router-link to="/order/logistics" class="bl-btn">查看物流</router-link>
            <router-link to="/order/refundApply" class="bl-btn">申请退款</router-link>
            <router-link to="/assemble/detail" class="bl-btn">查看团详情</router-link>
        </div>


        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">订单已签收</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">已付款待发货</p>
                <p :class="['otitem',{'otitem-ac':state==3}]" @click="state=3">未付款</p>
                <p :class="['otitem',{'otitem-ac':state==4}]" @click="state=4">已取消</p>
                <p :class="['otitem',{'otitem-ac':state==5}]" @click="state=5">退款处理中</p>
                <p :class="['otitem',{'otitem-ac':state==6}]" @click="state=6">退款成功</p>
                <p :class="['otitem',{'otitem-ac':state==7}]" @click="state=7">拼团-待成团</p>
                <p :class="['otitem',{'otitem-ac':state==8}]" @click="state=8">拼团-成团-待发货</p>
                <p :class="['otitem',{'otitem-ac':state==9}]" @click="state=9">拼团-成团-已发货</p>
            </div>
        </over-touch>

        <van-popup v-model="popCancel.show" class="pcc">
            <div class="">
                <p class="pcc-til c">请选择取消订单的理由</p>
                <div class="pcc-list">
                    <van-radio-group v-model="popCancel.cid">
                        <p class="pcc-item" v-for="item in popCancel.list" :key="item.id" @click="chooseCancel(item)">{{item.name}}<van-radio class="pcc-rd" :name="item.id"></van-radio></p>
                    </van-radio-group>
                </div>
                <div class="pcc-btns">
                    <a href="javascript:;" class="pcc-btn" @click="orderCancel.show=false">取消</a><a href="javascript:;" class="pcc-btn c" @click="sureCancel">确定</a>
                </div>
            </div>
        </van-popup>
    </div>
</template>
<style lang="less">
    .morderdetail{
        padding-bottom: .6rem;
        .topsta{ position: relative; min-height: .7rem; padding-left: .26rem; color: #fff; font-size: .18rem; line-height: .7rem; background:linear-gradient(90deg,#ff8833 0%,#fd9e43 100%); }
        .topsta.a{ padding-left: .5rem;}
        .tsclock{ position: absolute; left: .26rem; top: 50%; margin-top: -.17rem; line-height: .3rem;}
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
        .gi-gd{ display: block; min-height: 1rem; position: relative; padding: .1rem .14rem .1rem 1rem;}
        .gi-gd.bg{ background: #f8f8f8;}
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
        .bl-btn,.gi-btn{ display: block; margin-left: .1rem; min-width: .5rem; text-align: center; line-height: .3rem; border: 1px solid #ccc; border-radius: .16rem; padding: 0 .14rem; font-size: .12rem;}
        .bl-btn.a{ border-color: @base; color: @base;}
        .bl-btn.b{border-color: @base; background: @base; color: #fff;}
        .ot .otls{ width: .8rem;}
        .tsback{ line-height: .2rem; padding: .18rem 0 .12rem 0;}
        .tstime{ font-size: .12rem;}
        .gi-btns{ overflow: hidden; padding: .1rem 0 0;}
        .gi-btn{ width: auto; float: right; background: #fff;}
        .gi-btn.a{border-color: @base; color: @base;}
        .pcc{ overflow: hidden; width: 3rem; border-radius: .06rem; }
        .pcc-til{ padding-left: .14rem; line-height: .48rem; text-align: center; font-size: .18rem;}
        .pcc-list{ padding-left: .14rem; border-top: 1px solid #eee; border-bottom: 1px solid #eee;}
        .pcc-item{ position: relative; line-height: .4rem; border-bottom: 1px solid #eee;}
        .pcc-item:nth-last-child(1){ border: none;}
        .pcc-rd{ position: absolute; right: .14rem; top: 50%; transform: translateY(-50%); -webkit-transform: translateY(-50%);}
        .pcc-btns{ overflow: hidden; line-height: .4rem; text-align: center; font-size: .12rem;}
        .pcc-btn{ display: block; float: left; width: 50%;}
        .pcc-btn:nth-child(1){ border-right: 1px solid #eee;}
        .xxxx{}
    }
</style>
<script>
import { Popup,RadioGroup, Radio } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [RadioGroup.name]:RadioGroup,
        [Radio.name]:Radio
    },
    data(){
        return {
            popshow:false,
            state:1,
            popCancel:{show:false,cid:null},
        }
    },
    created(){
        this.Ob.$emit('changetitle','订单详情');

        this.popCancel.list = [
            {id:1,name:'我不想买了'},
            {id:2,name:'信息填写错误，重新拍'},
            {id:3,name:'卖家缺货'},
            {id:4,name:'同城见面交易'},
            {id:5,name:'其他原因'},
        ]
    },
    methods:{
        //提醒发货
        remindsend(){
            this.$toast.success('提醒成功');
        },
        //确认收货
        receive(item){
            this.$toast.success('收货成功');
            item.status = 'comment'
        },
        //延长收货
        delayReceive(){
            this.$toast.success('延长成功');
        },
        //取消订单
        chooseCancel(item){
            this.popCancel.cid = item.id;
        },
        sureCancel(){
            if(!this.popCancel.cid){
                this.$toast.fail('请选择取消原因');
                return;
            }
            this.$toast.success('取消成功');
            this.popCancel.show = false;
            this.state = 4;
        }
    }
}
</script>

<template>
    <div class="pages psalecashout">

        <van-notice-bar text="提现需要身份实名认证，现在就去实名认证。" left-icon="volume-o" />

        <div class="cont">
            <div class="to flex">
                <p class="ado">到账账户</p>
                <p class="trs arr-ra l0" @click="popbank=true"><span class="tdis" v-show="!bank.id">请添加</span><span v-show="bank.id" class="tname">{{bank.name}}</span></p>
            </div>
            <div class="money">
                <p class="mtil">提现资产</p>
                <div class="input">
                    <p class="mao">¥</p>
                    <input :class="['ctrol',{'dis':money.length==0}]" v-model="money" placeholder="输入提现金额" type="number" />
                    <a href="javascript:;" class="mall" @click="money=allmoney">全部</a>
                </div>
                <p class="mtp"><span class="fee" v-show="fee">手续费{{fee|tofix(2)}}元，</span><span>可提现金额200.00元</span></p>
            </div>
            <a href="javascript:;" class="cm-btn gb-bgc-bdc" @click="save">确认提现</a>
        </div>

        <p class="bot alic"><router-link class="bot-link" to="/salesman/history">提现记录</router-link></p>

        <!-- 提现账户列表 -->
        <van-popup v-model="popbank" position="bottom">
            <div class="popbank">
                <div class="pb-til flex">
                    <p class="">请选择到账账户</p>
                    <van-icon name="cross" class="pb-close" @click="popbank=false"/>
                </div>
                <div class="pb-list bdtb">
                    <div :class="['pb-item flex',{'active':item.id==bank.id}]" v-for="item in banklist" :key="item.id" @click="choosebank(item)">
                        <van-icon name="circle" class="pb-ico" />
                        <van-icon name="checked" class="pb-ico active" />
                        <img v-if="item.id==1" src="~@/assets/images/pay_alipay.png" class="pb-type" />
                        <img v-if="item.id==2" src="~@/assets/images/pay_wx.png" class="pb-type" />
                        <img v-if="item.id!=1&&item.id!=2" src="~@/assets/images/pay_bank.png" class="pb-type" />
                        <p class="pb-name">{{item.name}}</p>
                    </div>
                </div>
                <router-link to="/salesman/bankedit" class="pb-new">使用新卡提现</router-link>
                <router-link to="/salesman/banklist" class="cm-btn pb-btn gb-bgc-bdc">我的银行卡</router-link>
            </div>
        </van-popup>
    </div>
</template>
<style lang="less">
    .psalecashout{
        .cont{ margin: .1rem .14rem; background: #fff; overflow: hidden; border:1px solid #eee; border-radius: .05rem;}
        .to{ justify-content: space-between; padding: .17rem .23rem; background: #fbfbfb; line-height: .4rem;}
        .trs{ padding-right: .1rem; flex-grow: 1; text-align: right;}
        .tname{ color: #5a7197;}
        .tdis{ color: #999;}
        .money{ padding: 0 .23rem;}
        .mtil{ padding: .17rem 0; line-height: .4rem; }
        .input{ position: relative; padding: 0 .4rem 0 .3rem; line-height: .48rem;}
        .mao{ position: absolute; left: 0; top: 0; font-size: .34rem; line-height: .48rem;}
        .ctrol{ display: block; width: 100%; border: none; height: .48rem; font-size: .24rem;}
        .ctrol.dis{ font-size: .16rem;}
        .mall{ position: absolute; z-index: 2; right: 0; top: 0; color: #347aea; font-size: .16rem;}
        .mtp{ padding: .1rem 0 .3rem; border-top: 1px solid #eee; font-size: .12rem; color: #999;}
        .fee{ color: #333;}
        .cm-btn{ margin: 0 .23rem .23rem; border-color: @base; color: #fff; background: @base; border-radius: .04rem;}
        .bot{ padding-top: .1rem;}
        .bot-link{color: #347aea;}
        .pb-til{ justify-content: space-between; padding: 0 .14rem; line-height: .44rem;}
        .pb-close{ line-height: .44rem;}
        .pb-list{ padding-left: .46rem;}
        .pb-item{ position: relative; padding: .15rem 0; align-items: center; border-bottom: 1px solid #eee;}
        .pb-item:nth-last-child(1){ border-bottom: none;}
        .pb-ico{ position: absolute; left: -.32rem; color: #ccc; font-size: .18rem;}
        .pb-ico.active{ opacity: 0; color: @base;}
        .active .pb-ico{ opacity: 0;}
        .active .active{ opacity: 1;}
        .pb-type{ width: .23rem; margin-right: .1rem;}
        .pb-new{ display: block; padding: .1rem 0 .1rem .46rem; font-size: .16rem; font-weight: bold;}
        .pb-btn{ display: block; margin: .3rem .14rem .2rem; border-color: @base; color: #fff; background: @base; border-radius: .04rem;}
    }
</style>
<script>
import { Popup,NoticeBar } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [NoticeBar.name]:NoticeBar
    },
    data(){
        return {
            popbank:false,
            bank:{},
            banklist:[],
            money:'',
            allmoney:200,
            fee:0,
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','提现');

        this.banklist = [
            {id:1,name:'支付宝',ico:'~@/assets/images/pay_alipay.png'},
            {id:2,name:'微信',ico:'pay_wx.png'},
            {id:3,name:'招商银行(3490)',ico:'pay_bank.png'},
            {id:4,name:'中国银行(3456)',ico:'pay_bank.png'},
        ];
    },
    watch:{
        money:function(newval){
            if(newval){
                var v = parseFloat(newval);
                if(v>this.allmoney){
                    v = this.allmoney;
                }
                this.money = v;
                this.fee = parseFloat(newval)/1000<.1?.1:parseFloat(newval)/1000
            }else{
                this.fee = 0;
            }
        }
    },
    methods:{
        choosebank(item){
            this.bank = item;
            this.popbank = false;
        },
        //确认提现
        save(){
            if(this.locked) return;
            if(!this.bank.id){
                this.$toast.fail('请选择提现账号');
                return;
            }
            if(!this.money){
                this.$toast.fail('请输入提现金额');
                return;
            }

            this.$toast.loading({
                message: '提现中...',
                forbidClick: true,
                duration:0
            });
            setTimeout(()=>{
                this.$toast.clear()
                this.locked = false;
                this.$router.back()
            },1500)

        }
    }
}
</script>

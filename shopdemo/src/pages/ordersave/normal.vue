<template>
    <div class="posnormal">
        <!-- 地址相关 -->
        <div class="adres-no flex" @click="changeAdr" v-if="!order.address.id">
            <div class="adr-l flex">
                <van-icon name="add" class="adr-add gb-c" />添加收货地址
            </div>
            <van-icon name="arrow" class="adr-arr" />
        </div>
        <div class="adres-no flex" @click="changeAdr" v-if="order.address.id">
            <div class="adr-l flex">
                <van-icon name="location-o" class="adr-map" />
                <div class="adrif">
                    <p class="adr-tp"><span class="adr-name">{{order.address.name}}</span>{{order.address.tel}}</p>
                    <p class="adr-str">{{order.address.address}}</p>
                </div>
            </div>
            <van-icon name="arrow" class="adr-arr" />
        </div>

        <!-- 商品信息 -->
        <div class="good">
            <p class="gtil">商品信息</p>
            <div class="ginfo">
                <van-image fit="cover" class="ginfo-img" :src="order.good.url" />
                <p class="ginfo-til ellipsis">{{order.good.name||'--'}}</p>
                <p class="ginfo-sub ellipsis">{{order.good.sub||'--'}}</p>
                <p class="ginfo-price gb-c">¥<span class="ginfo-pr">{{order.good.price|tofix(2)}}</span></p>
            </div>
        </div>

        <!-- 选项 -->
        <div class="bgcfff">
            <div class="editlinebox editlinebox-bl0 editlinebox-nmt">
                <div class="editline">
                    <p class="el-ado">购买数量</p>
                    <div class="el-text"><van-stepper v-model="order.num" min="1" @change="numchange" /></div>
                </div>
                <div class="editline editline-cover editline-select"  @click="showpop('coupon')">
                    <p class="el-ado">优惠活动</p>
                    <div class="el-text"><p>{{order.coupon.id?order.coupon.name:'没有可用的优惠券'}}</p></div>
                </div>
                <div class="editline editline-cover editline-select" @click="invoice">
                    <p class="el-ado">发票</p>
                    <div class="el-text"><p>{{order.invoice.id?order.invoice.name:'未开具发票'}}</p></div>
                </div>
                <div class="editline editline-cover">
                    <p class="el-ado">配送方式</p>
                    <div class="el-text"><p>快递 包邮</p></div>
                </div>
                <div class="editline">
                    <p class="el-ado">商家留言</p>
                    <div class="el-input"><input type="text" v-model="order.msg" class="el-ctrol" placeholder="填写内容已与商家协商确认" /></div>
                </div>
            </div>
        </div>

        <!-- 价格 -->
         <div class="count">
            <div class="editlinebox editlinebox-nmt">
                <div class="editline">
                    <p class="el-ado el-ado-m">商品金额</p>
                    <div class="el-text">23.45</div>
                </div>
                <div class="editline editline-cover">
                    <p class="el-ado el-ado-m">运费</p>
                    <div class="el-text"><p>4.00</p></div>
                </div>
                <div class="editline editline-cover" v-show="order.coupon.id">
                    <p class="el-ado el-ado-m">优惠</p>
                    <div class="el-text"><p>{{order.coupon.money|tofix(2)}}</p></div>
                </div>
            </div>
            <div class="total">共<span class="toc gb-c">{{order.num}}</span>件商品，小计：<span class="toc to-num gb-c">¥&ensp;{{order.total|tofix(2)}}</span></div>
        </div>

        <div class="botline">
            共<span class="toc gb-c">{{order.num}}</span>件商品，<span class="blco">合计：</span><span class="toc to-num gb-c">¥&ensp;{{order.total|tofix(2)}}</span>
            <van-button class="bl-btn gb-bgc-bdc" :loading="paying" :color="gobal.color" loading-text="支付中..."  @click="gopay">去支付</van-button>
        </div>

        <!-- 优惠券 -->
        <van-popup v-model="pop_coupon.show" position="bottom">
            <p class="poptil">优惠券</p>
            <p class="pop-loading" v-show="!pop_coupon.loaded">正在加载···</p>
            <div class="cp-list" v-show="pop_coupon.loaded">
                <div class="cp-citem" v-for="item in pop_coupon.list" v-bind:key="item.id" @click="getCoupon(item)">
                    <div class="cp-cimon gb-c"><span class="cp-ciun">¥</span>{{item.money}}</div>
                    <div class="cp-info flex">
                        <p class="cp-nm">{{item.name}}</p>
                        <p class="cp-time">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                    </div>
                    <div class="cp-rig flex"><van-icon name="checked" :class="{'cp-chk':true,'disable':!item.choose,'gb-c':item.choose}" /></div>
                </div>
            </div>
        </van-popup>


       
    </div>
</template>
<style lang="less">
   .posnormal{
        padding: .08rem 0 .6rem;
        .adres-no{ height: .9rem; padding: 0 .08rem; background: #fff; justify-content: space-between; align-items: center;}
        .adr-l{ align-items: center; font-size: .16rem;}
        .adr-add{ font-size: .2rem; color: @base; margin-right: .08rem;}
        .adr-arr{ font-size: .2rem; color: #ccc;}
        .adr-tp{ padding-bottom: .05rem; font-size: .16rem; font-weight: bold;}
        .adr-name{ margin-right: .2rem;}
        .adr-str{ font-size: .14rem; line-height: .2rem;}
        .adr-map{ color: #999; margin-right: .1rem;}
        .good{ margin-top: .1rem; background: #fff;}
        .gtil{ padding: .07rem 0 .07rem .14rem;}
        .ginfo{ position: relative; height: .95rem; background: #f7f9fc; padding:0 .1rem 0 1rem;}
        .ginfo-img{ position: absolute; left: .14rem; top: .1rem; height: .75rem; width: .75rem; }
        .ginfo-til{ padding-top: .06rem; font-size: .13rem;}
        .ginfo-sub{ font-size: .12rem; color: #666;}
        .ginfo-price{ padding-top: .05rem; color: @base; font-size: .12rem;}
        .ginfo-pr{ margin-left: .05rem; font-size: .15rem;}
        .count{
            background: #fff; margin-top: .1rem;
            .editlinebox{ padding: .1rem 0;}
            .editlinebox .editline{ border: none;}
            .editlinebox .el-text{ padding: 0.06rem 0.14rem 0.06rem 0;}
            .editlinebox .el-ado{ color: #777;}
        }
        .total{ padding-right: .14rem; font-size: .12rem; line-height: .4rem; margin-left: .14rem; border-top: 1px solid #eee; text-align: right;}
        .toc{ color: @base;}
        .to-num{ font-size: .16rem;}
        .botline{ position: fixed; left: 0; bottom: 0; right: 0; z-index: 3; height: .5rem; padding-right: 1.3rem; background: #fff; border-top: 1px solid #eee; line-height: .5rem; font-size: .12rem; text-align: right;}
        .blco{ font-size: .15rem;}
        .bl-btn{ position: absolute; right: 0; top: 0; height: .5rem; width: 1.2rem; font-size: .16rem;}
        .xxxx{}
        .poptil{ text-align: center; padding: .1rem 0; font-size: .16rem; color: #666;}
        .cp-list{
            padding:.1rem .15rem .1rem; background: #f6f6f6;
            .cp-citem{display: flex; display: -webkit-flex; padding: .1rem 0; background: #fff; margin-bottom: .1rem;}
            .cp-cimon{ width: .9rem; text-align: center; color: @base; font-size: .32rem; line-height: .6rem;}
            .cp-ciun{ font-size: .2rem; line-height: .4rem; margin-right: .05rem;}
            .cp-info{ flex-direction: column; width: 1.7rem; align-items: flex-start; justify-content: center; }
            .cp-nm{ font-size: .16rem}
            .cp-time{ font-size: .12rem; color: #999;}
            .cp-rig{ width: .82rem; justify-content: center; align-items: center;}
            .cp-chk{ color: @base; font-size: .16rem;}
            .cp-chk.disable{ color: #c5c5c5;}
        }
   }
</style>
<script>
import { Popup,Icon,Stepper,Button } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Icon.name]:Icon,
        [Stepper.name]:Stepper,
        [Button.name]:Button,
    },
    data(){
        return {
            gobal:this.themes.setting,
            alive:false,
            order:{address:{},good:{},num:1,coupon:{},invoice:{},total:0,msg:''},
            pop_coupon:{show:false,loaded:false,list:[]},
            paying:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','确认订单');
        this.getDetail();
    },
    //手动判断是否缓存页面
    beforeRouteLeave(to, from, next) {
        if(this.alive){
            to.meta.from = 'ordersave';
            from.meta.keepAlive = true;
            next();
        }else if(to.name=='orderdetail'){
            next();
        }else{
            this.$dialog.confirm({
                title: '提示',
                message: '确认退出该页面？'
            }).then(()=>{
                to.meta.from = '';
                from.meta.keepAlive = false;
                next();
            });
        }
    },
    activated() {
        this.getMemory()
    },
    methods:{
        //获取商品详情
        getDetail(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    this.order.good = {
                        id:23,
                        url:'./tempimg/0detail01.jpg',
                        name:'蜀道香 休闲零食 金针菇蜀道香 休闲零食 金针菇针菇蜀道香 休闲零食 金针菇',
                        sub:'原味（200g*24家庭装）',
                        price:23.45
                    }
                    this.order.num = 1;
                    this.count()
                }
            });
        },
        //更改地址
        changeAdr(){
            this.alive = true;
            this.$router.push('/mine/address')
        },
        //读取缓存地址发票
        getMemory(){
            if(localStorage.getItem('addressItem')){
                this.order.address = JSON.parse(localStorage.getItem('addressItem'));
                localStorage.removeItem('addressItem');
            }
            if(localStorage.getItem('invoiceItem')){
                this.order.invoice = JSON.parse(localStorage.getItem('invoiceItem'));
                localStorage.removeItem('invoiceItem');
            }

            this.alive = false;
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
                                {id:1,money:5,name:'满100减5',time_start:1568044800000,time_end:1570636800000,choose:false},
                                {id:2,money:3,name:'满80减3',time_start:1568044800000,time_end:1570636800000,choose:false}
                            ]
                            setTimeout(()=>{
                                this.pop_coupon.loaded = true;
                                this.pop_coupon.list = list;
                            },500)
                        }
                    });
                    
                }
                this.pop_coupon.show = true;
            }
        },
        //选择优惠券
        getCoupon(item){
            if(this.order.coupon.id){
                this.order.coupon.choose = false;
            }
            item.choose = true;
            this.order.coupon = item;

            this.pop_coupon.show = false;

            this.count()
        },
        //选择发票
        invoice(){
            this.alive = true;
            this.$router.push('/mine/invoicelist')
        },
        // 计算价格
        count(){
            this.order.total = Math.floor(this.order.good.price*100*this.order.num - (this.order.coupon.id?this.order.coupon.money:0)*100 + 4*100)/100
        },
        numchange(){
            this.count()
        },
        //支付
        gopay(){
            if(this.paying) return;
            if(!this.order.address.id){
                this.$toast.fail('请选择收货地址');
                return;
            }
            this.paying = true;

            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    setTimeout(()=>{
                        this.$router.push('/order/detail')
                    },1000)
                }
            }).catch(()=>{
                this.$toast.fail('支付失败');
                this.paying = false;
            });
        }
    }
}
</script>

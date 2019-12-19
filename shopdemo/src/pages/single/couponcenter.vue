<template>
    <div class="pages">
        <div class="cplist">
            <div class="item" v-for="item in list" v-bind:key="item.id">
                <div class="item-l">
                    <div class="item-lt"><span class="item-lu">¥</span>{{item.money}}</div>
                    <div class="item-ru">{{item.rule}}</div>
                </div>
                <div class="item-r">
                    <div class="item-rt ellipsis">{{item.title}}</div>
                    <p class="item-tp">{{item.sub}}</p>
                    <p class="item-rb">{{item.time_start|timeFormat('y-m-d')}}&ensp;至&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                    
                    <p class="item-rang" @click="popshow=true">查看适用范围&ensp;<van-icon class="item-arr" name="arrow" /></p>
                    <p :class="['item-btn',{'disable':item.receive}]" @click="getreceive(item)" >{{item.receive?'已领取':'领取'}}</p>
                </div>
            </div>
            <p class="cp-end" v-show="list.length>0">没有更多优惠券了!</p>
        </div>
        <div class="emp" v-show="list.length==0">
            <img src="~@/assets/images/empty.png" class="emp-img" />
            <p class="emp-tx">暂无优惠券</p>
        </div>

        <router-link class="botline" to="/mine/couponlist">查看我的优惠券</router-link>


        <van-popup v-model="popshow" class="pop-rule">
            <div class="til">优惠券适用范围</div>
            <div class="tul">
                <p class="tsub">规则说明</p>
                <p class="tli"><span class="tado">适用人群：</span>全部人群</p>
                <p class="tli"><span class="tado">领券规则：</span>一人单日限领2张</p>
                <p class="tli"><span class="tado">适用商品：</span>特殊商品可用</p>
                <p class="tli"><span class="tado">适用人群：</span>全部人群</p>
                <p class="tli"><span class="tado">适用地区：</span>所有地区</p>
            </div>
            <van-icon class="close" name="cross" @click="popshow=false" />
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-bottom: .5rem;}
    .cplist{ padding: .14rem .14rem 0;}
    .item{ margin-bottom: .1rem; height: 1.2rem; background: #fff; border-radius: .08rem; box-shadow: 0 0 .06rem rgba(0,0,0,.1); overflow: hidden;}
    .item.disable{color: #999; border-color:#999;}
    .itop{ position: relative; height: .92rem;}
    .item-l{ float: left; height: 1.2rem; width: 1.04rem; padding-top: .28rem; text-align: center; background: @base; color: #fff;}
    .item-lt{ width: 1rem;font-size: .34rem; line-height: .4rem;}
    .item-lu{ font-size: .2rem; line-height: .3rem;}
    .item-ru{ font-size: .14rem; }
    .item-r{ position: relative; float: right; padding: .12rem .1rem 0 0; width: 2.28rem; height: 1.2rem;}
    .item-rt{ line-height: .18rem; color: #333; }
    .item-tp{font-size: .11rem; color: #666; line-height: .2rem;}
    .item-rb{ font-size: .11rem; color: #999;}
    .item-rang{ position: absolute; left: 0; bottom: .1rem; font-size: .12rem; color: @base;}
    .item-arr{ vertical-align: middle;}
    .item-btn{ position: absolute; right: .14rem; bottom: .1rem; width: .6rem; text-align: center; font-size: .14rem; color: #fff; background: @base; border-radius: .12rem; line-height: .22rem;} 
    .item-btn.disable{ background: #ccc;}
    .emp{ padding-top: .5rem; text-align: center; font-size: .18rem; color: #888;}
    .emp-img{ display: block; width: .94rem; margin: 0 auto .2rem;}
    .cp-end{ padding: .1rem 0; text-align: center; color: #999; font-size: .12rem;}
    .botline{ position: fixed; left: 0; bottom: 0; right: 0; z-index: 5; line-height: .48rem; background: #fff; border-top: 1px solid #eee; text-align: center;}
    .pop-rule{
        width: 80%; border-radius: .1rem;
        .til{ line-height: .54rem; text-align: center; border-bottom: 1px solid #eee; font-size: .15rem;}
        .tul{ padding: .2rem;}
        .tsub{ font-weight: bold; padding-bottom: .03rem;}
        .tli{ line-height: .28rem;}
        .tado{ color: #999;}
        .close{ position: absolute; right: .1rem; color: #999; font-size: .16rem; line-height: .3rem; top: .12rem;}
    }
</style>
<script>
import { Popup,Icon } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Icon.name]:Icon
    },
    data(){
        return {
            popshow:false,
            list:[],
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','领券中心');

        this.getList()
    },
    methods:{
        getList(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,receive:false,money:50,rule:'满199可用',title:'30元摩飞榨汁机专享券30元摩飞榨汁机专享券',sub:"仅限新用户专享商品使用",time_start:1564848000000,time_end:1571370725296},
                        {id:2,receive:false,money:40,rule:'满199可用',title:'30元摩飞榨汁机专享券',sub:"仅限新用户专享商品使用",time_start:1564848000000,time_end:1571070725296},
                        {id:3,receive:false,money:99,rule:'满199可用',title:'30元摩飞榨汁机专享券',sub:"仅限新用户专享商品使用",time_start:1564848000000,time_end:1570770725296},
                        {id:4,receive:false,money:10,rule:'满199可用',title:'30元摩飞榨汁机专享券',sub:"仅限新用户专享商品使用",time_start:1564848000000,time_end:1570470725296},
                    ]
                    setTimeout(()=>{
                        this.list = list;
                    },1000)
                }
            });
        },
        //领取优惠券
        getreceive(item){
            if(this.locked||item.receive) return;
            this.locked = true;
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    this.$toast.success('领取成功');
                    item.receive = true;
                }
                this.locked = false;
            }).catch(()=>{
                this.locked = false;
            });
        }
    }
}
</script>

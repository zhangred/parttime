<template>
    <div class="pages">
        <div class="topbox">
            <div class="good">
                <van-image fit="cover" class="gimg" :src="detail.good.img"/>
                <div class="gtop">
                    <p class="gtil"><span class="gmem">拼团</span>{{detail.good.title}}</p>
                    <p class="gtp">{{detail.good.unit}}</p>
                </div>
                <div class="gpri">
                    <span class="gprice"><span class="gpnu">￥</span>{{detail.good.price}}</span>
                    <span class="gpold">￥{{detail.good.pirce_old}}</span>    
                </div>
            </div>
            <p class="tip"><img src="~@/assets/images/wenhao.png" class="tip-io" />拼团规则：邀请{{detail.total}}人参团，人数不足自动退款</p>
        </div>

        

        <!-- 未成团 -->
        <div class="box">
            <p class="btil">拼团剩余时间</p>
            <div class="btime"><span class="btls">10</span>:<span class="btls">10</span>:<span class="btls">10</span></div>
            <div class="bmember">
                <div class="bmls" v-for="item in detail.member" v-bind:key="item.id"><van-image fit="cover" class="bmls-img" :src="item.head"/></div>
                <div class="bmadd"></div>
            </div>
            <p class="bmbtn">查看全部团员</p>
            <p class="bmtp">还差<span class="bmst">{{detail.total - detail.member.length}}</span>人，即可拼团成功</p>

            <div class="bobtns">
                <p class="bobtn bobtna">邀请好友参加</p>
                <router-link to="/order/ass/detail" class="bobtn">查看订单详情</router-link>
            </div>
        </div>

        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .topbox{
        padding:.2rem .2rem 0;  background: url(~@/assets/images/bg07.png) no-repeat center top #fff;background-size: 100% 1.2rem;
    }
    .good{
        position: relative; height: 1.3rem;  background: #fff; padding: .1rem .1rem .1rem 1.3rem; border-radius: .08rem; box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
        .gimg{ position: absolute; left: .1rem;top: .1rem; height: 1.1rem; width: 1.1rem;}
        .gtop{ height: .85rem;}
        .gtil{ font-size: .13rem; line-height: .18rem;}
        .gmem{ padding:0 .03rem; margin-right: .04rem; font-size: .1rem; color: #ff7021; border:1px solid #ff7021; border-radius: .03rem;}
        .gtp{font-size: .12rem; color: #999;}
        .gprice{ color: #ff7021; font-size: .16rem;}
        .gpnu{ font-size: .12rem;}
        .gpold{ margin-left: .1rem; font-size: .1rem; color: #999; text-decoration: line-through;}
    }
    
    .tip{
        line-height: .5rem; color: #999;
        .tip-io{ position: relative; margin-right: .02rem; top: -.01rem; height: .14rem; vertical-align: middle;}
    }
    .box{ 
        padding-top: .15rem; background: #fff; margin-top: .1rem;
        .btil{ background: url(~@/assets/images/bg08.png) no-repeat center center; background-size: 2.05rem .07rem; text-align: center; color: #ff7021;}
        .btime{ padding: .1rem 0 .2rem; text-align: center; color: #ff7021;}
        .btls{ display: inline-block; height: .24rem; width: .24rem; margin: 0 .08rem; border-radius: .03rem; background: #ff7021; color: #fff; text-align: center;}
        .bmember{ text-align: center;}
        .bmls{ position: relative; display: inline-block; height: .6rem; width: .6rem; margin: 0 .05rem;}
        .bmls-img{height: .6rem; width: .6rem; border-radius: 50%; overflow: hidden; border:1px solid #ff7021;}
        .bmls:nth-child(1):after{ content: "团长"; position: absolute; left: 50%; bottom: 0; margin-left: -.15rem; display: block; width: .3rem; text-align: center; background: #ff7021; border-radius: .07rem; color: #fff; font-size: .1rem; line-height: .14rem;}
        .bmadd{ display: inline-block; height: .6rem; width: .6rem; margin: 0 .05rem; background: url(~@/assets/images/bg09.png); background-size: 100% 100%;}
        .bmbtn{ width: 1rem; margin: .1rem auto 0; border: 1px solid #ff7021; border-radius: .14rem; font-size: .12rem; text-align: center; color: #ff7021; line-height: .2rem;}
        .bmtp{ padding: .2rem 0 .1rem; text-align:center;}
        .bmst{ color: #ff7021;}
        .bobtns{ padding: 0 .2rem .3rem; text-align: center;}
        .bobtn{ display: block; margin-bottom: .1rem; line-height: .4rem; border-radius: .2rem; color: #ff7021; border:1px solid #ff7021;}
        .bobtna{ background: #ff7021; color: #fff;}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}
        .xxxx{}.xxxx{}
        .xxxx{}
    }
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
</style>
<script>
import { Popup,Image } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Image.name]:Image
    },
    data(){
        return {
            popshow:false,
            detail:{good:{},member:[],total:0}
        }
    },
    created(){
        this.Ob.$emit('changetitle','拼团详情');

        this.getDetail();
    },
    methods:{
        //获取拼团详情
        getDetail(){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let detail = {
                        good:{
                            img:'/tempimg/0banner01.jpg',
                            title:'蜀道香 休闲零食 金针菇蜀道香 休闲零食 金针菇',
                            unit:'原味（200g*24家庭装）',
                            price:12.4,
                            pirce_old:45.00,
                        },
                        member:[
                            {id:1,name:'张**man',head:'/tempimg/head.jpg',time:new Date('2019/10/25 12:34:55')},
                            {id:2,name:'Cary**c',head:'/tempimg/head01.jpg',time:new Date('2019/10/26 11:30:55')}
                        ],
                        total:3,
                        end_time:3600
                    };
                    this.detail = detail;
                }
            });
        }
    }
}
</script>

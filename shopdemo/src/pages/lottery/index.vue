<template>
    <div class="pages">
        <div class="pan">
            <div class="zhuan">
                <img src="~@/assets/images/lettory_pan.png" class="zhuan" :style="'transform:rotate('+deg+'deg)'" />
                <img src="~@/assets/images/lettory_po.png" class="po" @click="getLottery" />
            </div>
            <div class="times">恭喜您获得<span class="tnm">{{times}}</span>次抽奖机会</div>
        </div>

        <div class="winer">
            <router-link to="/lottery/mine" class="wbtn">查看我的奖品&gt;</router-link>
            <div class="wbox">
                <div class="wlist">
                    <div class="witem" v-for="item in wlist" v-bind:key="item.id">
                        <p class="witem-l">{{item.phone}}</p>
                        <p class="witem-m">{{item.prize}}</p>
                        <p class="witem-r">{{item.time|timeFormat('y-m-d')}}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="bot">
            <p class="btil">活动规则</p>
            <div class="bul">
                <div class="bli">1. 抽奖时间：每日8:00-10:00进行；</div>
                <div class="bli">2. 每日最多抽奖机会不大于5次；</div>
                <div class="bli">3.每完成一项任务，即将获得一次抽奖机会； </div>
                <div class="bli">4. 活动的所有解释权归商家所有。</div>
            </div>
        </div>

        <!-- 未中奖 -->
        <div :class="{'cm-pop':true,'cm-pop-active':pop_state.show}">
            <p class="cm-pop-bg" @click="pop_state.show=false"></p>
            <div class="cm-pop-cont cm-pop-mid-cont pop-noprize" v-show="pop_state.type==1">
                <img class="cm-pop-close"  @click="pop_state.show=false" src="~@/assets/images/close.png" />
                <img class="face-cry" src="~@/assets/images/face.png" />
                <p class="tip">很遗憾，您未中奖！</p>
                <p class="btn" @click="pop_state.show=false">再抽一次</p>
            </div>
            <div class="cm-pop-cont cm-pop-mid-cont pop-getprize" v-show="pop_state.type==2">
                <img class="cm-pop-close"  @click="pop_state.show=false" src="~@/assets/images/close.png" />
                <img class="ptil" src="~@/assets/images/lottery_img01.png" />
                <p class="pname">{{pop_state.data.name}}</p>
                <div class="ptp alic"><span class="ptr"><span class="ptp-tx">想要获得更多奖品?</span><span class="ptp-bg"></span></span></div>
                <div class="pul">
                    <p class="pli">1.将活动分享给好友，邀请他一起来抽奖；</p>
                    <p class="pli">2.您获得1次抽奖机会。</p>
                </div>
                <div class="pbtns">
                    <p class="pbtn">分享微信朋友</p>
                    <p class="pbtn pbtna">分享朋友圈</p>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .pan{ height: 6rem; padding-top: 1.54rem; background: url(~@/assets/images/lettory_bg.jpg) no-repeat; background-size: 100% 100%;}
    .zhuan{ position: relative; height: 3.39rem; width: 3.39rem; margin: 0 auto; overflow: hidden;}
    .zhuan{ display: block; height: 3.39rem; width: 3.39rem; transition: all 4s; -webkit-transition: all 4s cubic-bezier(0.42,0,0,1); transform: rotate(0)}
    .po{ position: absolute; left: 1.065rem; top: .775rem; width: 1.26rem; height: 1.55rem; }
    .winer{ padding: .2rem 0; background: #fff;}
    .wbtn{ display: block; width: 1.3rem; margin: 0 auto; border-radius: .16rem; border: 1px solid #f96d30; color: #f96d30; text-align: center; line-height: .28rem; font-size: .14rem;}
    .wbox{ height: 1.53rem; margin-top: .1rem; padding-top: .46rem; background: url(~@/assets/images/lettory_bg02.png); background-size: 100% 100%;}
    .wlist{ width: 3.1rem; height: .9rem; margin: 0 auto; overflow-y: scroll; -webkit-overflow-scrolling: touch;}
    .witem{ overflow: hidden; line-height: .26rem; font-size: .12rem;}
    .witem-l{ float: left; width: 24%;}
    .witem-m{ float: left; width: 51%;}
    .witem-r{ float: left; width: 24%;}
    .bot{ padding: .5rem 0 .4rem; background: url(~@/assets/images/lettory_bg01.png) no-repeat left top #ff7021; background-size: 100% .35rem; color: #fff;}
    .btil{ font-size: .18rem; text-align: center;}
    .bul{ padding:.14rem .3rem 0;}
    .times{ padding-top: .2rem; text-align: center; font-size: .18rem; color: #fff; line-height: .3rem;}
    .tnm{ padding: 0 .1rem; font-size: .24rem; color: #fffd01;}
    .pop-noprize{ text-align: center; padding: .3rem 0 .3rem;}
    .pop-noprize .face-cry{ display: block; width: .82rem; margin: 0 auto;}
    .pop-noprize .tip{ padding: .1rem 0 .2rem; }
    .pop-noprize .btn{ width: .8rem; margin: 0 auto; border:1px solid #ff7921; border-radius: .04rem; line-height: .3rem; color: #ff7921; text-align: center;}
    .pop-getprize{ padding: .32rem 0 .3rem;}
    .pop-getprize .ptil{ display: block; width: 2.3rem; margin: 0 auto;}
    .pop-getprize .pname{ padding: .4rem 0; text-align: center; font-size: .32rem; line-height: .48rem; color:#ff7921; }
    .pop-getprize .ptr{ padding: 0 .08rem;}
    .pop-getprize .ptp-tx{ position: relative; z-index: 2; font-size: .15rem;}
    .pop-getprize .ptp-bg{position: absolute; z-index: 1; left: 0; bottom: 0; right: 0; height: .07rem; background: #fee1bf;}
    .pop-getprize .pul{ font-size: .13rem; padding: .1rem .2rem .2rem;}
    .pop-getprize .pbtns{ text-align: center;}
    .pop-getprize .pbtn{ display: inline-block; width: 1rem; margin: 0 .1rem; text-align: center; line-height: .3rem; border-radius: .04rem; border: 1px solid #ff7921; color: #ff7921;}
    .pop-getprize .pbtna{ color: #fff; background: #ff7921;}
</style>
<script>
var locked = false;

import {Toast } from 'vant';
export default {
    components:{
        [Toast.name]:Toast
    },
    data(){
        return {
            wlist:[],
            times:3,
            prizes:{},
            deg:0,
            pop_state:{show:false,type:0,data:{}}
        }
    },
    created(){
        this.Ob.$emit('changetitle','常见问题');

        this.getwlist();

        this.prizes = {
            0:{id:0,name:'谢谢参与',start:5},
            1:{id:1,name:'10元优惠券',start:65},
            2:{id:2,name:'iphone XS',start:125}
        }
    },
    methods:{
        getwlist(){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,phone:'158****3345',prize:'参与抽奖获得50元优惠券',time:1571313356175},
                        {id:2,phone:'158****2345',prize:'参与抽奖获得iPhone XS',time:1571202056175},
                        {id:3,phone:'158****4345',prize:'参与抽奖获得10元优惠券',time:1571192356175},
                        {id:4,phone:'158****6645',prize:'参与抽奖获得100元优惠券',time:1571070356175},
                        {id:5,phone:'158****7745',prize:'参与抽奖获得50元优惠券',time:1571093556175}
                    ]
                    this.wlist = list;
                }
            });
        },
        //抽奖
        getLottery(){
            if(locked){ return}
            if(this.times<=0){
                Toast.fail('您的抽奖次数不足');
                return;
            }
            locked = true;

            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                   this.times --;
                   //随机获奖
                    var id = Math.floor(Math.random()*3);
                    let prize = this.prizes[id];
                    this.deg = (Math.ceil(this.deg/360)*360) + 2160 - (prize.start+50*Math.random())
                    setTimeout(()=>{
                        locked = false;

                        if(id==0){
                            this.pop_state.type = 1;
                        }else{
                            this.pop_state.type = 2;
                            this.pop_state.data = prize;
                        }
                        this.pop_state.show = true;
                    },4000);
                }
            }).catch(()=>{
                locked = false;
            });

        }
    }
}
</script>

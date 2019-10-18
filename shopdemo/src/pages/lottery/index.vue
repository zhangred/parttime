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
        <div :class="{'cm-pop':true,'cm-pop-active':pop_fail_state}">
            <p class="cm-pop-bg" @click="pop_fail_state=false"></p>
            <div class="cm-pop-cont cm-pop-mid-cont pop-noprize">
                <img class="cm-pop-close" src="~@/assets/images/close.png" />
                <img class="face-cry" src="~@/assets/images/face.png" />
                <p class="tip">很遗憾，您未中奖！</p>
                <p class="btn" @click="pop_fail_state=false">再抽一次</p>
            </div>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .pan{ height: 6rem; padding-top: 1.54rem; background: url(~@/assets/images/lettory_bg.jpg) no-repeat; background-size: 100% 100%;}
    .zhuan{ position: relative; height: 3.39rem; width: 3.39rem; margin: 0 auto;}
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
    .pop-noprize .xxxx{}
    .pop-noprize .xxxx{}
    .pop-noprize .xxxx{}
    .pop-noprize .xxxx{}
    .cm-popup .xxxx{}
    .cm-popup .xxxx{}
    .xxx{}
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
            pop_fail_state:false
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
                   
                   //随机获奖
                    var id = Math.floor(Math.random()*3);

                    console.log(id,)
                    let prize = this.prizes[id];
                    this.deg = (Math.ceil(this.deg/360)*360) + 2160 - (prize.start+50*Math.random())
                    setTimeout(()=>{
                        locked = false;
                        this.times --;
                        
                        if(id==0){

                        }else{

                        }
                        this.pop_fail_state = true;

                    },4000);

                }
                
            }).catch(()=>{
                locked = false;
            });

        }
    }
}
</script>

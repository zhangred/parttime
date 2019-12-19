<template>
    <div class="pages">
        <img src="~@/assets/images/bg04.jpg" class="bg" />
        <div class="state" v-show="!signed">
            <p class="sbtn"><img @click="click_sign" src="~@/assets/images/sign01.png" /></p>
        </div>
        <div class="state" v-show="signed">
            <p class="stil"><van-icon name="passed" class="icoa" />签到成功</p>
            <p class="stip">恭喜您获取<span class="stip-in">0.8</span>元红包</p>
        </div>
        <div class="calebox">
            <p class="ctip">再连续签到15天，额外赠送：<span class="ctilin">5元现金红包</span></p>
            <calendar v-on:monthChange="monthChange" v-on:dateClick="dateClick">
                <template v-slot:cell="{data}" >
                    <p class="date">{{data.date}}</p>
                    <p class="sged"><van-icon v-show="hasdate(data.key)" name="checked" class="sico" /></p>
                </template>
            </calendar>
        </div>

        <p class="ps-rule" @click="popshow=true">活动规则</p>

        <van-popup v-model="popshow" closeable class="pop-rule">
            <div class="">
                <p class="ptil">活动规则</p>
                <p class="pstil">活动说明</p>
                <p class="ptx">签到规则：签到初始值0.08元，次日签到递增0.02元，7天一周期连续签到3天，额外赠送0.1元连续签到7天，额外赠送0.2元连续签到15天，额外赠送0.3元，连续签到30天，额外赠送0.4元。</p>
                <p class="pstil">规则匹配</p>
                <p class="ptx">以活动开启时间匹配当前的奖励规则，若规则有更新，已错过的奖励不不发哦</p>
                <p class="ptx">活动开始时间：2019.08.22 12:08:24</p>
                <p class="ptx">活动更新时间：2020.08.22 12:08:24</p>
            </div>
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .bg{ position: absolute; left: 0; top: 0; width: 100%;}
    .state{ position: relative; z-index: 2; height: 1.3rem; text-align: center; color: #fff;}
    .sbtn{ width: .83rem; margin: 0 auto; padding-top: .23rem;}
    .stil{ padding: .3rem 0 .05rem; font-size: .23rem; line-height: .4rem;}
    .icoa{ vertical-align: middle; position: relative; margin: -.02rem .05rem 0 0;}
    .stip{ font-size: .15rem;}
    .calebox{ position: relative; z-index: 2; width: 3.55rem; margin: 0 auto; padding: 0 .1rem .2rem; background: #fff; border-radius: .1rem}
    .stip-in{ font-size: .2rem;}
    .ctip{ text-align: center; padding: .1rem 0;}
    .ctilin{ color: @base;}
    .cm-calendar .date{ height: .26rem; width: .26rem; margin: .05rem auto 0; line-height: .26rem; text-align: center;}
    .cm-calendar .sged{ height: .2rem; padding-top: .02rem; font-size: .12rem; color: #34bf03;}
    .cm-calendar .sico{ display: block; margin: 0 auto;}
    .cm-calendar .today .date{ background: url(~@/assets/images/sign02.png) no-repeat; background-size: 100% 100%; color: #fff;}
    .cm-calendar .disable .sged{ color: #ccc;}
    .ps-rule{ position: absolute; right: 0; top: .2rem; z-index: 3; padding: 0 .08rem 0 .1rem; font-size: .12rem; line-height: .24rem; background: rgba(0,0,0,.2); color: #fff; border-radius: .15rem 0 0 .15rem;}
    .pop-rule{
        width: 2.6rem; border-radius: .1rem; padding-bottom: .2rem;
        .ptil{ font-size: .16rem; padding: .2rem 0; border-bottom: 1px solid #eee; text-align: center;}
        .pstil{ font-size: .14rem; font-weight: bold; padding: .1rem 0 .1rem .14rem;}
        .ptx{ padding: 0 .1rem .1rem .14rem; color: #999; font-size: .12rem; line-height: .2rem;}
    }
</style>
<script>
import { Popup,Icon } from 'vant';
import calendar from '../../components/calendar/index';
export default {
    components:{
        [Popup.name]:Popup,
        [Icon.name]:Icon,
        [calendar.name]:calendar
    },
    data(){
        return {
            popshow:false,
            time:new Date(),
            signData:[],
            signed:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','签到');
        this.getSignData()
    },
    methods:{
        //更改月份
        monthChange(opts){
            this.time = new Date(opts.year,opts.month-1,1)
            this.getSignData()
        },
        //点击日期
        dateClick(opts){
            this.temp = opts;
            // console.log(opts)
        },
        //获取月签到数据
        getSignData(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                   let list = [],
                        month = this.time.getMonth()+1;
                   for(let i=0;i<12;i++){
                       list.push(month+'_'+(Math.ceil(Math.random()*25)+1))
                   }
                   this.signData = list;
                }
            });
        },
        //点击签到按钮
        click_sign(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                   this.$toast.success('签到成功');
                   this.signed = true;
                   var n = new Date();
                   this.signData.push((n.getMonth()+1)+'_'+n.getDate())
                }
            });
        },
        //判断是否已签到
        hasdate(key){
            return this.signData.indexOf(key)>-1?true:false
        }
    }
}
</script>

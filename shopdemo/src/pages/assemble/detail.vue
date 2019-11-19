<template>
    <div class="pages" :style="'min-height:'+minheight+'px'">
        <div class="topbox">
            <router-link to="/assemble/goodDetail" class="good">
                <van-image fit="cover" class="gimg" :src="detail.good.img"/>
                <div class="gtop">
                    <p class="gtil"><span class="gmem">拼团</span>{{detail.good.title}}</p>
                    <p class="gtp">{{detail.good.unit}}</p>
                </div>
                <div class="gpri">
                    <span class="gprice"><span class="gpnu">￥</span>{{detail.good.price}}</span>
                    <span class="gpold">￥{{detail.good.pirce_old}}</span>    
                </div>
            </router-link>
            <p class="tip"><img src="~@/assets/images/wenhao.png" class="tip-io" />拼团规则：邀请{{detail.total}}人参团，人数不足自动退款</p>
        </div>

        

        <!-- 未成团 -->
        <div class="box" v-show="state==1">
            <p class="btil">拼团剩余时间</p>
            <div class="btime"><span class="btls">{{backtime[0]}}</span>:<span class="btls">{{backtime[1]}}</span>:<span class="btls">{{backtime[2]}}</span></div>
            <div class="bmember">
                <div class="bmls" v-for="item in detail.member" v-bind:key="item.id"><van-image fit="cover" class="bmls-img" :src="item.head"/></div>
                <div class="bmadd"></div>
            </div>
            <p class="bmbtn" @click="pop_members=true">查看全部团员</p>
            <p class="bmtp">还差<span class="bmst">{{detail.total - detail.member.length}}</span>人，即可拼团成功</p>

            <div class="bobtns">
                <p class="bobtn bobtna" @click="pop_invi.show=true">邀请好友参加</p>
                <router-link to="/order/ass/detail" class="bobtn">查看订单详情</router-link>
            </div>
        </div>

        <!-- 成团 -->
        <div class="box" v-show="state==2">
            <p class="stil">拼团成功</p>
            <div class="bmember">
                <div class="bmls" v-for="item in detail.member" v-bind:key="item.id"><van-image fit="cover" class="bmls-img" :src="item.head"/></div>
            </div>
            <p class="bmbtn" @click="pop_members=true">查看全部团员</p>
            <br />
            <div class="bobtns">
                <router-link to="/order/ass/detail" class="bobtn bobtna">查看订单详情</router-link>
            </div>
        </div>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">拼团成功</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">拼团未成功</p>
            </div>
        </over-touch>

        <van-popup v-model="pop_members" position="bottom" :style="{ height: '80%' }">
            <div class="pop-member">
                <div class="item" v-for="item in detail.member" v-bind:key="item.id">
                    <van-image fit="cover" class="iimg" :src="item.head"/>
                    <p class="iname">{{item.name}}</p>
                    <p class="itime">{{item.time|timeFormat('y-m-d h:i:s')}}<span class="dn ict">参团</span><span class="dn ikt">开团</span></p>
                </div>
            </div>
        </van-popup>

        <van-action-sheet  v-model="pop_invi.show" :actions="pop_invi.actions" :round="false" @select="doselect" cancel-text="取消" />

        <van-popup v-model="pop_haibao" class="pop-hbbox" :style="{ height: '100%',width:'100%' }">
            <p class="pop-hbbg" @click="pop_haibao=false"></p>
            <div class="pop-haibao"><img :src="haibao" /></div>
            <p class="pop-hbbtn" @click="savehaibao">保存海报</p>
        </van-popup>

    </div>
</template>
<style lang="less"  scoped>
    .pages{ background: #fff;}
    .topbox{
        padding:.2rem .2rem 0;  background: url(~@/assets/images/bg07.png) no-repeat center top #fff;background-size: 100% 1.2rem;
    }
    .good{
        display: block; position: relative; height: 1.3rem;  background: #fff; padding: .1rem .1rem .1rem 1.3rem; border-radius: .08rem; box-shadow: 0 0 4px 0 rgba(0,0,0,.2);
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
        padding-top: .15rem; background: #fff; border-top: .1rem solid #f9f9f9;;
        .btil{ background: url(~@/assets/images/bg08.png) no-repeat center center; background-size: 2.05rem .07rem; text-align: center; color: #ff7021;}
        .btime{ padding: .1rem 0 .2rem; text-align: center; color: #ff7021;}
        .btls{ display: inline-block; height: .24rem; width: .24rem; margin: 0 .08rem; vertical-align: middle; border-radius: .03rem; background: #ff7021; color: #fff; text-align: center;}
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
        .stil{ height: .36rem; margin-bottom: .3rem; line-height: .3rem; text-align: center; color: #fff; background: url(~@/assets/images/bg06.png) no-repeat center center; background-size: 2.33rem .36rem;}
    }
    .pop-member{
        .item{ position: relative; height: .64rem; padding: .1rem .2rem .1rem .74rem; line-height: .2rem; border-bottom: 1px solid #eee; }
        .iimg{ position: absolute; left: .2rem; top: .1rem; height: .44rem; width: .44rem; border-radius: .22rem; overflow: hidden;}
        .iname{ padding-top: .02rem;}
        .itime{ font-size: .13rem; color: #999;}
        .dn{ margin-left: .1rem;}
        .ikt{ display: none;}
        .item:nth-child(1) .ikt{ display: inline; }
        .item:nth-child(1) .ict{ display: none; }
    }
    .otls{ text-align: center; width: .6rem; padding: 1px 0;}
    .otitem{ display: block; margin: .05rem 0; background: rgba(0,0,0,.2); line-height: .2rem; border-radius: .05rem; color: #fff; font-size: .1rem;}
    .ot{ left:auto; right: .1rem; top: 50%;}
    .otitem-ac{ background: rgba(0,0,0,.6);}
    .pop-hbbox{ background: none;}
    .pop-haibao{ position: absolute; left: 50%; top: 46%; z-index: 2; transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%); width: 3.12rem; overflow: hidden; border-radius: .08rem;}
    .pop-hbbtn{ position: absolute; left: 0; bottom: 0; right: 0; z-index: 2; line-height: .48rem; font-size: .16rem; text-align: center; background: #fff;}
    .pop-hbbg{position: absolute; left: 0; bottom: 0; right: 0; top: 0;}
</style>
<script>
import { Popup,Image,ActionSheet } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Image.name]:Image,
        [ActionSheet.name]:ActionSheet
    },
    data(){
        return {
            pop_members:false,
            detail:{good:{},member:[],total:0},
            backtime:[],
            state:1,
            minheight:0,
            pop_invi:{show:false,actions: [
                {id:1, name: '邀请好友参团' },
                {id:2, name: '生成邀请海报' },
            ]},
            pop_haibao:false,
            haibao:"./tempimg/0img01.jpg"
        }
    },
    created(){
        this.Ob.$emit('changetitle','拼团详情');

        this.getDetail();

        this.minheight = window.innerHeight;
    },
    methods:{
        //获取拼团详情
        getDetail(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let detail = {
                        good:{
                            img:'./tempimg/0banner01.jpg',
                            title:'蜀道香 休闲零食 金针菇蜀道香 休闲零食 金针菇',
                            unit:'原味（200g*24家庭装）',
                            price:12.4,
                            pirce_old:45.00,
                        },
                        member:[
                            {id:1,name:'张**man',head:'./tempimg/head.jpg',time:new Date('2019/10/25 12:34:55')},
                            {id:2,name:'Cary**c',head:'./tempimg/head01.jpg',time:new Date('2019/10/26 11:30:55')}
                        ],
                        total:3,
                        end_time:5*3600
                    };
                    this.detail = detail;
                    this.initbacktime();
                }
            });
        },
        //倒计时
        initbacktime(){
            let inter,
                lasttime = this.detail.end_time;
            inter = setInterval(()=>{
                lasttime --;
                var h = Math.floor(lasttime/3600),
                    m = Math.floor(lasttime%3600/60),
                    s = lasttime%60;
                this.backtime = [this.fullTwo(h),this.fullTwo(m),this.fullTwo(s)];

                if(lasttime==0){
                    clearInterval(inter);
                }
            },1000)
        },
        fullTwo(v){
            return v<10?'0'+v:v;
        },
        doselect(v){
            if(v.id==1){
                this.$toast({message:'分享事件'})
            }else{
                this.$toast.loading({
                    message: '海报生成中...',
                    forbidClick: true,
                    mask:true,
                    duration:0
                });
                setTimeout(()=>{
                    this.$toast.clear()
                    this.pop_haibao = true;
                },1500)
            }
        },
        savehaibao(){
            this.$toast.loading({
                message: '海报保存中...',
                forbidClick: true,
                mask:true,
                duration:0
            });
            setTimeout(()=>{
                this.$toast.clear();
                this.$toast.success('保存成功');
            },1500)
        }
    }
}
</script>

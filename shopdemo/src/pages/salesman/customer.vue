<template>
    <div class="pages salecust">
        <div class="topfixed">
            <div :class="'cm-tabbox cm-tabbox'+tabs.list.length">
                <a href="javascript:;" :class="['cmtab',{'active':item.status==tabs.active}]" v-for="item in tabs.list" :key="item.status" @click="changeStatus(item)"><p class="cmtab-in">{{item.name}}</p></a>
            </div>
            <div class="timesp flex">
                <a href="javascript:;" :class="['ts-btn',{'active':item.status==timepart.active}]" v-for="item in timepart.list" :key="item.status" @click="changeTimes(item)">{{item.name}}</a>
                <a href="javascript:;" class="ts-auto flex" @click="pop_time=true">自定义时间<van-icon name="arrow-down" class="ts-arr" /></a>
            </div>
        </div>
        <div class="midfixed" v-show="pop_time">
            <div class="mf-top" @click="pop_time=false"></div>
            <div class="mfinput flex">
                <p :class="['mf-ctrol',{'dis':!params.time_start}]" @click="changeDate(params.time_start,'time_start')"><span v-show="params.time_start">{{params.time_start|timeFormat('y-m-d')}}</span><span v-show="!params.time_start">结束日期</span></p>
                <p class="mf-sp">-</p>
                <p :class="['mf-ctrol',{'dis':!params.time_end}]" @click="changeDate(params.time_end,'time_end')"><span v-show="params.time_end">{{params.time_end|timeFormat('y-m-d')}}</span><span v-show="!params.time_end">结束日期</span></p>
                <p class="mf-ctrol btn" @click="datasure">确定</p>
            </div>
            <p class="mf-bg" @click="pop_time=false"></p>
        </div>

        <div class="listcont" :style="'height:'+(this.wHeight)">
            <div class="cm-empty" v-show="list.length==0&&!loading">
                <img src="~@/assets/images/empty_list.png" class="eimg" />
                <p class="etx">暂无客户数据</p>
            </div>

            <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                :immediate-check="false"
                @load="getlist"
                >
                <div class="list">
                    <router-link to="/salesman/customerDetail" class="item" v-for="item in list" v-bind:key="item.id">
                        <div :class="['i-head',{'active':item.sale}]"><van-image fit="cover" class="i-headi" :src="item.head" /></div>
                        <p class="i-name flex">Dalli-YU<span class="i-wx">微信号</span></p>
                        <p class="i-info">
                            <span class="i-ls">成交额：<span class="i-num">45</span></span>
                            <span class="i-ls">订单数：<span class="i-num">45</span></span>
                        </p>
                        <p class="i-info">
                            <span class="i-ls">最近下单时间：<span class="i-num">无</span></span>
                        </p>
                    </router-link>
                </div>
            </van-list>
        </div>


        <van-popup v-model="pop_date" position="bottom">
            <van-datetime-picker
                v-model="currentDate"
                type="date"
                @confirm="timesure"
                @cancel="timecancel"
            />
        </van-popup>
    </div>
</template>
<style lang="less">
    .salecust{
        .topfixed{ position: fixed; left: 0; top: 0; width: 100%; z-index: 3; background: #fff;}
        .timesp{ height: .46rem; padding: 0 .14rem; background: #f5f5f5; line-height: .46rem; align-items: center;}
        .ts-btn{ margin-right: .08rem; padding: 0 .06rem; border-radius: .1rem; border: 1px solid #ccc; font-size: .12rem; line-height: .18rem; }
        .ts-btn.active{ color: #ff7021; border-color: #ff7021; background: #fff2ed;}
        .ts-auto{ flex-grow: 1; align-items: center; justify-content: flex-end; font-size: .12rem;}
        .ts-arr{ margin-left: .03rem;}
        .midfixed{ position: fixed;left: 0; top: 0; width: 100%; height: 100%; z-index: 4; overflow: hidden;}
        .mf-top{ height: .9rem;}
        .mfinput{background: #fff; padding: .1rem .14rem; align-items: center; justify-content: flex-end;}
        .mf-ctrol{ width: 1rem; line-height: .3rem; border:1px solid #cccc; font-size: .12rem; text-align: center;}
        .mf-ctrol.dis{ color: #999;}
        .mf-ctrol.btn{ width: .5rem; margin-left: .2rem; color: #fff; border-color: #ff7021; background: #ff7021; border-radius: .04rem;}
        .mf-bg{ position: absolute; left: 0; top: 1.4rem; right: 0; bottom: 0; }
        .mf-sp{ color: #999; padding: 0 .1rem;}
        .cm-empty{ padding-top: 1.5rem;}
        .listcont{ -webkit-overflow-scrolling: touch; overflow-y: scroll; }
        .list{ padding: .9rem .14rem 0;}
        .item{ display: block; position: relative; padding: .15rem 0 .15rem .82rem; margin-bottom: .12rem; background: #fff; border-radius: .04rem; box-shadow: 0 0 .03rem rgba(0,0,0,.1)}
        .i-head{ position: absolute; left: .14rem; top: 50%; margin-top: -.27rem; height: .54rem; width: .54rem;}
        .i-head.active:after{ content: "分销员"; display: block; position: absolute; left: 50%; bottom: 0; width: .4rem; height: .14rem; margin-left: -.2rem; background: #ff7021;border-radius: .07rem; text-align: center; font-size: .1rem; color: #fff; line-height: .14rem; }
        .i-headi{height: .54rem; width: .54rem; border-radius: 50%; overflow: hidden;}
        .i-name{ align-items: center;}
        .i-wx{ margin-left: .1rem; padding: 0 .06rem; line-height: .18rem; font-size: .1rem; color: #ff7021; border:1px solid #ff7021; border-radius: .1rem;}
        .i-info{ overflow: hidden; color: #999; font-size: .12rem;}
        .i-ls{ width: 40%; float: left;}
        .i-num{ color: #333;}
    }
</style>
<script>
import { Popup,DatetimePicker,List } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [DatetimePicker.name]:DatetimePicker,
        [List.name]:List,
    },
    data(){
        return {
            pop_date:false,
            tabs:{active:'all',list:[]},
            list:[],
            params:{pageNo:1,pageSize:15,time_start:'',time_end:''},
            loading: true,
            finished: false,
            locked:false,
            wHeight:'auto',
            pop_time:false,
            currentDate:new Date(),
            current_type:'',
            timepart:{active:'all',list:[]},
        }
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = to.name=='salesmanCustomerDetail'?true:false;
        next();
    },
    created(){
        this.Ob.$emit('changetitle','我的客户');

        this.tabs.list = [
            {status:'all',name:'全部客户'},
            {status:'order',name:'下单客户'},
            {status:'valid',name:'有效客户'},
            {status:'invalid',name:'失效客户'}
        ];
        this.timepart.list = [
            {status:'all',name:'全部'},
            {status:'order',name:'今日'},
            {status:'valid',name:'昨日'},
            {status:'invalid',name:'近七天'}
        ];

        this.wHeight = window.innerHeight||window.screen.height;
        this.wHeight = this.wHeight?this.wHeight+'px':'auto';

        this.getlist(true)
    },
    methods:{
        //切换分类
        changeStatus(item){
            if(item.status==this.tabs.active) return;
            this.tabs.active = item.status
            this.getlist(true)
        },
        //展开时间选择
        changeDate(val,type){
            this.currentDate = new Date(val);
            this.current_type = type;
            this.pop_date = true;
        },
        timesure(rs){
            if(this.current_type=='time_start'&&rs.getTime()>this.params.time_end&&this.params.time_end){
                this.$toast.fail('时间不可大于结束日期');
                return;
            }else if(this.current_type=='time_end'&&rs.getTime()<this.params.time_start&&this.params.time_start){
                this.$toast.fail('时间不可小于开始日期');
                return;
            }
            this.params[this.current_type] = rs.getTime();
            this.pop_date = false;
        },
        timecancel(){
            this.pop_date = false;
        },
        datasure(){
            if(!this.params.time_end||!this.params.time_start){
                this.$toast.fail('请选择时间段');
                return;
            }
            this.pop_time = false;
            this.timepart.active = '';
            this.getlist(true)
        },
        //时间段选择
        changeTimes(item){
            if(item.status==this.timepart.active) return;
            this.timepart.active = item.status
            this.getlist(true)
        },
        //获取订单列表
        getlist(first){
            if(first){
                this.list = [];
                this.params.pageNo = 0;
                this.finished = false;
            }
            this.params.pageNo ++
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                //延时处理 模拟请求延时
                this.$tools.delay(500).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        let list = [
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988,sale:true},
                            {id:Math.random()*1000,head:'./tempimg/head.jpg',time:1575455390988,sale:true},
                            {id:Math.random()*1000,head:'./tempimg/head.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988,sale:true},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988},
                            {id:Math.random()*1000,head:'./tempimg/head01.jpg',time:1575455390988}
                        ]
                        //模拟空数据
                        if(this.tabs.active=='order'){
                            list = [];
                        }
                        this.list = this.list.concat(list);
                    }

                    setTimeout(()=>{
                        if(this.list.length<this.params.pageSize){
                            this.finished = true;
                        }
                        this.loading = false
                    },100)
                })
                
            }).catch(()=>{
                this.loading = false;
            });
        },
    }
}
</script>

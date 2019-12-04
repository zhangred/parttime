<template>
    <div class="pages salecust">
        <div class="topfixed">
            <div class="search"><input type="text" class="scctrol" placeholder="商品名称/商品编号" v-on:blur="searchkey($event)" /></div>
            <div :class="'cm-tabbox cm-tabbox'+tabs.list.length">
                <a href="javascript:;" :class="['cmtab',{'active':item.status==tabs.active}]" v-for="item in tabs.list" :key="item.status" @click="changeStatus(item)"><p class="cmtab-in">{{item.name}}</p></a>
            </div>
        </div>

        <div class="listcont">
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

        </van-popup>
    </div>
</template>
<style lang="less">
    .salecust{
        .topfixed{ position: fixed; left: 0; top: 0; width: 100%; z-index: 3; background: #fff;}
        .search{  background: #fff; padding: .05rem .12rem; border-bottom:1px solid #eee;  }
        .scctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        .cm-empty{ padding-top: 1.5rem;}
        .list{ padding: .9rem .14rem 0;}
        .item{ display: block; position: relative; padding: .15rem 0 .15rem .82rem; margin-bottom: .12rem; background: #fff; border-radius: .04rem; box-shadow: 0 0 .03rem rgba(0,0,0,.1)}
        // .i-head{ position: absolute; left: .14rem; top: 50%; margin-top: -.27rem; height: .54rem; width: .54rem;}
        // .i-head.active:after{ content: "分销员"; display: block; position: absolute; left: 50%; bottom: 0; width: .4rem; height: .14rem; margin-left: -.2rem; background: #ff7021;border-radius: .07rem; text-align: center; font-size: .1rem; color: #fff; line-height: .14rem; }
        // .i-headi{height: .54rem; width: .54rem; border-radius: 50%; overflow: hidden;}
        // .i-name{ align-items: center;}
        // .i-wx{ margin-left: .1rem; padding: 0 .06rem; line-height: .18rem; font-size: .1rem; color: #ff7021; border:1px solid #ff7021; border-radius: .1rem;}
        // .i-info{ overflow: hidden; color: #999; font-size: .12rem;}
        // .i-ls{ width: 40%; float: left;}
        // .i-num{ color: #333;}
    }
</style>
<script>
import { Popup,List } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [List.name]:List,
    },
    data(){
        return {
            pop_date:false,
            tabs:{active:'market',list:[]},
            list:[],
            params:{pageNo:1,pageSize:10},
            loading: true,
            finished: false,
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','我对客户');

        this.tabs.list = [
            {status:'market',name:'营销'},
            {status:'fee',name:'佣金'},
            {status:'new',name:'最新'},
            {status:'sell',name:'销售'},
            {status:'price',name:'价格'}
        ];

        this.getlist(true)
    },
    methods:{
        //搜索
        searchkey(event){
            var key = event.currentTarget.value.trim();
            if(key){
                this.loading = true;
                this.getlist(true);
            }
        },
        //切换分类
        changeStatus(item){
            if(item.status==this.tabs.active) return;
            this.tabs.active = item.status
            this.loading = true;
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
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                            {id:Math.random()*1000,time:1575455390988},
                        ]
                        //模拟空数据
                        if(this.tabs.active=='fee'){
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

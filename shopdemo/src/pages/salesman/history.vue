<template>
    <div class="pages psalehistory">
        <div class="cm-empty" v-show="list.length==0&&!loading">
            <img src="~@/assets/images/empty_list.png" class="eimg" />
            <p class="etx">暂无提现记录</p>
        </div>

        <van-list
            v-model="loading"
            :finished="finished"
            finished-text=""
            :immediate-check="false"
            @load="getlist"
            >
            <div class="list">
                <div class="item" v-for="item in list" v-bind:key="item.id">
                    <p class="itop flex"><span>提现</span><span>{{item.money|tofix(2)}}</span></p>
                    <p class="ibot flex">
                        <span>{{item.time|timeFormat('y-m-d h:i:s')}}</span>
                        <span v-if="item.status==1">审核中</span>
                        <span v-if="item.status==2">审核通过</span>
                        <span v-if="item.status==3" class="c" @click="showreason(item)">审核失败，查看原因</span>
                    </p>
                </div>
            </div>
        </van-list>


        <van-popup v-model="popreason" position="bottom" class="popreason">
            <div class="pb-til flex">
                <p class="">提现失败的原因</p>
                <van-icon name="cross" class="pb-close" @click="popreason=false"/>
            </div>
            <div class="pb-cont">{{reason}}</div>
        </van-popup>
    </div>
</template>
<style lang="less">
    .psalehistory{
        padding: .1rem 0;
        .list{ background: #fff;}
        .item{ padding: .1rem .14rem; border-bottom: 1px solid #eee;}
        .item:nth-last-child(1){ border-bottom: none;}
        .itop{ justify-content: space-between; font-size: .16rem;}
        .ibot{ justify-content: space-between; font-size: .13rem; color: #999;}
        .pb-til{ justify-content: space-between; padding: 0 .14rem; line-height: .44rem; border-bottom: 1px solid #eee;}
        .pb-close{ line-height: .44rem;}
        .pb-cont{ min-height: 3rem; padding: .1rem .14rem;}
        .xxx{}
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
            popreason:false,
            list:[],
            params:{pageNo:1,pageSize:20},
            loading: true,
            finished: false,
            reason:''
        }
    },
    created(){
        this.Ob.$emit('changetitle','提现记录');

        this.getlist(true)
    },
    methods:{
        showContent(item){
            
        },
        //提现列表
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
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:2,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:3,time:1575455390988,money:123.4,reason:'银行卡信息有误，导致打款失败。请您重新提交提现申请。'},
                            {id:Math.random()*1000,status:2,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:2,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:3,time:1575455390988,money:123.4,reason:'账户余额不足，银行卡异常'},
                            {id:Math.random()*1000,status:2,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                            {id:Math.random()*1000,status:1,time:1575455390988,money:123.4},
                        ]
                        //模拟空数据
                        // list = [];


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
        //提现失败原因
        showreason(item){
            this.reason = item.reason;
            this.popreason = true;
        }
    }
}
</script>

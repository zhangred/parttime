<template>
    <div class="pages">
        <div class="item" v-for="item in list" v-bind:key="item.id">
            <div class="item-l">
                <p class="item-lt"><span class="item-ltn">¥</span>{{item.money}}</p>
                <p class="item-lru">{{item.rule}}</p>
            </div>
            <div class="item-r">
                <p class="item-rt">{{item.title}}</p>
                <p class="item-rb">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-top: .2rem;}
    .item{ width: 3.47rem; height: .91rem; margin: 0 auto .05rem; padding: .03rem .03rem 0 .03rem; background: url(~@/assets/images/lettory_quan.png); background-size: 100% 100%;}
    .item-l{float: left; width: 1rem; padding-top: .1rem;  font-size: .12rem; color: #777; text-align: center;}
    .item-lt{ color: #ff7921; font-size: .24rem; line-height: .36rem;}
    .item-ltn{ font-size: .15rem; line-height: .24rem;}
    .item-r{ float: right; width: 2.1rem; font-size: .12rem; color: #999;}
    .item-rt{ padding:.1rem 0 0; color: #222; font-size: .16rem; line-height: .36rem;}
</style>
<script>
export default {
    data(){
        return {
            list:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','我的奖品');
        this.getlist();
    },
    methods:{
        getlist(item){
            this.$http.post("http://card.biaotu.net/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,phone:'158****3345',money:50,rule:'满199可用',title:'满199减50优惠券',time_start:1564848000000,time_end:1571370725296},
                        {id:2,phone:'158****3345',money:40,rule:'满199可用',title:'满199减100优惠券',time_start:1564848000000,time_end:1571070725296},
                        {id:3,phone:'158****3345',money:99,rule:'满199可用',title:'满减优惠券',time_start:1564848000000,time_end:1570770725296},
                        {id:4,phone:'158****3345',money:10,rule:'满199可用',title:'满减优惠券',time_start:1564848000000,time_end:1570470725296},
                    ]
                    this.list = list;
                }
            });
        }
    }
}
</script>

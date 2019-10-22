<template>
    <div class="pages">
        <div class="sline">
            <div class="sitem" v-for="item in types" v-bind:key="item.type" @click="changetype(item)"><span :class="{'skin':true,'active':type_ac==item.type}">{{item.name}}</span></div>
        </div>
        <div class="cplist">
            <div class="item" v-for="item in list" v-bind:key="item.id">
                <div class="itop">
                    <div class="item-l">
                        <div class="item-lt"><span class="item-lu">¥</span>{{item.money}}</div>
                        <div class="item-ru">{{item.rule}}</div>
                    </div>
                    <div class="item-r">
                        <div class="item-rt"><span class="item-rtb">立减券</span>{{item.title}}</div>
                        <p class="item-rb">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                        <p class="item-tp">部分商品可用</p>
                    </div>
                </div>
                <router-link class="item-link" to="/category/list">去使用</router-link>
            </div>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .sline{ position: relative; height: .4rem; background: #fff; text-align: center; }
    .sitem{ float: left; width: 33.3%; line-height: .4rem; font-size: .13rem; font-weight: bold;}
    .skin{ display: inline-block; height: .4rem;}
    .skin.active{ color: #ff7021; border-bottom: 2px solid #ff7021;}
    .cplist{}
    .item{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
</style>
<script>
export default {
    data(){
        return {
            types:[{type:'new',name:'可使用'},{type:'used',name:'已使用'},{type:'pass',name:'已过期'}],
            type_ac:'new',
            list:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','我的优惠券');

        this.getList()
    },
    methods:{
        changetype(item){
            this.type_ac = item.type;
            this.getList();
        },
        getList(){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,type:0,money:50,rule:'满199可用',title:'满199减50优惠券',time_start:1564848000000,time_end:1571370725296},
                        {id:2,type:0,money:40,rule:'满199可用',title:'满199减100优惠券',time_start:1564848000000,time_end:1571070725296},
                        {id:3,type:1,money:99,rule:'满199可用',title:'满减优惠券',time_start:1564848000000,time_end:1570770725296},
                        {id:4,type:2,money:10,rule:'满199可用',title:'满减优惠券',time_start:1564848000000,time_end:1570470725296},
                    ]
                    this.list = list;
                }
            });
        }
    }
}
</script>

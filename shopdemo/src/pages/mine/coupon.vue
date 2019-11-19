<template>
    <div class="pages">
        <div class="sline">
            <div class="sitem" v-for="item in types" v-bind:key="item.type" @click="changetype(item)"><span :class="{'skin':true,'active':type_ac==item.type}">{{item.name}}</span></div>
        </div>
        <div class="cplist">
            <div :class="['item',{'disable':item.type==1||item.type==2}]" v-for="item in list" v-bind:key="item.id">
                <div class="itop">
                    <div class="item-l">
                        <div class="item-lt"><span class="item-lu">¥</span>{{item.money}}</div>
                        <div class="item-ru">{{item.rule}}</div>
                    </div>
                    <div class="item-r">
                        <div class="item-rt"><span class="item-rtb">立减券</span><span class="item-til">{{item.title}}</span></div>
                        <p class="item-rb">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                        <p class="item-tp">部分商品可用</p>
                    </div>
                    <img v-if="item.type==1" src="~@/assets/images/coupon_pass.png" class="item-biao" />
                    <img v-if="item.type==2" src="~@/assets/images/coupon_pass.png" class="item-biao" />
                </div>
                <router-link v-if="item.type==0" class="item-link" to="/category/list">去使用</router-link>
            </div>
        </div>
        <div class="emp" v-show="list.length==0">
            <img src="~@/assets/images/empty.png" class="emp-img" />
            <p class="emp-tx">暂无优惠券</p>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .sline{ position: relative; height: .4rem; background: #fff; text-align: center; }
    .sitem{ float: left; width: 33.3%; line-height: .4rem; font-size: .13rem; font-weight: bold;}
    .skin{ display: inline-block; height: .4rem;}
    .skin.active{ color: #ff7021; border-bottom: 2px solid #ff7021;}
    .cplist{ padding: .15rem; }
    .item{ margin-bottom: .1rem; background: #fff; border-radius: .08rem; color:#ff7021; border-color: #ff7021;}
    .item.disable{color: #999; border-color:#999;}
    .itop{ position: relative; height: .92rem;}
    .item-l{ float: left; padding-top: .15rem; text-align: center;}
    .item-lt{ width: 1rem;font-size: .3rem; line-height: .4rem;}
    .item-lu{ font-size: .14rem; line-height: .3rem;}
    .item-ru{ font-size: .12rem; }
    .item-r{ float: right; padding-top: .14rem; width: 2.4rem;}
    .item-rt{ font-size: .15rem;}
    .item-til{ color: #333;}
    .item-rtb{ font-size: .12rem; border-style: solid; border-width: 1px; border-radius: .03rem; padding: 0 .05rem; margin-right: .08rem;}
    .item-rb{ font-size: .12rem; color: #999;}
    .item-tp{font-size: .12rem; color: #666; line-height: .2rem;}
    .item-link{ display: block; line-height: .4rem; color: #ff7021; text-align: center; border-top: 1px dashed #eee;}
    .item-biao{ position: absolute;right: 0; bottom: 0; width: .54rem;}
    .emp{ padding-top: .3rem; text-align: center; font-size: .18rem; color: #888;}
    .emp-img{ display: block; width: .94rem; margin: 0 auto .2rem;}
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
            this.$http.get("./api/callback.json", {
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
                    setTimeout(()=>{
                        this.list = list;
                    },1000)
                    
                }
            });
        }
    }
}
</script>

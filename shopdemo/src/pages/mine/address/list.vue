<template>
    <div class="pages pmadrlist">
        <!-- 没有地址 -->
        <div class="emp" v-show="state==2">
            <img class="img" src="~@/assets/images/address.png" />
            你还没有添加收货地址！
        </div>

        <div class="list" v-show="state==1">
            <div class="item" v-for="item in list" :key="item.id" @click="choose(item)">
                <p class="itil">{{item.name}}&ensp;&ensp;{{item.tel}}</p>
                <p class="iadr"><span v-show="item.isdef" class="idef gb-c gb-bdc gb-bgc2">默认</span>{{item.address}}</p>
                <router-link to="/mine/address/edit" class="ieidt flex flex-center gb-c">编辑</router-link>
            </div>
        </div>
        <router-link to="/mine/address/edti" class="botline gb-bgc">新增地址</router-link>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">有地址</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">无地址</p>
            </div>
        </over-touch>
    </div>
</template>
<style lang="less">
    .pmadrlist{ 
        padding-bottom: .6rem;
        .botline{ position: fixed;left: 0;bottom: 0;right: 0; z-index: 3; background: @base; font-size: .15rem; line-height: .5rem; text-align: center; color: #fff;}
        .emp{
            padding-top: 1.2rem; text-align: center; font-size: .16rem; color: #999;
            .img{ display: block; margin: 0 auto .26rem; width: .7rem; }
        }
        .item{ position: relative; padding: .1rem .64rem .1rem .14rem;background: #fff; margin-bottom: 1px;}
        .iadr{ padding: .1rem 0 .04rem; line-height: .18rem; color: #888;}
        .ieidt{ position: absolute; right: 0; top: 0; height: 100%; width: .6rem; color: @base;}
        .idef{ padding: 0 .04rem; border-radius: .03rem; margin-right: .03rem; border:1px solid @base; background: #fde7d6; font-size: .12rem; color: @base;}
    }
</style>
<script>
import { AddressList } from 'vant';
export default {
    components:{
        [AddressList.name]:AddressList
    },
    data(){
        return {
            from:'',
            list:[],
            state:1,
        }
    },
    created(){
        this.Ob.$emit('changetitle','收货地址');
        setTimeout(()=>{
            this.getlist();
        },1000)
        this.from = this.$route.meta.from||'';
    },
    methods:{
        getlist(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let list = [
                        {id:1,isdef:true,name:'小张',tel:'158****2323',address:'浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',},
                        {id:2,name:'小杨',tel:'158****2323',address:'浙江省杭州市拱墅区莫干山路 50 号',}
                    ]
                    this.list = list;
                }
            });
        },
        choose(item){
            localStorage.setItem('addressItem',JSON.stringify(item));
            this.$router.back();
        }
    }
}
</script>

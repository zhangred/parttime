<template>
    <div class="invoicelist">
        <!-- 没有地址 -->
        <div class="emp" v-show="state==2">
            <van-icon name="coupon" class="eico" />
            你还没有添加发票信息！
        </div>

        <div class="list" v-show="state==1">
            <div class="item" v-for="item in list" :key="item.id">
                <p class="itil"  @click="choose(item)">{{item.name}}</p>
                <p class="ibtns alir">
                    <van-button class="ibtn" size="small" v-if="item.isdef">默认</van-button>
                    <van-button class="ibtn" url="/mine/invoice/edit" size="small">编辑</van-button>
                </p>
            </div>
        </div>
        <router-link to="/mine/invoice/edit" class="botline gb-bgc">新增抬头</router-link>

        <over-touch class="ot" :margin="10">
            <div class="otls">
                <p :class="['otitem',{'otitem-ac':state==1}]" @click="state=1">有发票</p>
                <p :class="['otitem',{'otitem-ac':state==2}]" @click="state=2">无发票</p>
            </div>
        </over-touch>
       
    </div>
</template>
<style lang="less">
    .invoicelist{
        padding-bottom: .6rem;
        .emp{
            padding-top: 1rem; text-align: center; font-size: .16rem; color: #999;
            .eico{ display: block; margin: 0 auto .26rem; font-size: .48rem; }
        }
        .botline{ position: fixed;left: 0;bottom: 0;right: 0; z-index: 3; background: @base; font-size: .15rem; line-height: .5rem; text-align: center; color: #fff;}
        .list{ padding: .2rem .14rem;}
        .item{ margin-bottom: .1rem; background: #fff; border-radius: .04rem; overflow: hidden;}
        .itil{ padding-left: .14rem; font-size: .16rem; line-height: .6rem; border-bottom: 1px solid #f6f6f6;}
        .ibtns{ padding: .05rem .14rem;}
        .ibtn{ margin-left: .1rem;}
    }
    
</style>
<script>
import { Icon,Button } from 'vant';
export default {
    components:{
        [Icon.name]:Icon,
        [Button.name]:Button,
    },
    data(){
        return {
            popshow:false,
            from:'',
            list:[],
            state:1,
        }
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = this.alive?true:false;
        next();
    },
    created(){
        this.Ob.$emit('changetitle','我的发票');
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
                        {id:1,isdef:true,name:'公司发票抬头名称01'},
                        {id:2,isdef:false,name:'个人发票名称'},
                        {id:3,isdef:false,name:'公司发票抬头名称03'}
                    ]
                    this.list = list;
                }
            });
        },
        choose(item){
            localStorage.setItem('invoiceItem',JSON.stringify(item));
            this.$router.back();
        }
    }
}
</script>

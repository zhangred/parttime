<template>
    <div class="pages">

        <!-- 没有地址 -->
        <div class="emp">
            <img class="img" src="~@/assets/images/address.png" />
            你还没有添加收货地址！
        </div>

        <router-link to="/mine/address/edti" class="botline">新增地址</router-link>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-bottom: .6rem;}
    .botline{ position: fixed;left: 0;bottom: 0;right: 0; z-index: 3; background: #ff7021; font-size: .15rem; line-height: .5rem; text-align: center; color: #fff;}
    .emp{
        padding-top: 1.2rem; text-align: center; font-size: .16rem; color: #999;
        .img{ display: block; margin: 0 auto .26rem; width: .7rem; }
    }
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
            list:[]
        }
    },
    created(){
        this.Ob.$emit('changetitle','收货地址');
    },
    methods:{
        showContent(item){
            
        }
    }
}
</script>

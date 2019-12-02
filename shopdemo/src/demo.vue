<template>
    <div class="pages">
        sdfs
        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less">
    .xxx{
        .xxx{  position: fixed; left: 0; top: 0; z-index: 3; width: 100%; background: #fff; padding: .05rem .12rem;  }
        .xxx{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        .xxx{}
        .xxx{}
        .xxx{}
        .xxx{}
        .xxx{}
        .xxx{}
        .xxx{}
        .xxx{}
    }
</style>
<script>
import { Popup } from 'vant';
export default {
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            popshow:false
        }
    },
    beforeRouteLeave(to, from, next) {
        from.meta.keepAlive = this.alive?true:false;
        next();
    },
    activated() {
        
    },
    deactivated() {
        // 不显示
        console.log(2);
    },
    created(){
        this.Ob.$emit('changetitle','常见问题');
    },
    methods:{
        showContent(item){
            
        }
    }
}
</script>

<template>
    <div class="pages">
        sdfs
        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
    .xxx{}
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
    created(){
        this.Ob.$emit('changetitle','拼团详情');
    },
    methods:{
        showContent(item){
            
        }
    }
}
</script>

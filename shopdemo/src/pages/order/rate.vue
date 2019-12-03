<template>
    <div class="pages morate">
        <div class="bgcfff">
            <div class="title flex">
                <img src="~@/assets/images/rate.jpg" class="til-ico"/>
                描述相符
                <van-rate v-model="describe" class="start" />
                {{values[describe]}}
            </div>
            <textarea class="textarea" v-model="message" placeholder="宝贝满足你的期待吗？说出你的想法"></textarea>
            <div class="pimgs">
                <p class="pimg" v-for="(item,index) in imgs" :key="item">
                    <a href="javascript:;" class="pdel flex" @click="deleteimg(index)"><van-icon name="delete" /></a>
                    <van-image fit="cover" @click="seeImg(index)" class="pimg-i" :src="item" />
                </p>
                <a href="javascript:;" class="padd"><input type="file" multiple class="pfile" accept="image/*" @change="getImage" ref="head" />上传凭证<br />最多3张</a>
            </div>
            <div class="anon flex flex-between">
                <van-checkbox v-model="anonymous">匿名</van-checkbox>
                <p class="atp">您的评价将以匿名的形式展现</p>
            </div>
        </div>
        <div class="shop">
            
        </div>
        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less">
    .morate{
        padding: .1rem 0 .2rem;
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
import { Rate,Checkbox } from 'vant';
export default {
    components:{
        [Rate.name]:Rate,
        [Checkbox.name]:Checkbox
    },
    data(){
        return {
            values:{'1':'很好','2':'很好','3':'很好','4':'很好','5':'很好'},
            popshow:false,
            describe:0,
            logs:0,
            service:0,
            message:'',
            anonymous:false,
            imgs:[]
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
        this.Ob.$emit('changetitle','发表评价');
    },
    methods:{
        showContent(item){
            
        }
    }
}
</script>

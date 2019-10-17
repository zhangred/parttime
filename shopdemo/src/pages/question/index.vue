<template>
    <div class="pages">
        <div class="title">猜你想问</div>
        <div class="list bgcfff">
            <div class="item" v-for="item in list" v-bind:key="item.id" @click="showContent(item)">{{item.title}}</div>
        </div>

        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
            <div class="pop-til">{{pop.title}}</div>
            <div class="pop-cont">{{pop.content}}</div>
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .title{ padding: 0 .14rem; font-size: .16rem; font-weight: bold; line-height: .52rem; background: #fff; border-bottom: 1px solid #f0f1f3;}
    .item{ padding: .1rem .14rem; font-size: .16rem; border-bottom: 1px solid #f0f1f3; line-height: .24rem;}
    .pop-til{ padding: 12px 50px 12px 14px; line-height:24px; font-size:16px; border-bottom: 1px solid #f0f1f3; }
    .pop-cont{ padding: 14px;}
</style>
<script>
import { Popup } from 'vant';
export default {
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            list:[],
            popshow:false,
            pop:{}
        }
    },
    created(){
        this.Ob.$emit('changetitle','常见问题');

        let list = [
            {id:1,title:'这是标题内容01',content:'01这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:2,title:'这是标题内容02这是标题内容02这是标题内容02这是标题内容02',content:'02这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:3,title:'这是标题内容03',content:'03这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:4,title:'这是标题内容04这是标题内容04这是标题内容04',content:'04这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:5,title:'这是标题内容05',content:'05这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:6,title:'这是标题内容06',content:'06这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'}
        ]
        this.list = list;
    },
    methods:{
        showContent(item){
            this.pop.title = item.title;
            this.pop.content = item.content;
            this.popshow = true;
        }
    }
}
</script>

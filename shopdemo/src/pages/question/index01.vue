<template>
    <div class="pages">
        <div class="title">猜你想问</div>
        <div class="list bgcfff">
            <div class="item" v-for="item in list" v-bind:key="item.id" @click="toggleopen(item)">
                <div class="item-til">{{item.title}}<i :class="['icon cm-ani iconfont iconfont-arr01d',{'active gb-c':item.open}]"></i></div>
                <div class="cm-sliderbox" v-sliderbox="{show:item.open}"><div class="item-cont">{{item.content}}</div></div>
            </div>
        </div>
    </div>
</template>
<style lang="less"  scoped>
    .title{ padding: 0 .14rem; font-size: .16rem; font-weight: bold; line-height: .52rem; background: #fff; border-bottom: 1px solid #f0f1f3;}
    .item{ font-size: .16rem; border-bottom: 1px solid #f0f1f3; line-height: .24rem;}
    .item-til{ position: relative; padding: .1rem .3rem .1rem .14rem;}
    .item-cont{ padding: .1rem .1rem .1rem .14rem; background: #f8f8f8; font-size: .12rem; line-height: .2rem; }
    .icon{ position: absolute; right: .14rem; top: 50%; line-height: .2rem; margin-top: -.1rem;}
    .icon.active{ transform: rotateX(180deg); -webkit-transform: rotateX(180deg);}
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
            {id:1,open:false,title:'这是标题内容01',content:'01这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:2,open:false,title:'这是标题内容02这是标题内容02这是标题内容02这是标题内容02',content:'02这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:3,open:false,title:'这是标题内容03',content:'03这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:4,open:false,title:'这是标题内容04这是标题内容04这是标题内容04',content:'04这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:5,open:false,title:'这是标题内容05',content:'05这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'},
            {id:6,open:false,title:'这是标题内容06',content:'06这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，这是简介内容，'}
        ]
        this.list = list;
    },
    methods:{
        toggleopen(item){
            for(var i=0;i<this.list.length;i++){
                if(item.id==this.list[i].id){
                    item.open=!item.open
                }else if(this.list[i].open){
                    this.list[i].open = false
                }
            }
            
        }
    }
}
</script>

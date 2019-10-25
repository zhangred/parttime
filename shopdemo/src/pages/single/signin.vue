<template>
    <div class="pages">
        asdfasdf
        <calendar :time="new Date('2018/4/4')" >
            <template v-slot:cell="{data}" >{{data.date}}</template>
            <!-- sdfasdfasdfasd -->
        </calendar>



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
import { Popup,Icon } from 'vant';
import calendar from '../../components/calendar/index';

console.log(5,calendar)
export default {
    components:{
        [Popup.name]:Popup,
        [Icon.name]:Icon,
        [calendar.name]:calendar
    },
    data(){
        return {
            popshow:false
        }
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

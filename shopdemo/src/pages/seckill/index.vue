<template>
    <div class="pages">
        <div class="toptab">
            <div :class="['ttab',{'active':tab_ac=='today'}]" @click="changeType('today')">正在疯抢</div>
            <div :class="['ttab',{'active':tab_ac=='tomorrow'}]" @click="changeType('tomorrow')">明日预约(10:00)</div>
        </div>
        <van-list
            class="goodlist"
            v-model="loading"
            :finished="finished"
            finished-text="到底啦～"
            :immediate-check="false"
            @load="getlist"
            >
            <div class="cm-vprolist">
                <router-link to="/seckill/detail" class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                        <p v-if="item.sell<item.total&&tab_ac=='today'" class="pl-btime">距离结束<backtime :lasttime="item.time_end" classname="fr" :tag="item"></backtime></p>
                        <div v-if="item.sell>=item.total&&tab_ac=='today'" class="pl-cover"><p class="pl-cover-tx">抢光</p></div>
                        <div v-if="tab_ac=='tomorrow'" class="pl-btime pl-btimea">距离开始<backtime :lasttime="item.time_end" classname="fr" :tag="item"></backtime></div>
                    </div>
                    <div class="pl-info">
                        <div class="pl-rtop">
                            <p class="pl-title">{{item.title}}</p>
                            <p class="pl-sper" v-if="tab_ac=='today'"><span class="pl-sperin" :style="'width:'+(item.sell*100/item.total)+'%'"></span><span :class="[item.sell/item.total>.5?'fl cff':'fr c','pl-sper-tx']">{{Math.round(item.sell*100/item.total)}}%</span></p>
                        </div>
                        <div class="pl-price"><span class="pl-pun">￥</span><span class="pl-pnum">{{item.price}}</span><span class="pl-oldpri">{{item.oldprice}}</span></div>
                        <p v-if="item.sell<item.total&&tab_ac=='today'" class="pl-btn">立即抢购</p>
                        <p v-if="tab_ac=='tomorrow'" class="pl-btn pl-btna">立即预约</p>
                        <p v-if="item.sell>=item.total&&tab_ac=='today'" class="pl-btn pl-btnb">立即抢购</p>
                    </div>
                </router-link>
            </div>
        </van-list>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ padding-top: .5rem;}
    .toptab{ position: fixed; left: 0; top: 0; right: 0; z-index: 3; background: #fff; line-height: .4rem; overflow: hidden; text-align: center;}
    .ttab{ float: left; width: 50%; color: #333;}
    .ttab.active{ color: #ff7021;}
    .cm-vprolist .pl-btimea{ background: #ff7e21}
</style>
<script>
import { CountDown,List } from 'vant';
export default {
    components:{
        [CountDown.name]:CountDown,
        [List.name]:List
    },
    data(){
        return {
            tab_ac:'today',
            params:{pageNo:1,pageSize:20},
            loading: false,
            finished: false,
            goodlist:[],
            locked:false,
        }
    },
    created(){
        this.Ob.$emit('changetitle','限时秒杀');

        this.getlist(true);
    },
    methods:{
        changeType(val){
            this.tab_ac = val;
            this.getlist(true);
        },
        getlist(first){
            console.log(454)
            if(this.locked) return;
            if(first){
                this.goodlist = [];
                this.params.pageNo = 0;
                this.finished = false;
            }
            this.locked = true;
            this.params.pageNo ++
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    let seckill = [
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:90,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:20,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:100,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:100,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:100,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:600,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:100,total:100},
                         {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:90,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:100,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,sell:100,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,sell:30,total:100},
                        {id:Math.random(),img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,sell:20,total:100},
                        {id:Math.random(),img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,sell:30,total:100},
                    ]
                    this.goodlist = this.goodlist.concat(seckill);

                    setTimeout(()=>{
                        if(this.goodlist.length>40){
                            this.finished = true;
                        }
                        this.loading = false;
                        this.locked = false;
                    },100)
                }
            })
            
        }
    }
}
</script>

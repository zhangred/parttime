<template>
    <div class="pages">
        <van-list
            class="goodlist"
            v-model="loading"
            :finished="finished"
            finished-text="到底啦～"
            :immediate-check="false"
            @load="getlist"
            >
            <div class="cm-prolist">
                <router-link to="/assemble/detail" class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                        <img v-if="item.isnew" src="~@/assets/images/new.png" class="pl-new" />
                        <p class="pl-btime gb-bgc">距结束<backtime :lasttime="item.end_time" classname="fr"></backtime></p>
                    </div>
                    <div class="pl-info">
                        <p class="pl-title"><span class="pl-num gb-c-bdc gb-bgc4">3人团</span>{{item.title}}</p>
                        <p class="pl-price gb-c"><span class="pl-pun ">¥</span>{{item.price}}<span class="pl-oldprice">¥4656</span></p>
                        <p class="pl-btn gb-bgc">立即抢</p>
                    </div>
                </router-link>
            </div>
        </van-list>

    </div>
</template>
<style lang="less"  scoped>
    .cm-prolist{ padding-top: .1rem;}
    .pl-num{ border: 1px solid @base; background: #ffefe5; color: @base; font-size: .1rem; border-radius: .04rem; padding: 0 .02rem;}
    .pl-oldprice{ color: #999; font-size: .1rem; text-decoration: line-through; margin-left: .05rem;}
    .pl-btn{ position: absolute; right: .1rem; bottom: .12rem; border-radius: .1rem; line-height: .2rem; font-size: .1rem; color: #fff; background: @base; padding: 0 .08rem;}
</style>
<script>
import { List } from 'vant';
export default {
    components:{
        [List.name]:List
    },
    data(){
        return {
            params:{type:'all',value:'',pageNo:1,pageSize:20,cateid:''},
            loading: false,
            finished: false,
            goodlist:[],
            locked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','超值拼团');

        this.getlist(true);
    },
    methods:{
        getlist(first){
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
                    //虚拟数据
                    let goodlist = [
                        {id:1+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间称花时间称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:999.99,price_old:1000.00,isnew:true,number:2},
                        {id:2+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+20000,price:999.99,price_old:1000.00,isnew:true,number:3},
                        {id:3+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花称花时间称花时间时间In the mood foe flowers',end_time:new Date().getTime()+10*3600000,price:999.99,price_old:1000.00,number:8},
                        {id:4+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+8*3600000,price:999.99,price_old:1000.00,isnew:true,number:20},
                        {id:5+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称称花时间称花时间花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:999.99,price_old:1000.00,number:2},
                        {id:6+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:999.99,price_old:1000.00,number:2},
                        {id:7+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称称花时间称花时间花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:999.99,price_old:1000.00,isnew:true,number:2},
                        {id:8+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:9+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:10+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,isnew:true,number:2},
                        {id:11+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:12+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:13+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:14+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:15+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:16+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:17+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:18+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:19+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2},
                        {id:20+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',end_time:new Date().getTime()+12*3600000,price:19.99,price_old:1000.00,number:2}
                    ]

                    goodlist.map((item)=>{
                        item.end_time =  Math.ceil((item.end_time - new Date().getTime())/1000)
                    })
                    this.goodlist = this.goodlist.concat(goodlist);
                    
                    setTimeout(()=>{
                        if(this.goodlist.length>40){
                            this.finished = true;
                        }
                        this.loading = false;
                        this.locked = false;
                    },100)
                }
            });
        }
    }
}
</script>

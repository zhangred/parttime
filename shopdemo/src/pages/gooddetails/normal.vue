<template>
    <div class="pages">

        <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in detail.banner" v-bind:key="item"><van-image fit="cover" class="banner_img" :src="item" /></van-swipe-item>
        </van-swipe>



        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less"  scoped>
    .banner,.banner_img{ height: 3rem; }
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
import { Popup,Swipe, SwipeItem } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem
    },
    data(){
        return {
            popshow:false,
            detail:{
                banner:[]
            }
        }
    },
    created(){
        this.Ob.$emit('changetitle','商品详情');

        this.getDetail();
    },
    methods:{
        //获取商品详情
        getDetail(item){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let banner = [
                        '/tempimg/0detail01.jpg',
                        '/tempimg/0detail02.jpg',
                        '/tempimg/0detail03.jpg'
                    ]
                    this.detail.banner = banner;
                    
                    // //获取优惠券
                    // let couponlist = [
                    //     {id:1,money:50,rule:'满199可用',receive:false},
                    //     {id:2,money:30,rule:'满199可用',receive:true}
                    // ]
                    // this.couponlist = couponlist;
                    
                    // //获取拼团商品
                    // let tuanlist = [
                    //     {id:1,img:'/tempimg/0banner01.jpg',people:2,price:9.99,total:1280},
                    //     {id:2,img:'/tempimg/0banner02.jpg',people:4,price:9.99,total:180},
                    //     {id:3,img:'/tempimg/0banner03.jpg',people:2,price:9.99,total:123},
                    //     {id:4,img:'/tempimg/0banner03.jpg',people:6,price:9.99,total:280},
                    //     {id:5,img:'/tempimg/0banner02.jpg',people:2,price:9.99,total:1280},
                    //     {id:6,img:'/tempimg/0banner01.jpg',people:2,price:9.99,total:1280},
                    //     {id:7,img:'/tempimg/0banner02.jpg',people:2,price:9.99,total:1280},
                    //     {id:8,img:'/tempimg/0banner03.jpg',people:1,price:9.99,total:1280},
                    //     {id:9,img:'/tempimg/0banner01.jpg',people:2,price:9.99,total:1280}
                    // ]
                    // this.tuan.loop = Math.ceil(tuanlist.length/3);
                    // this.tuan.list = tuanlist;

                    // //获取商品列表
                    // let goodlist = [
                    //     {id:1,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                    //     {id:2,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                    //     {id:3,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false},
                    //     {id:4,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,isnew:false}
                    // ]
                    // this.goodlist = goodlist;

                    // //秒杀商品列表
                    // let seckill = [
                    //     {id:1,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers名称花时间In the mood foe flowers',price:19.99,oldprice:29.99,time_end:12*3600,type:1,rate:100},
                    //     {id:2,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:59.99,time_end:11*3600,type:2,rate:90},
                    //     {id:3,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:79.99,time_end:10*3600,type:3,rate:95}
                    // ]
                    // this.seckill = seckill;
                }
            });
        }
    }
}
</script>

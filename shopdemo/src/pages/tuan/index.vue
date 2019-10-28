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
                <router-link to="/category/detail" class="tl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="tl-imgo">
                        <van-image fit="cover" class="tl-img" :src="item.img" />
                    </div>
                    <div class="tl-info">
                        <p class="tl-title">{{item.title}}</p>
                        <p class="tl-price"><span class="tl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </van-list>

    </div>
</template>
<style lang="less"  scoped>
    .cm-prolist{ padding-top: .1rem;}
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
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let goodlist = [
                        {id:1+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:2+this.params.pageNo*100,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:3+this.params.pageNo*100,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:4+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:5+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:6+this.params.pageNo*100,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:7+this.params.pageNo*100,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:8+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:9+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:10+this.params.pageNo*100,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:11+this.params.pageNo*100,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:12+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:13+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:14+this.params.pageNo*100,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:15+this.params.pageNo*100,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:16+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:17+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:18+this.params.pageNo*100,img:'/tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:19+this.params.pageNo*100,img:'/tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:20+this.params.pageNo*100,img:'/tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99}
                    ]
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

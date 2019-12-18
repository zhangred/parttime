<template>
    <div class="pages pcatelist">
        <div class="ftop">
            <div class="sline">
                <div class="sitem" @click="changecateid('')"><span  :class="{'skin':true,'active gb-c gb-bdc':params.cateid==''}">全部</span></div>
                <div class="sitem" v-for="item in pop_cate.list" v-bind:key="item.id" @click="changecateid(item.id)"><span :class="{'skin':true,'active gb-c gb-bdc':params.cateid==item.id}">{{item.name}}</span></div>
            </div>
            <div class="tabout">
                <div class="tabline">
                    <div :class="{'tab':true,'active gb-c':params.type=='all'}" @click="changetab('all')">综合排名</div>
                    <div :class="{'tab alic':true,'active gb-c':params.type=='sell'}" @click="changetab('sell')">销量</div>
                    <div :class="{'tab alir':true,'active gb-c':params.type=='price'}" @click="changetab('price')">价格<orderico :order="params.value"></orderico></div>
                </div>
                <div class="tplist" @click="list_df=!list_df">
                    <i v-show="list_df" class="iconfont iconfont-lista"></i>
                    <i v-show="!list_df" class="iconfont iconfont-listb"></i>
                </div>
            </div>
        </div>
        <van-list
            class="goodlist"
            v-model="loading"
            :finished="finished"
            finished-text="到底啦～"
            :immediate-check="false"
            @load="getlist"
            >
            <div :class="[{'cm-prolist':list_df,'cm-vprolist':!list_df}]">
                <router-link to="/category/detail" class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <div class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                    </div>
                    <div class="pl-info">
                        <div class="pl-rtop">
                            <p class="pl-title">{{item.title}}</p>
                            <p class="pl-rate gb-c-bdc">100%好评率</p>
                        </div>
                        <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price}}</p>
                    </div>
                </router-link>
            </div>
        </van-list>

    </div>
</template>
<style lang="less">
    .pcatelist{
        padding-top: .8rem;
        .ftop{
            position: fixed; left: 0; top: 0; width: 100%; background: #fff; z-index: 3;
            .sline{ position: relative; height: .4rem; border-bottom: 1px solid #eee; white-space: nowrap; overflow-y: hidden; overflow-x: scroll; -webkit-overflow-scrolling: touch;}
            .cate-ico{ position: absolute; left: 0; top: 0; height: .48rem; width: .5rem; background: url(~@/assets/images/cate.png) no-repeat .15rem center; background-size:.2rem .275rem; }
            .tabline{ height: .4rem; overflow: hidden; padding: 0 .15rem; line-height: .4rem;}
            .tab{ float: left; width: 33.3%; font-size: .13rem;}
            .tab.active{ color: #ff7021;}
            .sitem{ display: inline-block; padding: 0 .15rem; line-height: .4rem; font-size: .13rem; font-weight: bold;}
            .skin{ display: block; height: .4rem;}
            .skin.active{ color: #ff7021; border-bottom: 2px solid #ff7021;}
            .tabout{ position:relative; padding-right:.5rem;}
            .tplist{ position:absolute; right:0; top:0; width:.5rem; text-align:center; line-height:.4rem; font-size:.2rem;}
        }
        .cm-prolist,.cm-vprolist{ padding-top: .1rem;}
        .pl-rate{ display:none;}
        .cm-vprolist .pl-rate{ display:block;}
        .pop-cate{
            width: 1.3rem; background: #f2f2f2; height: 100%;
            .item{ padding-left: .15rem; line-height: .52rem;}
            .item.active{ background: #fff; color: #ff7021;}
        }
    }  
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
            locked:false,
            pop_cate:{show:false,list:[],cur:''},
            list_df:true
        }
    },
    created(){
        this.Ob.$emit('changetitle','分类列表');

        this.getlist(true);
        this.getcatelist()
    },
    methods:{
        searchkey(event){
            var key = event.currentTarget.value.trim();
            if(key){
                this.$router.push('/category/list?key='+key)
            }
        },
        //修改排序
        changetab(type){
            this.params.type = type;
            if(type=='price'){
                if(this.params.value==''){
                    this.params.value = 'desc'
                }else if(this.params.value=='desc'){
                    this.params.value = 'asc'
                }else{
                    this.params.value = ''
                }
            }
            this.getlist(true);
        },
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
                        {id:1+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:2+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:3+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:4+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:5+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:6+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:7+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:8+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:9+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:10+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:11+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:12+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:13+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:14+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:15+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:16+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:17+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:18+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:19+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99},
                        {id:20+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99}
                    ]
                    this.goodlist = this.goodlist.concat(goodlist);
                    
                    setTimeout(()=>{
                        if(this.goodlist.length>30){
                            this.finished = true;
                        }
                        this.loading = false;
                        this.locked = false;
                    },100)
                }
            });
        },
        //获取分类
        getcatelist(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let cate = [
                        {id:1,name:'数码电器'},
                        {id:2,name:'内搭服饰'},
                        {id:3,name:'家居生活'},
                        {id:4,name:'时令蔬菜'},
                        {id:6,name:'潮流靴鞋'},
                        {id:7,name:'精品美妆'},
                        {id:8,name:'床上用品'}
                    ];
                    this.pop_cate.list = cate;
                }
            });
        },
        changecateid(id){
            this.pop_cate.show = false;
            this.params.cateid = id;
            this.getlist(true);
        }
    }
}
</script>

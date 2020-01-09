<template>
    <div class="pages pcategory01">
        <div class="ftop">
            <div class="sline">
                <p class="cate-ico" @click="pop_cate.show=true"></p>
                <div class="search"><input type="text" class="ctrol" placeholder="搜索您感兴趣的内容" v-on:blur="searchkey($event)" /></div>
                <div class="tplist" @click="list_df=!list_df">
                    <i v-show="list_df" class="iconfont iconfont-lista"></i>
                    <i v-show="!list_df" class="iconfont iconfont-listb"></i>
                </div>
            </div>
            <div class="tabline">
                <div :class="{'tab':true,'active gb-c':params.type=='all'}" @click="changetab('all')">综合排名</div>
                <div :class="{'tab alic':true,'active gb-c':params.type=='sell'}" @click="changetab('sell')">销量</div>
                <div :class="{'tab alir':true,'active gb-c':params.type=='price'}" @click="changetab('price')">价格<orderico :order="params.value" :colorhover="gobal.color"></orderico></div>
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
            <div :class="[{'cm-prolist':list_df,'cm-lprolist':!list_df}]">
                <div class="pl-item" v-for="item in goodlist" v-bind:key="item.id">
                    <router-link to="/category/detail" class="pl-imgo">
                        <van-image fit="cover" class="pl-img" :src="item.img" />
                    </router-link>
                    <div class="pl-info">
                        <router-link to="/category/detail" class="pl-rtop">
                            <p class="pl-title">{{item.title}}</p>
                        </router-link>
                        <p class="pl-price gb-c"><span class="pl-pun">¥</span>{{item.price|tofix(2)}}<span class="pl-oldpri">¥{{item.oldprice|tofix(2)}}</span></p>
                        <p class="pl-addcart gb-c" @click="chooseSku(item)"><i class="pl-icart iconfont iconfont-cart-o"></i></p>
                    </div>
                </div>
            </div>
        </van-list>

        <!-- 分类弹层 -->
        <div :class="{'cm-pop':true,'cm-pop-active':pop_cate.show}">
            <p class="cm-pop-bg" @click="pop_cate.show=false"></p>
            <div class="cm-pop-cont cm-pop-left-cont pop-cate">
                <div :class="{'item':true,'active gb-c':params.cateid==''}" @click="changecateid('')">全部</div>
                <div :class="{'item':true,'active gb-c':params.cateid==item.id}" v-for="item in pop_cate.list" v-bind:key="item.id" @click="changecateid(item.id)">{{item.name}}</div>
            </div>
        </div>
        
        <botnav active="cate"></botnav>

        <!-- sku -->
        <van-sku
            v-model="goodSkuShow"
            :sku="goodSku.sku"
            :goods="goodSku.goods"
            :goods-id="goodSku.goodsId"
            :quota="goodSku.quota"
            :hide-stock="goodSku.sku.hide_stock"
            :initial-sku="goodSku.initialSku"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked">
            <template slot="sku-actions" slot-scope="props">
                <div class="van-sku-actions">
                <van-button
                    square
                    size="large"
                    type="warning"
                    class="vbtn gb-bgc3"
                    @click="props.skuEventBus.$emit('sku:addCart')"
                >
                    加入购物车
                </van-button>
                <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
                <van-button
                    square
                    size="large"
                    type="danger"
                    class="vbtn gb-bgc"
                    @click="props.skuEventBus.$emit('sku:buy')"
                >
                    立即购买
                </van-button>
                </div>
            </template>
        </van-sku>

    </div>
</template>
<style lang="less">
    .pcategory01{
        padding-top: .88rem;
        .ftop{
            position: fixed; left: 0; top: 0; width: 100%; background: #fff; z-index: 3;
            .sline{ position: relative; height: .48rem; padding-left: .5rem; padding-right: .38rem; border-bottom: 1px solid #eee;}
            .cate-ico{ position: absolute; left: 0; top: 0; height: .48rem; width: .5rem; background: url(~@/assets/images/cate.png) no-repeat .15rem center; background-size:.2rem .275rem; }
            .tabline{ height: .4rem; overflow: hidden; padding: 0 .15rem; line-height: .4rem;}
            .tab{ float: left; width: 33.3%; font-size: .13rem;}
            .tab.active{ color: @base;}
        }
        .search{
            background: #fff; padding: .05rem .12rem;
            .ctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        }
        .tplist{ position:absolute; right:0; top:0; width:.5rem; text-align:center; line-height:.4rem; font-size:.2rem;}
        .cm-prolist{ padding-top: .1rem;}
        .pl-addcart{ padding-left: .1rem;}
        .cm-lprolist .pl-addcart{ bottom: .02rem;}
        .pop-cate{
            width: 1.3rem; background: #f2f2f2; height: 100%;
            .item{ padding-left: .15rem; line-height: .52rem;}
            .item.active{ background: #fff; color: @base;}
        }
        .cm-lprolist{ margin-top: .12rem;}
        .vbtn.gb-bgc3{ background: @second}
        .vbtn.gb-bgc{ background: @base;}
    }
</style>
<script>
import { List,Sku } from 'vant';
export default {
    components:{
        [List.name]:List,
        [Sku.name]:Sku
    },
    data(){
        return {
            gobal:this.themes.setting,
            params:{type:'all',value:'',pageNo:1,pageSize:20,cateid:''},
            loading: false,
            finished: false,
            goodlist:[],
            locked:false,
            pop_cate:{show:false,list:[],cur:''},
            list_df:false,
            goodSku:{
                sku:{}
            },
            goodSkuShow:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','分类列表');

        this.getlist(true);
        this.getcatelist()

        setTimeout(() => {
            this.goodSku.show = true
        }, 3000);
    },
    activated() {
        this.$tools.setScrollTop(this.$route.meta.scrollTop||0)
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
                        {id:1+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:15,oldprice:30.00},
                        {id:2+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:18,oldprice:30.00},
                        {id:3+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:129,oldprice:30.00},
                        {id:4+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:5+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:6+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:7+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:8+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:9+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:10+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:11+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:12+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:13+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:14+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:15+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:16+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:17+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:18+this.params.pageNo*100,img:'./tempimg/0banner02.jpg',title:'2热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:19+this.params.pageNo*100,img:'./tempimg/0banner03.jpg',title:'3热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00},
                        {id:20+this.params.pageNo*100,img:'./tempimg/0banner01.jpg',title:'4热卖商品名称花时间In the mood foe flowers',price:19.99,oldprice:30.00}
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
        },
        //选择sku
        chooseSku(item){
            this.$toast.loading('商品请求中···')
            this.$http.get("./api/sku.json", {
                params: 'params'
            }).then((res) => {
               //延时处理 模拟请求延时
                this.$tools.delay(500).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        this.goodSku = rs.data;
                        this.goodSkuShow = true
                    }
                    this.$toast.clear();
                })
            });
        },
        //立即购买
        onBuyClicked(rs){
            console.log(rs)
            this.rs = rs;
            this.goodSkuShow = false;
            this.$router.push('/category/ordersave')
        },
        //加入购物车
        onAddCartClicked(rs){
            console.log(rs)
            this.rs = rs;
            this.goodSkuShow = false;
            this.$toast.success('成功加入购物车');
        }
    }
}
</script>

<template>
    <div class="pages pgdetailnm">

        <van-swipe class="banner" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="item in detail.banner" v-bind:key="item"><van-image fit="cover" class="banner_img" :src="item" /></van-swipe-item>
        </van-swipe>
        <div class="topinfo">
            <div class="dpice"><span class="ti-un">¥</span><span class="ti-pri">{{detail.price}}</span><span class="ti-oldp">价格<span class="ti-oldpri">{{detail.oldprice}}</span></span></div>
            <div class="ti-til">{{detail.title}}</div>
            <div class="ti-tips">
                <p class="ti-tip">快递：免运费</p><p class="ti-tip">月销量{{detail.sales}}笔</p><p class="ti-tip">{{detail.from}}</p>
            </div>
        </div>
        <div class="editlinebox editlinebox-sm">
            <div class="editline editline-cover editline-select" @click="showpop('coupon')">
                <p class="el-ado">优惠</p>
                <div class="el-text l"><p>满199减100</p><p>满199减100，部分地区包邮</p></div>
            </div>
        </div>
        <div class="editlinebox editlinebox-sm">
            <div class="editline editline-cover editline-select" @click="showpop('canshu')">
                <p class="el-ado">参数</p>
                <div class="el-text l">生产日期，品牌···</div>
            </div>
        </div>

        <div class="dcontent" v-html="detail.content"></div>

        <div class="botline">
            <div :class="{'bl-ls':true,'active':detail.collect}" @click="changeCollect">
                <p class="bl-lsico"><van-icon class="ico" v-show="!detail.collect" name="like-o" /><van-icon class="ico" v-show="detail.collect" name="like" /></p>
                <p class="bl-lstx">{{detail.collect?'已收藏':'收藏'}}</p>
            </div>
            <router-link to="/cart" class="bl-ls">
                <p class="bl-lsico"><van-icon class="ico" name="shopping-cart-o" /></p>
                <p class="bl-lstx">购物车</p>
            </router-link>
            <p class="bl-btn bl-btna gb-bgc3" @click="goodSku.show=true">加入购物车</p>
            <p class="bl-btn bl-btnb gb-bgc" @click="goodSku.show=true">立即购买</p>
        </div>


        <!-- 优惠券 -->
        <van-popup v-model="pop_coupon.show" closeable position="bottom">
            <p class="poptil">优惠券</p>
            <p class="pop-loading" v-show="!pop_coupon.loaded">正在加载···</p>
            <div class="cp-list" v-show="pop_coupon.loaded">
                <div class="cp-citem" v-for="item in pop_coupon.list" v-bind:key="item.id">
                    <div class="cp-cimon gb-c"><span class="cp-ciun">¥</span>{{item.money}}</div>
                    <div class="cp-info flex">
                        <p class="cp-nm">{{item.name}}</p>
                        <p class="cp-time">{{item.time_start|timeFormat('y-m-d')}}&ensp;-&ensp;{{item.time_end|timeFormat('y-m-d')}}</p>
                    </div>
                    <div class="cp-rig flex"><p :class="{'cp-btn':true,'disable':item.receive,'gb-bgc':!item.receive}" @click="getCoupon(item)">{{item.receive?'已领取':'领取'}}</p></div>
                </div>
            </div>
        </van-popup>

        <!-- 参数 -->
        <van-popup v-model="pop_canshu" closeable position="bottom">
            <p class="poptil">产品参数</p>
            <div class="editlinebox editlinebox-sm editlinebox-bl0">
                <div class="editline">
                    <p class="el-ado">品牌</p>
                    <div class="el-text l">华为荣耀</div>
                </div>
                <div class="editline">
                    <p class="el-ado">版本</p>
                    <div class="el-text l">12.4</div>
                </div>
                <div class="editline">
                    <p class="el-ado">产地</p>
                    <div class="el-text l">中国广州东莞</div>
                </div>
                <div class="editline">
                    <p class="el-ado">企业</p>
                    <div class="el-text l">中国华为有限技术公司</div>
                </div>
            </div>
            <br />
        </van-popup>

        <!-- sku -->
        <van-sku
            v-model="goodSku.show"
            :sku="goodSku.sku"
            :goods="goodSku.goods"
            :goods-id="goodSku.goodsId"
            :quota="goodSku.quota"
            :hide-stock="goodSku.sku.hide_stock"
            :initial-sku="goodSku.initialSku"
            @buy-clicked="onBuyClicked"
            @add-cart="onAddCartClicked"
        />

    </div>
</template>
<style lang="less">
    .pgdetailnm{
        padding-bottom: .6rem;
        .banner,.banner_img{ height: 3rem; }
        .topinfo{
            background: #fff; padding: .1rem .14rem;
            .dpice{ line-height: .4rem;}
            .ti-un{ color: #f33b3b; font-size: .18rem;}
            .ti-pri{ color: #f33b3b; font-size: .24rem;}
            .ti-oldp{ margin-left: .2rem; font-size: .12rem; color: #666;}
            .ti-oldpri{ font-size: .12rem; color: #666; text-decoration: line-through;}
            .ti-til{ padding: .05rem 0 .15rem; line-height: .2rem; font-size: .15rem;}
            .ti-tips{display: flex; display: -webkit-flex; justify-content: space-between; font-size: .12rem; color: #666;}
        }
        .dcontent{ margin-top: .1rem;}
        .botline{
            position: fixed; left: 0; bottom: 0; right: 0; z-index: 3; display: flex; display: -webkit-flex; border-top: 1px solid #eee; background: #fff;
            .bl-ls{ padding-top: .02rem; width: .725rem; text-align: center;}
            .bl-ls.active{ color: #ff5000;}
            .bl-lsico{ height: .28rem; display: flex; display: -webkit-flex; justify-content: center; align-items: center;}
            .bl-lsico .ico{font-size: .24rem;}
            .bl-lstx{ font-size: .12rem; line-height: .18rem;}
            .bl-btn{ line-height: .5rem; text-align: center; font-size: .15rem; color: #fff; width: 1.15rem;}
            .bl-btna{ background: #fe9c02;}
            .bl-btnb{ background: #ff5000;}
        }
        .poptil{ line-height: 50px; text-align: center; font-size: .16rem;}
        .pop-loading{ padding: .3rem 0; text-align: center; color: #666;}
        .cp-list{
            padding:.2rem .15rem .3rem;
            .cp-citem{display: flex; display: -webkit-flex; padding: .15rem 0; box-shadow: 0 0 3px 0 rgba(0,0,0,.2); margin-bottom: .16rem;}
            .cp-cimon{ width: .9rem; text-align: center; color: @base; font-size: .4rem; line-height: .6rem;}
            .cp-ciun{ font-size: .2rem; line-height: .4rem;}
            .cp-info{ flex-direction: column; width: 1.7rem; align-items: flex-start; justify-content: center; }
            .cp-nm{ font-size: .16rem}
            .cp-time{ font-size: .12rem; color: #999;}
            .cp-rig{ width: .82rem; justify-content: center; align-items: center;}
            .cp-btn{ background: @base; color: #fff; line-height: .3rem; height: .3rem; padding: 0 .15rem; border-radius: .15rem; text-align: center;}
            .cp-btn.disable{ background: #c5c5c5;}
        }
    }
    
</style>
<script>
import { Popup,Swipe, SwipeItem,Icon,Sku } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [Swipe.name]:Swipe,
        [SwipeItem.name]:SwipeItem,
        [Icon.name]:Icon,
        [Sku.name]:Sku
    },
    data(){
        return {
            detail:{
                banner:[],
            },
            pop_coupon:{show:false,loaded:false,list:[]},
            pop_canshu:false,
            goodSku:{
                show:true,
                sku:{}
            }
        }
    },
    created(){
        this.Ob.$emit('changetitle','商品详情');

        this.getDetail();
    },
    methods:{
        //获取商品详情
        getDetail(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let detail = {
                        banner : [
                                './tempimg/0detail01.jpg',
                                './tempimg/0detail02.jpg',
                                './tempimg/0detail03.jpg'
                        ],
                        price:39.99,
                        oldprice:59.99,
                        title:'蜀道香 休闲零食 草莓红薯糍300g蜀道香 休闲零食 草莓红薯糍300g蜀道香 休闲零食 草莓红薯糍300g',
                        sales:8879,
                        from:'广州深圳',
                        coupon:[
                            {id:2,name:'满99包邮'},
                            {id:3,name:'满199包邮减50'}
                        ],
                        content:'<img src="./tempimg/0detail_item01.jpg" /><img src="./tempimg/0detail_item02.jpg" /><img src="./tempimg/0detail_item03.jpg" />',
                        collect:false
                    }

                    this.detail = detail;

                    //sku信息
                    let gsku = {
                        sku: {
                            // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                            // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                            tree: [
                                {
                                    k: '颜色', // skuKeyName：规格类目名称
                                    v: [
                                        {
                                            id: '30349', // skuValueId：规格值 id
                                            name: '红色', // skuValueName：规格值名称
                                            imgUrl: './tempimg/0detail01.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
                                            previewImgUrl: './tempimg/0detail01.jpg', // 用于预览显示的规格类目图片
                                        },
                                        {
                                            id: '1215',
                                            name: '蓝色',
                                            imgUrl: './tempimg/0detail02.jpg',
                                            previewImgUrl: './tempimg/0detail02.jpg',
                                        }
                                    ],
                                    k_s: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                                },
                                {
                                    k: '尺寸', // skuKeyName：规格类目名称
                                    v: [
                                        {
                                            id: '30350', // skuValueId：规格值 id
                                            name: '大号', // skuValueName：规格值名称
                                        },
                                        {
                                            id: '12151',
                                            name: '小号',
                                        }
                                    ],
                                    k_s: 's2' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
                                }
                            ],
                            // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                            list: [
                                {
                                    id: 2259, // skuId，下单时后端需要
                                    price: 5000, // 价格（单位分）
                                    s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                                    s2: '30350', // 规格类目 k_s 为 s2 的对应规格值 id
                                    stock_num: 110 // 当前 sku 组合对应的库存
                                },
                                {
                                    id: 2260, // skuId，下单时后端需要
                                    price: 6000, // 价格（单位分）
                                    s1: '30349', // 规格类目 k_s 为 s1 的对应规格值 id
                                    s2: '12151', // 规格类目 k_s 为 s2 的对应规格值 id
                                    stock_num: 100 // 当前 sku 组合对应的库存
                                },
                                {
                                    id: 2261, // skuId，下单时后端需要
                                    price: 7000, // 价格（单位分）
                                    s1: '1215', // 规格类目 k_s 为 s1 的对应规格值 id
                                    s2: '30350', // 规格类目 k_s 为 s2 的对应规格值 id
                                    stock_num: 110 // 当前 sku 组合对应的库存
                                }
                            ],
                            price: '39.99', // 默认价格（单位元）
                            stock_num: 227, // 商品总库存
                            collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                            none_sku: false, // 是否无规格商品
                            hide_stock: false // 是否隐藏剩余库存
                            },
                            goods: {
                            // 商品标题
                            title: '测试商品',
                            // 默认商品 sku 缩略图
                            picture: './tempimg/0detail01.jpg'
                            },
                            goodsId:'1234567',
                            quota:5,
                            hide_stock:false,
                            initialSku:{}
                    }
                    this.goodSku = gsku;
                }
            });
        },
        //收藏/取消
        changeCollect(){
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    if(this.detail.collect){
                        this.detail.collect = false;
                        this.$toast.success('取消成功');
                    }else{
                        this.detail.collect = true;
                        this.$toast.success('收藏成功');
                    }
                }
            });
        },
        //弹层
        showpop(type){
            if(type=='coupon'){
                if(!this.pop_coupon.loaded){
                    this.$http.get("./api/callback.json", {
                        params: 'params'
                    }).then((res) => {
                        let rs = res.data;
                        if(rs.code==0){
                            //虚拟数据
                            let list = [
                                {id:1,money:50,name:'满100减50',time_start:1568044800000,time_end:1570636800000,receive:false},
                                {id:2,money:30,name:'满80减30',time_start:1568044800000,time_end:1570636800000,receive:true}
                            ]
                            setTimeout(()=>{
                                this.pop_coupon.loaded = true;
                                this.pop_coupon.list = list;
                            },500)
                        }
                    });
                    
                }
                this.pop_coupon.show = true;
            }else if(type=='canshu'){
                this.pop_canshu = true;
            }
        },
        //领取优惠券
        getCoupon(item){
            if(!item.receive){
                this.$http.get("./api/callback.json", {
                    params: 'params'
                }).then((res) => {
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        item.receive = true;
                        this.$toast.success('领取成功');
                    }
                });
            }
        },
        //立即购买
        onBuyClicked(rs){
            // console.log(rs)
            this.rs = rs;
            this.$router.push('/category/ordersave')
        },
        //加入购物车
        onAddCartClicked(rs){
            // console.log(rs)
            this.rs = rs;
            this.goodSku.show = false;
            this.$toast.success('成功加入购物车');
        }
    }
}
</script>

<template>
    <div class="pages salegoodlist">
        <div class="topfixed">
            <div class="search"><input type="text" class="scctrol" placeholder="商品名称/商品编号" v-on:blur="searchkey($event)" /></div>
            <div :class="'cm-tabbox cm-tabbox'+tabs.list.length">
                <a href="javascript:;" :class="['cmtab',{'active':item.status==tabs.active}]" v-for="item in tabs.list" :key="item.status" @click="changeStatus(item)"><p class="cmtab-in">{{item.name}}</p></a>
            </div>
        </div>

        <div class="listcont">
            <div class="cm-empty" v-show="list.length==0&&!loading">
                <img src="~@/assets/images/empty_list.png" class="eimg" />
                <p class="etx">暂无客户数据</p>
            </div>

            <van-list
                v-model="loading"
                :finished="finished"
                finished-text=""
                :immediate-check="false"
                @load="getlist"
                >
                <div class="list">
                    <div class="item" v-for="item in list" v-bind:key="item.id">
                        <router-link to="/category/detail" class="i-link">
                            <van-image fit="cover" class="i-img" :src="item.img" />
                            <p class="i-name">花时间 In the mood foe flowers悦己-樱桃慕斯蛋糕悦己-樱桃慕斯蛋糕悦己-樱桃慕斯蛋糕</p>
                            <p class="i-price"><span class="i-pao">¥</span>88.80</p>
                            <p class="i-tp"><span class="i-gr">佣金比例 3.00%</span>预计可赚￥2.66</p>
                        </router-link>
                        <a href="javascript:;" class="i-btn" @click="showshare">分享</a>
                    </div>
                </div>
            </van-list>
        </div>

        <!-- 分享按钮弹层 -->
        <van-popup v-model="popshare" position="bottom">
            <div class="popshare">
                <a href="javascript:;" class="ps-tab" @click="getcode">
                    <img src="~@/assets/images/group02a.png" class="ps-tabio" />
                    <p class="ps-tabtx">二维码</p>
                </a>
                <a href="javascript:;" class="ps-tab" @click="gethaibao">
                    <img src="~@/assets/images/group02b.png" class="ps-tabio" />
                    <p class="ps-tabtx">生成图片海报</p>
                </a>
                <a href="javascript:;" class="ps-tab" @click="copylink">
                    <img src="~@/assets/images/group02c.png" class="ps-tabio" />
                    <p class="ps-tabtx">复制链接</p>
                </a>
            </div>
            <a href="javascript:;" class="popsbtn" @click="popshare=false">取消</a>
        </van-popup>

        <!-- 二维码 -->
        <van-popup v-model="popcode.show">
            <div class="popcode">
                <p v-show="!popcode.url" class="pc-tx">生成中···</p>
                <img v-show="popcode.url" :src="popcode.url" class="pc-img" />
            </div>
        </van-popup>

        <!-- 二维码 -->
        <van-popup v-model="pophaibao.show" class="pophaibao">
            <div class="bgcfff ph-img" @click="pophaibao.show=false">
                <p v-show="!pophaibao.url" class="ph-tx">生成中···</p>
                <img v-show="pophaibao.url" :src="pophaibao.url" />
            </div>
            <img src="~@/assets/images/download.png" class="ph-tp" @click="pophaibao.show=false" />
        </van-popup>
    </div>
</template>
<style lang="less">
    .salegoodlist{
        .topfixed{ position: fixed; left: 0; top: 0; width: 100%; z-index: 3; background: #fff;}
        .search{  background: #fff; padding: .05rem .12rem; border-bottom:1px solid #eee;  }
        .scctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        .cm-empty{ padding-top: 1.5rem;}
        .list{ padding: .96rem .14rem 0;}
        .item{ display: block; position: relative; height: 1.19rem; padding: .15rem 0 0 1.19rem; margin-bottom: .12rem; background: #fff; border-radius: .04rem;}
        .i-link{ display: block;}
        .i-img{ position: absolute; left: .12rem; top: .112rem; height: .95rem; width: .95rem; overflow: hidden; border-radius: .05rem;}
        .i-name{display: -webkit-box; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden; height: .36rem; line-height: .18rem;}
        .i-price{padding-top: .15rem; color: #ff7021; font-size: .18rem;}
        .i-pao{ margin-right: .03rem; font-size: .14rem;}
        .i-tp{ font-size: .1rem; line-height: .16rem;}
        .i-gr{ color: #74b62d;}
        .i-btn{ position: absolute; right: .12rem; bottom: .3rem; padding: 0 .1rem; background: #ff7021; border-radius: .12rem; font-size: .13rem; color: #fff;}
        .popshare{overflow: hidden; padding: .3rem .2rem .2rem; text-align: center;}
        .ps-tab{ float: left; width: 33.3%; font-size: .12rem; color: #999; line-height: .3rem;}
        .ps-tabio{ display: block; width: .55rem; margin: 0 auto;}
        .popsbtn{ display: block; border-top: .1rem solid #f3f4f5; line-height: .5rem; text-align: center;}
        .popcode{ width: 1.4rem; text-align: center;}
        .pc-tx{ padding: .6rem 0; text-align: center; line-height: .2rem;}
        .pophaibao{ width: 2.9rem;background: none;}
        .ph-tx{padding: 2rem 0; text-align: center; line-height: .2rem;}
        .ph-img{ overflow: hidden; border-radius: .1rem;}
        .ph-tp{ display: block; width: 1.78rem; margin: .2rem auto 0;}
    }
</style>
<script>
import { Popup,List } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [List.name]:List,
    },
    data(){
        return {
            popshare:false,
            tabs:{active:'market',list:[]},
            list:[],
            params:{pageNo:1,pageSize:10},
            loading: true,
            finished: false,
            locked:false,
            popcode:{show:false,url:''},
            pophaibao:{show:false,url:''},
        }
    },
    created(){
        this.Ob.$emit('changetitle','推广商品');

        this.tabs.list = [
            {status:'market',name:'营销'},
            {status:'fee',name:'佣金'},
            {status:'new',name:'最新'},
            {status:'sell',name:'销售'},
            {status:'price',name:'价格'}
        ];

        this.getlist(true)
    },
    methods:{
        //搜索
        searchkey(event){
            var key = event.currentTarget.value.trim();
            if(key){
                this.loading = true;
                this.getlist(true);
            }
        },
        //切换分类
        changeStatus(item){
            if(item.status==this.tabs.active) return;
            this.tabs.active = item.status
            this.loading = true;
            this.getlist(true)
        },
        //获取订单列表
        getlist(first){
            if(first){
                this.list = [];
                this.params.pageNo = 0;
                this.finished = false;
            }
            this.params.pageNo ++
            this.$http.get("./api/callback.json", {
                params: 'params'
            }).then((res) => {
                //延时处理 模拟请求延时
                this.$tools.delay(500).then(()=>{
                    let rs = res.data;
                    if(rs.code==0){
                        //虚拟数据
                        let list = [
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                            {id:Math.random()*1000,img:'./tempimg/0detail01.jpg',time:1575455390988},
                        ]
                        //模拟空数据
                        if(this.tabs.active=='fee'){
                            list = [];
                        }
                        this.list = this.list.concat(list);
                    }

                    setTimeout(()=>{
                        if(this.list.length<this.params.pageSize){
                            this.finished = true;
                        }
                        this.loading = false
                    },100)
                })
                
            }).catch(()=>{
                this.loading = false;
            });
        },
        //打开分享弹层
        showshare(){
            this.popshare = true;
        },
        //复制链接
        copylink(){
            this.$toast.success('链接已复制');
            this.popshare = false;
        },
        //二维码生成
        getcode(){
            this.popshare = false;
            this.popcode.url = '';
            this.popcode.show = true;
            this.$tools.delay(800).then(()=>{
                this.popcode.url = './tempimg/code.png'
            })
        },
        //海报生成
        gethaibao(){
            this.popshare = false;
            this.pophaibao.url = '';
            this.pophaibao.show = true;
            this.$tools.delay(800).then(()=>{
                this.pophaibao.url = './tempimg/haibao.jpg'
            })
        }
    }
}
</script>

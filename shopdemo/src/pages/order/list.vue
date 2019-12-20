<template>
    <div class="morderlist">
        <div class="topfixed">
            <div class="search"><input type="text" class="scctrol" placeholder="商品名称/商品编号/订单号" v-on:blur="searchkey($event)" /></div>
            <div :class="'cm-tabbox cm-tabbox'+tabs.list.length">
                <a href="javascript:;" :class="['cmtab',{'active':item.status==tabs.active}]" v-for="item in tabs.list" :key="item.status" @click="changeStatus(item)"><p :class="['cmtab-in',{'gb-c-bdc':item.status==tabs.active}]" >{{item.name}}</p></a>
            </div>
        </div>
        <div class="listcont">
            <van-list
                v-model="loading"
                :finished="finished"
                finished-text="到底啦～"
                :immediate-check="false"
                @load="getlist"
                >
                <div class="olist">
                    <div class="oitem" v-for="item in list" v-bind:key="item.id">
                        <div class="oitop flex flex-between">
                            <div class="oishop flex flex-center"><van-icon name="shop-collect" class="oisio gb-c" />麦兜旗舰店</div>
                            <div class="oista gb-c">
                                <span v-show="item.status=='ungroup'">待成团</span>
                                <span v-show="item.status=='group'">已成团</span>
                                <span v-show="item.status=='pay'">等待买家付款</span>
                                <span v-show="item.status=='send'">卖家已发货</span>
                                <span v-show="item.status=='receive'">待收货</span>
                                <span v-show="item.status=='comment'">待评价</span>
                                <span v-show="item.status=='done'">已完成</span>
                                <span v-show="item.status=='cancel'">已取消</span>
                            </div>
                        </div>

                        <router-link to="/order/detail" class="oigood">
                            <div class="oiginfo">
                                <van-image fit="cover" class="oigimg" :src="item.good.img" />
                                <p class="oigtil">
                                    <span class="oigtype gb-c-bdc" v-if="item.type=='assenble'">拼购</span>
                                    <span class="oigtype gb-c-bdc" v-if="item.type=='seckill'">秒杀</span>
                                    {{item.good.title}}
                                </p>
                                <p class="oigsub">红色、大号</p>
                            </div>
                            <div class="oigpr">
                                <span class="oignum">共{{item.num}}件商品</span>
                                <span class="oigpay">实付：¥<span class="oigmon">{{item.total|tofix(2)}}</span>（含运费¥{{item.fare||0|tofix(2)}}）</span>
                            </div>
                        </router-link>

                        <!-- 待成团 -->
                        <div class="oibot flex" v-if="item.status=='ungroup'">
                            <p class="oibtx flex flex-center"><van-icon name="clock-o" class="oiclo" />还差{{item.short||0}}人拼团成功，剩余<backtime :lasttime="item.lasttime" short format="h小时m分钟" /></p>
                            <van-button class="oibtn" size="small" round :color="gobal.color" @click="pop_invi.if=true">邀请好友</van-button>
                        </div>
                        <!-- 已成团 -->
                        <div class="oibot flex" v-show="item.status=='group'">
                            <van-button class="oibtn" size="small" round url="/order/logistics" >查看物流</van-button>
                        </div>
                        <!-- 带支付 -->
                        <div class="oibot flex" v-show="item.status=='pay'">
                            <p class="oibtx flex flex-center"><van-icon name="clock-o" class="oiclo" />支付剩余<backtime :lasttime="item.lasttime" short format="m分钟" /></p>
                            <van-button class="oibtn" size="small" round :color="gobal.color" url="/order/detail">去支付</van-button>
                            <van-button class="oibtn" size="small" round @click="orderCancel(item)">取消订单</van-button>
                        </div>
                        <!-- 待发货 -->
                        <div class="oibot flex" v-show="item.status=='send'">
                            <van-button class="oibtn" size="small" round :color="gobal.color" @click="remindsend(item)">提醒店家发货</van-button>
                        </div>
                        <!-- 待收货 -->
                        <div class="oibot flex" v-show="item.status=='receive'">
                            <van-button class="oibtn" size="small" round  @click="delayReceive(item)">延长收货</van-button>
                            <van-button class="oibtn" size="small" round url="/order/logistics" >查看物流</van-button>
                            <van-button class="oibtn" size="small" round :color="gobal.color" @click="receive(item)">确认收货</van-button>
                        </div>

                        <!-- 待评价和已完成 -->
                        <div class="oibot flex" v-show="item.status=='comment'||item.status=='done'">
                            <van-button class="oibtn" size="small" round >开具发票</van-button>
                            <van-button class="oibtn" size="small" round url="/order/logistics" >查看物流</van-button>
                            <van-button class="oibtn" size="small" v-if="item.status=='comment'" round :color="gobal.color" url="/order/comment">写评价</van-button>
                        </div>

                    </div>
                    
                </div>
            </van-list>
            <div class="emp" v-show="list.length==0">
                <img src="~@/assets/images/empty_list.png" class="emp-img" />
                <p class="emp-tx">暂无优惠券</p>
            </div>
        </div>
        

        <van-action-sheet  v-model="pop_invi.show" :actions="pop_invi.actions" :round="false" @select="doselect" cancel-text="取消" />

        <van-popup v-model="pop_haibao" class="pop-hbbox" :style="{ height: '100%',width:'100%' }">
            <p class="pop-hbbg" @click="pop_haibao=false"></p>
            <div class="pop-haibao"><img :src="haibao" /></div>
            <p class="pop-hbbtn" @click="savehaibao">保存海报</p>
        </van-popup>



        <van-popup v-model="popshow" closeable position="bottom" :style="{ height: '68%' }">
        </van-popup>
    </div>
</template>
<style lang="less">
    .morderlist{
        .topfixed{ position: fixed; left: 0; top: 0; right: 0; z-index: 3; background: #fff;}
        .search{  background: #fff; padding: .05rem .12rem;  }
        .scctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
        .listcont{ -webkit-overflow-scrolling: touch; overflow-y: scroll; padding-top: .84rem; }
        .olist{ padding: .1rem .12rem;}
        .oitem{ margin-bottom: .1rem; padding: 0 .1rem; border-radius: .05rem; background: #fff;}
        .oitop{ line-height: .4rem; font-size: .13rem;}
        .oisio{ margin-right: .05rem; color: @base; font-size: .16rem;}
        .oista{ color: @base;}
        .oigood{ display: block; position: relative; border-top: 1px solid #eee;}
        .oiginfo{ min-height: 1rem; padding: 0 0 0 .9rem;}
        .oigimg{ position: absolute; left: 0; top: .1rem; height: .8rem; width: .8rem; border-radius: .04rem; overflow: hidden;}
        .oigtil{ display: -webkit-box; padding:.1rem 0 .05rem; -webkit-box-orient:vertical;-webkit-line-clamp:2; text-overflow:ellipsis; overflow:hidden; font-size: .13rem; line-height: .2rem;}
        .oigsub{ font-size: .12rem; color: #999;}
        .oigpr{ padding-bottom: .07rem; text-align: right; font-size: .13rem;}
        .oignum{ font-size: .11rem; color: #999; margin-right: .05rem;}
        .oigmon{ font-size: .16rem; margin-left: .03rem;}
        .oibot{ padding: .08rem 0; justify-content: flex-end;border-top: 1px solid #eee;}
        .oibtx{ font-size: .11rem;}
        .oiclo{ margin-right: .03rem; color: #999;}
        .oibtn{ margin-left: .1rem;}
        .oigtype{ border:1px solid @base; color: @base; font-size: .1rem; border-radius: .08rem; padding: 0 .04rem}
        .pop-hbbox{ background: none;}
        .pop-haibao{ position: absolute; left: 50%; top: 46%; z-index: 2; transform: translate(-50%,-50%); -webkit-transform: translate(-50%,-50%); width: 3.12rem; overflow: hidden; border-radius: .08rem;}
        .pop-hbbtn{ position: absolute; left: 0; bottom: 0; right: 0; z-index: 2; line-height: .48rem; font-size: .16rem; text-align: center; background: #fff;}
        .pop-hbbg{position: absolute; left: 0; bottom: 0; right: 0; top: 0;}
        .emp{
            padding-top: .5rem; text-align: center; font-size: .16rem; color: #999;
            .emp-img{ display: block; margin: 0 auto .26rem; width: 1.6rem; }
        }
    }
</style>
<script>
import { Popup,List,Icon,ActionSheet } from 'vant';
export default {
    components:{
        [Popup.name]:Popup,
        [List.name]:List,
        [Icon.name]:Icon,
        [ActionSheet.name]:ActionSheet
    },
    data(){
        return {
            gobal:this.themes.setting,
            popshow:false,
            active:2,
            tabs:{active:'all',list:[]},
            list:[],
            params:{pageNo:1,pageSize:15},
            loading: false,
            finished: false,
            locked:false,
            wHeight:'auto',
            pop_invi:{show:false,actions: [
                {id:1, name: '邀请好友参团' },
                {id:2, name: '生成邀请海报' },
            ]},
            pop_haibao:false,
            haibao:"./tempimg/0img01.jpg"
        }
    },
    activated() {
        this.tabs.active = this.$route.query.status||'all';
        this.$tools.setScrollTop(this.$route.meta.scrollTop||0)
    },
    created(){
        this.Ob.$emit('changetitle','我的订单');

        this.tabs.list = [
            {status:'all',name:'全部'},
            {status:'pay',name:'待支付'},
            {status:'send',name:'待发货'},
            {status:'receive',name:'待收货'},
            {status:'comment',name:'待评论'},
        ];
        console.log(this.$route)
        this.tabs.active = this.$route.query.status||'all'

        this.getlist(true);

        this.wHeight = window.innerHeight||window.screen.height;
        this.wHeight = this.wHeight?this.wHeight+'px':'auto';

    },
    methods:{
        //搜索
        searchkey(event){
            var key = event.currentTarget.value.trim();
            if(key){
                this.$router.push('/order/list?key='+key)
            }
        },
        //切换分类
        changeStatus(item){
            if(item.status==this.tabs.active) return;
            this.tabs.active = item.status;
            this.$router.replace('/order/list?status='+item.status)
            this.getlist(true)
        },
        //获取订单列表
        getlist(first){
            if(this.locked) return;
            if(first){
                this.list = [];
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
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers热卖商品名称花时间In the mood foe flowers'},status:'ungroup',type:'assenble',total:45.6,fare:8,num:1,short:1,lasttime:7200},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'group',type:'assenble',total:45.6,fare:8,num:1,short:0,lasttime:0},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'pay',type:'seckill',total:495.06,fare:8,num:1,lasttime:1800},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'send',type:'seckill',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'receive',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'comment',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'cancel',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                        {id:Math.random()*1000,good:{id:2,img:'./tempimg/0banner01.jpg',title:'1热卖商品名称花时间In the mood foe flowers'},status:'done',type:'normal',total:495.06,fare:8,num:1},
                    ]
                    this.list = this.list.concat(goodlist);
                    if(this.tabs.active=='pay'){
                        this.list = [];
                    }
                    
                    setTimeout(()=>{
                        if(this.list.length>30){
                            this.finished = true;
                        }
                        this.loading = false;
                        this.locked = false;
                    },100)
                }
            }).catch(()=>{
                this.loading = false;
                this.locked = false;
            });
        },
        //邀请分享好友
        doselect(v){
            if(v.id==1){
                this.$toast({message:'分享事件'})
            }else{
                this.$toast.loading({
                    message: '海报生成中...',
                    forbidClick: true,
                    mask:true,
                    duration:0
                });
                setTimeout(()=>{
                    this.$toast.clear()
                    this.pop_haibao = true;
                },1500)
            }
        },
        savehaibao(){
            this.$toast.loading({
                message: '海报保存中...',
                forbidClick: true,
                mask:true,
                duration:0
            });
            setTimeout(()=>{
                this.$toast.clear();
                this.$toast.success('保存成功');
            },1500)
        },
        //提醒发货
        remindsend(){
            this.$toast.success('提醒成功');
        },
        //确认收货
        receive(item){
            this.$toast.success('收货成功');
            item.status = 'comment'
        },
        //延长收货
        delayReceive(item){
            this.temp = item;
            this.$toast.success('延长成功');
        },
        //取消订单
        orderCancel(item){
            this.$dialog.confirm({
                title: '提示',
                message: '确认取消该订单？',
                beforeClose:(action, done)=>{
                    setTimeout(()=>{
                        done()
                        this.$toast.success('取消成功');
                        item.status = 'cancel'
                    },500)
                }
            });
        }
    }
}
</script>

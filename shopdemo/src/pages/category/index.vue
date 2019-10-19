<template>
    <div class="pages">
        <div class="search"><input type="text" class="ctrol" placeholder="搜索您感兴趣的商品" v-on:blur="searchkey($event)" /></div>

        <div class="leftbox">
            <div :class="{'item':true,'active':cate_ac==0}" @click="goitem(0)">热搜推荐</div>
            <div :class="{'item':true,'active':cate_ac==item.id}" v-for="item in cate.cate" v-bind:key="item.id" @click="goitem(item.id)">{{item.name}}</div>
        </div>

        <div class="rightbox">
            <div class="ritem" cateid="0" id="J_ritem0">
                <div class="itil">热搜推荐</div>
                <div class="list">
                    <router-link to="/category/list" class="sitem" v-for="item in cate.reco" v-bind:key="item.id">
                        <van-image fit="cover" class="simg" :src="item.icon" />
                        <p class="stil">{{item.name}}</p>
                    </router-link>
                </div>
            </div>
            <div class="ritem" v-for="item in cate.cate" v-bind:key="item.id" :cateid="item.id"  :id="'J_ritem'+item.id">
                <div class="itil">{{item.name}}<router-link to="/categirt/list" class="imore">更多</router-link></div>
                <div class="list">
                    <router-link to="/category/list" class="sitem" v-for="sitem in item.list" v-bind:key="sitem.id">
                        <van-image fit="cover" class="simg" :src="sitem.icon" />
                        <p class="stil">{{sitem.name}}</p>
                    </router-link>
                </div>
            </div>
        </div>

        <botnav active="cate"></botnav>
    </div>
</template>
<style lang="less"  scoped>
    .pages{ background: #fff;}
    .search{
        position: fixed; left: 0; top: 0; z-index: 3; width: 100%; background: #fff; padding: .05rem .12rem;
        .ctrol{ display: block; border: none; height: .3rem; width: 100%; padding-left: .3rem; border-radius: .14rem; background: url(~@/assets/images/search02.png) no-repeat .1rem center #f8f8f8; background-size: .14rem .14rem; font-size: .14rem;}
    }
    .leftbox{
        position: fixed; left: 0; top: 0; bottom: 0; z-index: 1; width: .8rem; height: 100%; padding: .4rem 0 .5rem; background:#f2f2f2; overflow-y: scroll; -webkit-overflow-scrolling: touch;;
        .item{ display: block; height: .48rem; text-align: center; line-height: .48rem; font-size: .13rem;}
        .item.active{ background: #fff; color: #ff7021;}
    }
    .rightbox{
        padding: .4rem 0 .1rem .8rem; background: #fff;
        .ritem{ padding: 0 .14rem;}
        .itil{ padding: .2rem 0 .1rem; font-size: .14rem;}
        .imore{ float: right; padding-right: .14rem; font-weight: normal;color: #aaa; background: url(~@/assets/images/arr_r01.png) no-repeat right center; background-size: .07rem .13rem;}
        .list{ padding: .16rem 0 .1rem .16rem; overflow: hidden; box-shadow: 0 0 .05rem rgba(0,0,0,.1); border-radius: .06rem; text-align: center;}
        .sitem{ display: block; float: left; width: .62rem; margin-right: .25rem;}
        .sitem:nth-child(3n){ margin-right: 0;}
        .simg{ display: block; height: .62rem; width: .62rem; border: 1px solid #f8f8f8;}
        .stil{ padding: .05rem 0 .08rem; font-size: .12rem; color: #666;}
    }
</style>
<script>
import { Popup } from 'vant';
export default {
    components:{
        [Popup.name]:Popup
    },
    data(){
        return {
            img:false,
            cate_ac:0,
            cate:{reco:[],cate:[]},
            domstate:false,
            scrolllocked:false
        }
    },
    created(){
        this.Ob.$emit('changetitle','商品分类');
        this.getcatelist()

        this.throttle = new this.$tools.throttle_o(200);
        this.throttle.callback = (rs)=>{
            this.checkoffset();
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm=>{
            if(vm.domstate){
                vm.bindscroll();
            }
        })
    },
    beforeRouteLeave(to,from,next){
        window.removeEventListener('scroll',this.scroll);
        next()
    },
    methods:{
        searchkey(e){
            var key = event.currentTarget.value.trim();
            if(key){
                this.$router.push('/category/list?key='+key)
            }
        },
        bindscroll(){
            window.addEventListener('scroll',this.scroll)
        },
        scroll(){
            this.throttle.trigger()
        },
        //定位dom对象
        checkoffset(){
            if(this.scrolllocked) return;
            let elms = this.$el.getElementsByClassName('ritem'),
                len = elms.length,
                id = 0,
                otop = window.rem*.4;
            for(var i=0;i<len;i++){
                var ofs = elms[i].getBoundingClientRect();
                if(ofs.top<=otop&&(ofs.top+ofs.height)>=otop){
                    id = elms[i].getAttribute('cateid')
                    break;
                }
            }
            this.cate_ac = id;
        },
        //点击定位
        goitem(id){
            let elm = document.getElementById('J_ritem'+id),
                ofs = elm.getBoundingClientRect().top,
                scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
                top = scrollTop+ofs - window.rem*.4+2;
            if(top<3){ top=0}

            this.scrolllocked = true;
            setTimeout(()=>{
                this.scrolllocked = false;
            },300)
            this.cate_ac = id;
            document.body.scrollTop = top
            document.documentElement.scrollTop = top
            window.pageYOffset = top
        },
        //获取分类列表
        getcatelist(){
            this.$http.get("/api/callback.json", {
                params: 'params'
            }).then((res) => {
                let rs = res.data;
                if(rs.code==0){
                    //虚拟数据
                    let reco = [ //热搜推荐
                        {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                        {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                        {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                        {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                        {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                        {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                        {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                        {id:8,name:'暖风机',icon:'/img/0cate01.jpg'}
                    ]
                    let cate = [
                        {id:1,name:'数码电器',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:2,name:'内搭服饰',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:3,name:'家居生活',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:4,name:'时令蔬菜',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:6,name:'潮流靴鞋',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:7,name:'精品美妆',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]},
                        {id:8,name:'床上用品',list:[
                            {id:1,name:'家用电器',icon:'/img/0cate01.jpg'},
                            {id:2,name:'厨房用品',icon:'/img/0cate02.jpg'},
                            {id:3,name:'热门潮鞋',icon:'/img/0cate03.jpg'},
                            {id:4,name:'休闲鞋',icon:'/img/0cate03.jpg'},
                            {id:5,name:'连衣裙',icon:'/img/0cate01.jpg'},
                            {id:6,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:7,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:8,name:'暖风机',icon:'/img/0cate01.jpg'},
                            {id:9,name:'服饰',icon:'/img/0cate02.jpg'},
                            {id:10,name:'热水器',icon:'/img/0cate03.jpg'},
                            {id:11,name:'暖风机',icon:'/img/0cate01.jpg'}
                        ]}
                    ];

                    this.cate.reco = reco;
                    this.cate.cate = cate;
                    setTimeout(()=>{
                        this.bindscroll()
                    },200)
                }
            });
        }
    }
}
</script>

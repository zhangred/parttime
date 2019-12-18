<template>
  <div class="page">
    <div class="themes bgcfff">
      <p class="tm-til">选择配色方案<span style="margin-left:20px;text-decoration:underline" @click="getdefault">重置默认</span></p>
      <div class="tm-list">
        <div class="tm-li" v-for="(list,index) in themes" v-bind:key="index">
          <div :class="{'tm-item':true,'tm-item-active':active_id==item.id}" v-for="item in list" v-bind:key="item.id" @click="chooseTheme(item)">
            <p class="tm-ipo" :style="'background-color:'+item.colora"></p>
            <p class="tm-ipo" :style="'background-color:'+item.colorb"></p>
            <p class="tm-ipo tm-ipoa"></p>
          </div>
        </div>
      </div>
    </div>

    <!--页面路由-->
    <div class="links">
        <div :class="{'link-item':true,'link-item-dev':item.dev}" v-for="item in links" v-bind:key="item.id">
            <div class="link-line" @click="clickLink(item)"><span class="link-til">{{item.name}}</span><p :class="'link-ico link-ico-'+item.ico"></p></div>
            <div class="link-ul" v-show="item.open" v-if="item.list">
                <div class="link-li" v-for="sitem in item.list" v-bind:key="sitem.id"  @click="clickLink(sitem)">{{sitem.name}}</div>
            </div>
        </div>
    </div>
  </div>
</template>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .themes{ padding: 0 .1rem .1rem;}
    .tm-til{ padding: .14rem 0 .1rem; font-size: 13px; color: #666;}
    .tm-li{ display: flex; display: -webkit-flex;justify-content:space-between; padding-bottom: 12px;}
    .tm-item{ width: 68px; height: 26px; border:1px solid #fff; padding: 2px 3px; border-radius: 3px;}
    .tm-item-active{ border-color: #f45f0d;}
    .tm-ipo{ float: left; height: 20px; width: 20px; background: #fff;}
    .tm-ipoa{ border: 1px solid #e5e5e5;}
    .links{ padding: .2rem .1rem;}
    .link-item{ position: relative; background: #fff; padding: 0 .1rem 0 .14rem; line-height: .6rem; margin-bottom: .1rem;}
    .link-item-dev{ opacity: .4;}
    .link-line{ font-size: .16rem; font-weight: bold;}
    .link-li{ border-top: 1px solid #e5e5e5; line-height: .44rem; font-size: .14rem;}
    .link-ico{ position: absolute; right: .1rem; top: .15rem; height: .3rem; width: .3rem; background: url(~@/assets/images/map.png); background-size: 1.5rem 1.2rem;}
    .link-ico-home{background-position: 0 0;}
    .link-ico-category{background-position: -.3rem 0;}
    .link-ico-good-normal{background-position: -.6rem 0;}
    .link-ico-good-clock{background-position: -1.2rem 0;}
    .link-ico-cart{background-position: 0 -.3rem;}
    .link-ico-order-save{background-position: -.3rem -.3rem;}
    .link-ico-adress{background-position: -.6rem -.3rem;}
    .link-ico-coupan{background-position: -.9rem -.3rem;}
    .link-ico-mine-order{background-position: -1.2rem -.3rem;}
    .link-ico-mine{background-position: 0 -.6rem;}
    .link-ico-coupon-center{background-position: -.3rem -.6rem;}
    .link-ico-sell-center{background-position: -.6rem -.6rem;}
    .link-ico-lottery{background-position: -.9rem -.6rem;}
    .link-ico-signin{background-position: -1.2rem -.6rem;}
    .link-ico-question{background-position: 0 -.9rem;}
</style>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      themes: [],
      active_id:0,
      links:[]
    }
  },
  created(){
    this.Ob.$emit('changetitle','演示2');
    let ltn = localStorage.getItem('themeClass')||'';

    //主题自定
    let themes = [
      [
        {id:1,name:'theme-red',colora:'#ff4444',colorb:'#ff8855'},
        {id:2,name:'theme-tangerine',colora:'#ff5f15',colorb:'#ff9200'},
        {id:3,name:'theme-roseo',colora:'#ff547c',colorb:'#ffe6e8'},
        {id:4,name:'theme-darkred',colora:'#ff4344',colorb:'#555555'}
      ],
      [
        {id:5,name:'theme-blackish',colora:'#66c4aa',colorb:'#def3ec'},
        {id:6,name:'theme-darkgreen',colora:'#08ba07',colorb:'#383838'},
        {id:7,name:'theme-lightgreen',colora:'#63bf73',colorb:'#e0f4e2'},
        {id:8,name:'theme-yellow',colora:'#fcc600',colorb:'#1d262e'}
      ],
      [
        {id:9,name:'theme-blue',colora:'#4a90e2',colorb:'#dbe9f9'},
        {id:10,name:'theme-brown',colora:'#c3a769',colorb:'#f4efe2'},
        {id:11,name:'theme-darkblack',colora:'#2f2f34',colorb:'#ebecf2'},
        {id:12,name:'theme-purple',colora:'#884cff',colorb:'#efe6ff'}
      ]
      
    ];
    this.themes = themes;

    for(var i=0;i<3;i++){
        for(var j=0;j<themes[i].length;j++){
            if(ltn==themes[i][j].name){
                this.active_id = themes[i][j].id;
            }
        }
    }

    // 导航设定
    let links = [
        {id:1,name:'首页',ico:'home',open:false,list:[{id:1.1,name:'首页风格1',path:'/index'},{id:1.2,name:'首页风格2',path:'/index01'}]},
        {id:2,name:'商品分类',ico:'category',open:false,list:[{id:1.1,name:'商品分类1',path:'/category'},{id:1.2,name:'商品分类2',path:'/category01'}]},
        {id:3,name:'普通商品',ico:'good-normal',path:'/category/list'},
        {id:4,name:'拼团商品',ico:'good-normal',path:'/assemble'},
        {id:5,name:'秒杀商品',ico:'good-clock',path:'/seckill'},
        {id:6,name:'购物车',ico:'cart',path:'/cart'},
        {id:7,name:'提交订单',ico:'order-save',path:'/category/ordersave'},
        {id:8,name:'收货地址',ico:'adress',path:'/mine/address'},
        {id:9,name:'优惠券',ico:'coupan',path:'/mine/couponlist'},
        {id:10,name:'我的订单',ico:'mine-order',path:'/order/list'},
        {id:11,name:'我的',ico:'mine',open:false,list:[{id:1.1,name:'我的1',path:'/mine'},{id:1.2,name:'我的2',path:'/mine01'}]},
        {id:12,name:'领券中心',ico:'coupon-center',path:'/coupanCenter'},
        {id:13,name:'分销中心',ico:'sell-center',path:'/salesman/center'},
        {id:14,name:'抽奖',ico:'lottery',path:'/lottery'},
        {id:15,name:'签到',ico:'signin',path:'/signin'},
        {id:16,name:'常见问题',ico:'question',path:'/question'},
    ];
    this.links = links;
  },
  methods: {
      //选择模版
      chooseTheme(item){
          this.active_id = item.id;
          localStorage.setItem('themeClass',item.name)
          this.Ob.$emit('changeTheme',item.name)
      },
      getdefault(){
          this.active_id = -1;
          localStorage.setItem('themeClass','')
          this.Ob.$emit('changeTheme','')
      },
      //跳转链接
      clickLink(item){
          if(item.list){
              item.open = !item.open;
          }else{
              this.$router.push(item.path)
          }
      }
  }
}
</script>

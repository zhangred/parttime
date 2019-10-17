<template>
  <div class="page">
    <div class="themes bgcfff">
      <p class="tm-til">选择配色方案</p>
      <div class="tm-list">
        <div class="tm-li" v-for="list in themes">
          <div class="tm-item" v-for="item in list" v-bind:key="item.id">
            <p class="tm-ipo" :style="'background-color:'+item.colora"></p>
            <p class="tm-ipo" :style="'background-color:'+item.colorb"></p>
            <p class="tm-ipo tm-ipoa"></p>
          </div>
        </div>
      </div>
    </div>
    <router-link to="/">Home</router-link>
    <router-link to="/category">category</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      themes: []
    }
  },
  created(){
    this.Ob.$emit('changetitle','演示');

    //主题自定
    let themes = [
      [
        {id:1,name:'theme-red1',colora:'#ff4444',colorb:'#ff8855'},
        {id:2,name:'theme-red2',colora:'#ff5f15',colorb:'#ff9200'},
        {id:3,name:'theme-rose1',colora:'#ff547c',colorb:'#ffe6e8'},
        {id:4,name:'theme-red3',colora:'#ff4344',colorb:'#555555'},
      ]
      
    ];
    this.themes = themes;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .themes{ padding: 0 .2rem .1rem;}
    .tm-til{ padding: .14rem 0 .1rem; font-size: 13px; color: #666;}
    .tm-li{ display: flex; display: -webkit-flex;justify-content:space-between; padding-bottom: 12px;}
    .tm-item{ width: 68px; height: 26px; border:1px solid #999; padding: 2px 3px; border-radius: 3px;}
    .tm-ipo{ float: left; height: 20px; width: 20px; background: #fff;}
    .tm-ipoa{ border: 1px solid #e5e5e5;}
    .xxxxx{}
    .xxxxx{}
    .xxxxx{}
    .xxxxx{}
</style>

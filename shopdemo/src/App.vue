<template>
  <div id="app" :class="themeClass">
    <!-- <router-view></router-view> -->
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"> </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
            themeClass:''
        }
    },
    created() {
        this.Ob.$on('changeTheme',(res)=>{
            this.themeClass = res;
        })
        this.Ob.$on('changetitle',(res)=>{
          document.title = res;
        })

       this.themeClass = localStorage.getItem('themeClass')||'';
    },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

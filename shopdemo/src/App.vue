<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app',
    data(){
        return {
            msg:'5555555555'
        }
    },
    created() {
        this.Ob.$on('changebg',(res)=>{
            console.log(55,res)
        })
        this.Ob.$on('changetitle',(res)=>{
          document.title = res;
        })
    },
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

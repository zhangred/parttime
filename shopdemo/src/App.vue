<template>
  <div id="app">
      <div>{{msg}}</div>
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
    },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

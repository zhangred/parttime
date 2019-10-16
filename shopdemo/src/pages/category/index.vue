<template>
  <div class="hello">
    category
    <router-link class="x" to="/">Home</router-link>
    <router-link to="/category">category</router-link>
    <div @click="test">xxxx</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  created(){
      console.log(5555)
  },
  methods:{
      test(){
          this.Ob.$emit('changebg',{a:5})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less"  scoped>
    .hello{
        background:#fff;
        .x{
            color: blue;
        } 
    }
</style>

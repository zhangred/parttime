<template>
  <div class="hello">
    dfgsdfgsdfgsdxxxxxxxxxxxxxxxxx
    <router-link to="/">Home</router-link>
    <router-link to="/category">category</router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .hello{ background:red;}
</style>

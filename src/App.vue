<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>
<script>
export default {
  beforeMount() {
    if(JSON.parse(sessionStorage.getItem('current_user'))){
      this.$router.push('/home')
    }else{
      this.$router.push('/entrar')
    }
  }
}
</script>
<style>
html, body{
  height: 100%;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100% !important;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

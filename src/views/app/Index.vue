<template>
  <div id="app-container" class="h-100">
    <top-nav/>
    <main>
      <div class="h-100">
        <router-view/>
      </div>
    </main>
    <footer-component/>
  </div>
</template>

<script>

import TopNav from '../../components/containers/TopNav'
import Footer from '../../components/containers/Footer'

export default {
  name: "Index",
  components: {
    'top-nav': TopNav,
    'footer-component': Footer
  },
}
</script>

<style>
 main{
   flex: 1 1 auto;
 }
 #app-container {
   font-family: Avenir, Helvetica, Arial, sans-serif;
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
   text-align: center;
   display: flex;
   flex-flow: column;
   height: 100%;
 }
</style>
<template>
  <div id="app-container">
    <top-nav/>
    <sidebar/>
    <main>
      <div class="container-fluid">
        <router-view/>
      </div>
    </main>
    <footer-component/>
  </div>
</template>

<script>

import Sidebar from '../../components/containers/Sidebar'
import TopNav from '../../components/containers/TopNav'
import Footer from '../../components/containers/Footer'

export default {
  name: "Index",
  components: {
    'top-nav': TopNav,
    'sidebar': Sidebar,
    'footer-component': Footer
  },
}
</script>

<style scoped>

</style>
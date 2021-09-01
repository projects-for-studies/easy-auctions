<template>
  <div id="app-container">
    <top-nav/>
    <main>
      <div class="container-fluid">
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
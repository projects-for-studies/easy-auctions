<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>
<script>
  export default {
    beforeCreate() {
      this.$store.commit('authentication/SET_SESSION', this.$session.get('current_user'))
    }
  }
</script>
<style>
  html, body{
    height: 100%;
    overflow-x: hidden;
  }
  .dropdown-item.active, .dropdown-item:active {
    color: #fff;
    text-decoration: none;
    background-color: #343a40 !important;
  }
</style>

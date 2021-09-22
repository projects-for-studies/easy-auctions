<template>
  <div class="h-100">
    <router-view/>
  </div>
</template>
<script>
  export default {
    beforeCreate() {
      this.$store.commit('authentication/SET_SESSION', this.$session.get('current_user'))
    },
    updated() { this.$store.dispatch('authentication/get_ser', this.$session.get('current_user')) },
    created() { this.$store.dispatch('authentication/get_ser', this.$session.get('current_user')) }
  }
</script>
<style>
html, body{
  height: 100%;
  overflow-x: hidden;
}
</style>

<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">
      <img src="@/assets/img/logo_ea.png" style="width: 190px; height: 70px"/>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <em>{{ session.user.name }}</em>
          </template>
          <b-dropdown-item href="#">Configurações</b-dropdown-item>
          <b-dropdown-item href="#" @click="goToMyAccount()">Minha conta</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout()">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import { mapState } from "vuex";

  export default {
    name: "TopNav",
    data(){
      return{
      }
    },
    computed: {
      ...mapState('authentication', ['session'])
    },
    methods:{
      logout(){
        this.$store.dispatch('authentication/logout', {config: this.session.config, session: this.$session, router: this.$router })
      },
      goToMyAccount(){
        this.$router.push('/minha-conta')
      }
    }
  }
</script>

<style scoped>

</style>
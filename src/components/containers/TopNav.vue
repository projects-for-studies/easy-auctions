<template>
  <b-navbar toggleable="lg" type="dark" variant="dark" id="header">
    <b-navbar-brand to="/home">
      <img src="@/assets/img/logo_dark.png" style="width: 190px; height: 70px"/>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <template #button-content>
            <b-avatar size="2em" icon="people-fill"></b-avatar> <span style="margin-left: 5px;">{{ user.data.name }}</span>
          </template>
          <b-dropdown-item href="#">Configurações</b-dropdown-item>
          <b-dropdown-item to="/minha-conta">Minha conta</b-dropdown-item>
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
    data: () => ({}),
    computed: {
      ... mapState ( 'authentication' ,  [ 'session', 'user' ] ),
    },
    methods:{
      logout(){
        this.$store.dispatch('authentication/logout', { config: this.session.config, session: this.$session, router: this.$router})
      }
    }
  }
</script>

<style scoped>
  #header{
    flex: 0 1 auto;
    flex-grow: 0;
    flex-shrink: 1;
    flex-basis: auto;
  }
</style>
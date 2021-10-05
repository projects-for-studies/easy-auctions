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
            <b-avatar variant="dark" :src="`${baseUrlPicture}/${picture_current_user}`" class="mr-3"></b-avatar> <span style="margin-left: 5px;">{{ formatName(user) }}</span>
          </template>
          <b-dropdown-item to="/minha-conta">Minha conta</b-dropdown-item>
          <b-dropdown-item href="#">Meus leilões</b-dropdown-item>
          <b-dropdown-item href="#" @click="logout()">Sair</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
  import { baseProfilePicture } from "../../constants";
  import { mapState } from "vuex";
  import { log_out } from "../../services/user/Authentication";

  export default {
    name: "TopNav",
    data: () => ({
      baseUrlPicture: baseProfilePicture
    }),
    computed: {
      ...mapState('authentication',  [ 'session', 'user', 'picture_current_user' ]),
    },
    methods:{
      logout(){
        log_out(this.session.config)
        .then(() => {
            this.$session.destroy()
            this.$router.push('/entrar')
        })
        .catch(() => {
          this.$store.commit('authentication/SET_ALERT', {
            id: 'error_logout',
            type: 'error',
            message: 'Ocorreu um erro ao tentar sair, por favor tente novamente.',
            body_variant: 'danger',
            text_variant: 'light',
            show: true,
            blocked: true,
            redirect: false,
            path: '',
            time: 5000
          })
        })
      },
      formatName(name){
        let n = name.split(" ")
        let pen = n[n.length - 2]
        let pre = ["de", "do", "da", "dos", "das"]

        if(pre.indexOf(pen) != -1){
          return `${n[0]} ${pen} ${n[n.length - 1]}`
        }else{
          return `${n[0]} ${n[n.length - 1]}`
        }
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
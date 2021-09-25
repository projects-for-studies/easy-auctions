<template>
  <b-container class="h-100">
    <message-alert :data="alert"/>
    <div class="d-flex justify-content-center align-items-center h-100">
        <b-card>
          <img src="@/assets/img/logo_ea.png" style="width: 400px; height: 160px"/>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="email"
            >
              <b-form-input
                  id="email"
                  v-model="form.email"
                  type="email"
                  placeholder="Digite seu email"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Sua senha:" label-for="password">
              <b-form-input
                  id="password"
                  type="password"
                  v-model="form.password"
                  placeholder="***********"
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                  v-model="form.checked"
                  id="checkboxes-4"
                  :aria-describedby="ariaDescribedby"
              >
              </b-form-checkbox-group>
            </b-form-group>

            <b-button block type="submit" variant="outline-dark">Entrar</b-button>
          </b-form>
          <div class="d-flex justify-content-center align-items-center">
            <br/><br/>
            <b-button block type="button" variant="outline-secondary" href="/cadastrar">Cadastrar-se</b-button>
          </div>
        </b-card>
      </div>
  </b-container>
</template>

<script>
  import { mapState } from 'vuex'
  import Messages from "../../../components/Messages";

  export default {
  name: "Login",
  components: {
    "message-alert": Messages
  },
  data: () => ({
    form: {
      email: '',
      password: '',
      checked: []
    }
  }),
  computed: {
    ...mapState({
      alert: state => state.authentication.alert,
    })
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if(this.validAllFieldsBeforeSubmit()){
        this.$store.dispatch('authentication/login', {
          email: this.form.email,
          password: this.form.password,
          router: this.$router,
          session: this.$session
        });
      }else{
        this.$store.commit('authentication/SET_ALERT', {
          id: 'error_login',
          type: 'error',
          message: 'Atenção! Os campos email e senha são necessários para entrar no sistema.',
          body_variant: 'danger',
          text_variant: 'light',
          show: true,
          blocked: false,
          redirect: false,
          path: '',
          time: 5000
        })
      }
    },
    validAllFieldsBeforeSubmit(){
      let email_valid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      if (!email_valid.test(this.form.email)) return false
      if (this.form.password.length == 0) return false
      return true
    },
  }
}
</script>

<style scoped>

</style>
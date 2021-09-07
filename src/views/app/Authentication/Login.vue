<template>
  <b-container class="h-100">
      <div class="d-flex justify-content-center align-items-center h-100">
        <b-card>
          <div v-if="errors.length > 0">
            <b-alert show variant="danger" v-for="(err, index) in errors" :key="'err_'+index">{{ err }}</b-alert>
          </div>
          <img src="@/assets/img/logo_ea.png" style="width: 400px; height: 160px"/>
          <b-form @submit.prevent="onSubmit">
            <b-form-group
                id="input-group-1"
                label="Email:"
                label-for="input-1"
            >
              <b-form-input
                  id="input-1"
                  v-model="form.email"
                  type="email"
                  placeholder="Digite seu email"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Sua senha:" label-for="input-2">
              <b-form-input
                  id="input-2"
                  type="password"
                  v-model="form.password"
                  placeholder="***********"
                  required
              ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-4" v-slot="{ ariaDescribedby }">
              <b-form-checkbox-group
                  v-model="form.checked"
                  id="checkboxes-4"
                  :aria-describedby="ariaDescribedby"
              >
                <b-form-checkbox value="me" button-variant="dark">Lembrar-se de mim.</b-form-checkbox>
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

  export default {
  name: "Login",
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      }
    }
  },
  computed: {
    ...mapState({
      errors: state => state.authentication.errors
    })
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      this.$store.dispatch('authentication/login', { email: this.form.email, password: this.form.password, session: this.$session, router: this.$router })
    }
  }
}
</script>

<style scoped>

</style>
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
                  :state="valid_email"
                  @blur="validFieldEmail"
                  aria-describedby="input-email input-feedback-email"
                  placeholder="Digite seu email"
              ></b-form-input>
              <b-form-invalid-feedback id="input-feedback-name">
                Digite seu email para prosseguir.
              </b-form-invalid-feedback>
            </b-form-group>

            <b-form-group id="input-group-2" label="Sua senha:" label-for="input-2">
              <b-form-input
                  id="input-2"
                  type="password"
                  v-model="form.password"
                  placeholder="***********"
                  :state="valid_password"
                  @blur="validFieldPassowrd"
                  aria-describedby="input-password input-feedback-password"
              ></b-form-input>
              <b-form-invalid-feedback id="input-feedback-password">
                Digite sua senha para prosseguir.
              </b-form-invalid-feedback>
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
      valid_password: null,
      valid_email: null,
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
  watch:{
    email: function(){
      if(this.valid_email == false) this.validFieldEmail()
    },
    password: function(){
      if(this.valid_password == false) this.validFieldPassowrd()
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if(this.validAllFieldsBeforeSubmit()){
        this.$store.dispatch('authentication/login', { email: this.form.email, password: this.form.password, session: this.$session, router: this.$router })
      }
    },
    validFieldPassowrd(){
      (this.form.password.length < 8) ? this.valid_password = false : this.valid_password = true
    },
    validFieldEmail(){
      let email_valid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      (!email_valid.test(this.form.email)) ? this.valid_email = false : this.valid_email = true
    },
    validAllFieldsBeforeSubmit(){
      this.validFieldEmail();
      this.validFieldPassowrd();
      if(this.valid_password && this.valid_email){
        return true;
      }else{
        return false;
      }
    },
  }
}
</script>

<style scoped>

</style>
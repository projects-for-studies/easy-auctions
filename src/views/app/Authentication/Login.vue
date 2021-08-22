<template>
    <b-container class="h-100">
      <div class="d-flex justify-content-center align-items-center h-100">
        <b-card>
          <b-form @submit="onSubmit">
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
                <b-form-checkbox value="me">Lembrar-se de mim.</b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>

            <b-button type="submit" variant="primary">Entrar</b-button>
          </b-form>
        </b-card>
      </div>
    </b-container>
</template>

<script>
import { verifyAuthentication } from '../../../constants/index'
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
  methods: {
    onSubmit(event) {
      event.preventDefault()
      sessionStorage.setItem('current_user', JSON.stringify(this.form))
      this.$router.push('/home')
      console.log(JSON.stringify(this.form))
    }
  },
  mounted() {
    verifyAuthentication()
  }
}
</script>

<style scoped>

</style>
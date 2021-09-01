<template>
  <div>
    <b-container class="h-100">
      <div class="d-flex justify-content-center align-items-center h-100">
        <b-card>
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
        </b-card>
      </div>
    </b-container>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Index",
    computed: mapState([
      'user'
    ])
  }
</script>

<style scoped>

</style>
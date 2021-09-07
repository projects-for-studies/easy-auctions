<template>
  <b-container class="d-flex justify-content-center align-items-center h-100">
    <b-card class="w-75">
      <img src="@/assets/img/logo_ea.png" style="width: 400px; height: 160px"/>
      <b-form>
        <b-row>
          <b-col sm="12">
            <span class="font-weight-bold h4">Dados pessoais</span>
            <hr/>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6">
            <b-form-group
                label="Nome"
                label-for="nome"
                description="Proíbido caracteres especiais."
                class="mb-0"
            >
              <b-form-input
                  id="nome"
                  v-model="name"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
                label="Email"
                label-for="email"
                class="mb-0"
            >
              <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Genêro" label-for="genero">
              <b-form-select
                  v-model="genero"
                  :options="generoOptions"
                  id="genero"
              ></b-form-select>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group label="Data de nascimento"
                          label-for="data_nascimento">
              <b-form-datepicker id="data_nascimento" placeholder="Selecione" dark
                                 :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                 locale="pt-BR" v-model="date_birth"></b-form-datepicker>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
                label="Telefone - 1"
                label-for="phone_1"
                class="mb-0"
                description="Formato: (99) 9 9999-9999"
            >
              <b-form-input
                  id="phone_1"
                  type="tel"
                  v-mask="'(##) # ####-####'"
                  v-model="phone1"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
                label="Telefone - 2"
                label-for="phone_2"
                description="Formato: (99) 9 9999-9999"
                class="mb-0"
            >
              <b-form-input
                  id="phone_2"
                  type="tel"
                  v-mask="'(##) # ####-####'"
                  v-model="phone2"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <br/>
            <span class="font-weight-bold h4">Dados de endereço</span>
            <hr/>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="4">
            <b-form-group
                label="CEP"
                label-for="zip_code"
                class="mb-0"
            >
              <b-form-input
                  id="zip_code"
                  type="text"
                  v-mask="'#####-###'"
                  v-model="zip_code"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="8">
            <b-form-group
                label="Bairro"
                label-for="district"
                class="mb-0"
            >
              <b-form-input
                  id="district"
                  type="text"
                  v-model="district"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="8">
            <b-form-group
                label="Rua"
                label-for="street"
                class="mb-0"
            >
              <b-form-input
                  id="street"
                  type="text"
                  v-model="street"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="4">
            <b-form-group
                label="Número"
                label-for="number"
                class="mb-0"
            >
              <b-form-input
                  id="number"
                  type="text"
                  v-mask="'##########'"
                  v-model="number"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
                label="Cidade"
                label-for="city"
                class="mb-0"
            >
              <b-form-input
                  id="city"
                  type="text"
                  v-model="city"
              ></b-form-input>
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
                label="Estado"
                label-for="state"
                class="mb-0"
            >
              <b-form-input
                  id="state"
                  type="text"
                  v-model="state"
              ></b-form-input>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="12">
            <br/><br/>
            <b-button block type="submit" variant="outline-dark">Cadastrar-se</b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </b-container>
</template>

<script>
  import Vue from 'vue'
  import VueMask from 'v-mask'

  Vue.use(VueMask);

  export default {
    name: "Register",
    data() {
      return {
        name: '',
        email: '',
        zip_code: '',
        phone1: '',
        phone2: '',
        number: '',
        street: '',
        district: '',
        city: '',
        state: '',
        date_birth: null,
        genero: null,
        generoOptions: [
          { value: null, text: 'Por favor, selecione.' },
          { value: 'M', text: 'Masculino' },
          { value: 'F', text: 'Feminino' },
        ]
      }
    },
  }
</script>

<style scoped>

</style>
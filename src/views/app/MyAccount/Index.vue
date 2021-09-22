<template>
  <div class="w-100 h-100 d-flex justify-content-center align-items-center">
    <b-card class="w-100 text-left">
      <b-row>
        <b-col sm="6"><span class="text-left h5">Meus dados</span></b-col>
        <b-col sm="6"><span class="text-left h5">Meu endereço</span></b-col>
      </b-row>
      <hr class="my-4"/>
      <b-row>
        <b-col sm="3"><span class="font-weight-bold">Nome:</span> {{ user.data.name }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Email:</span> {{ user.data.email }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Cidade:</span> {{ user.address.city }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Estado:</span> {{ user.address.state }}</b-col>
        <br/><br/>
        <b-col sm="3"><span class="font-weight-bold">Sexo:</span> {{ user.data.gender }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Data de Nasc.:</span> {{ new Date(user.data.date_birth).toLocaleDateString() }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Bairro:</span> {{ user.address.district }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Rua:</span> {{ user.address.street }}</b-col>
        <br/><br/>
        <b-col sm="3"><span class="font-weight-bold">Telefone - 1:</span> {{ user.data.telephone_1 }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Telefone - 2:</span> {{ user.data.telephone_2 }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">CEP:</span> {{ user.address.zip_code }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Número:</span> {{ user.address.number }}</b-col>
        <br/><br/>
        <b-col sm="6"></b-col>
        <b-col sm="3"><span class="font-weight-bold">Complemento:</span> {{ user.address.complement }}</b-col>
        <b-col sm="3"><span class="font-weight-bold">Referência:</span> {{ user.address.reference }}</b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  export default {
    name: "Index",
    computed: {
      ...mapState({
        user: state => state.authentication.user,
      })
    },
  }
</script>

<style scoped>

</style>
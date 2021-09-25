<template>
  <b-container class="d-flex justify-content-center align-items-center h-100">
    <div class="w-100">
      <div class="d-flex justify-content-center">
        <img src="@/assets/img/logo_ea.png" style="width: 300px; height: 130px"/>
      </div>
      <b-toast id="msg" :variant="variant_msg" toaster="b-toaster-top-center" solid no-auto-hide no-close-button>
        <template #toast-title>
          <div class="d-flex flex-grow-1 align-items-baseline">
            <strong class="mr-auto">{{ title_msg }}</strong>
            <b-icon icon="backspace-reverse-fill" @click="closeMsg" style="cursor:pointer"></b-icon>
          </div>
        </template>
        {{ msg }}
      </b-toast>
      <b-form @submit.prevent="registerUser">
        <p class="h5">(*) Campos obrigatórios.</p>
        <div class="d-flex justify-content-center h-100">
          <b-card class="w-50" header-class="bg-transparent">
            <template #header>
              <h6 class="mb-0 h4"><b-icon icon="person-fill" aria-hidden="true"></b-icon> Dados pessoais</h6>
            </template>
            <b-row>
              <b-col sm="12">
                <b-form-group
                    label="Nome*"
                    label-for="nome"
                    description="Não pode conter caracteres especiais."
                >
                  <b-form-input
                      id="nome"
                      type="text"
                      v-model="name"
                      :state="valid_name"
                      @blur="validFieldName"
                      aria-describedby="input-name input-feedback-name"
                      trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-feedback-name">
                    O nome não pode conter caracteres especiais e deve ter no mínimo 10 dígitos.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                    label="Senha*"
                    label-for="password"
                >
                  <b-form-input
                      id="password"
                      type="password"
                      v-model="password"
                      :state="valid_password"
                      @blur="validFieldPassowrd"
                      aria-describedby="input-password input-feedback-password"
                      trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-feedback-password">
                    Campo obrigatório, preencha por favor.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                    label="Confirmar senha*"
                    label-for="confirm_password"
                >
                  <b-form-input
                      id="confirm_password"
                      type="password"
                      v-model="confirm_password"
                      @blur="validFieldPassowrdConfirm"
                      :state="valid_confirm_password"
                      aria-describedby="input-password-confirm input-feedback-password-confirm"
                      trim
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-feedback-password-confirm">
                    Confirme a senha por favor.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group
                    label="Email*"
                    label-for="email"
                >
                  <b-form-input
                      id="email"
                      type="email"
                      :state="valid_email"
                      @blur="validFieldEmail"
                      aria-describedby="input-email input-feedback-email"
                      v-model="email"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-feedback-email">
                    Campo obrigatório, preencha por favor.
                  </b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Genêro*" label-for="gender">
                  <b-form-select
                      id="gender"
                      v-model="gender"
                      :options="genderOptions"
                      :state="valid_gender"
                      @change="validFieldGender"
                      aria-describedby="input-gender input-feedback-gender"
                  ></b-form-select>
                  <b-form-invalid-feedback id="input-gender">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group label="Data de nascimento*"
                              label-for="data_nascimento">
                  <b-form-datepicker id="data_nascimento" placeholder="Selecione" dark
                                     :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                     :max="minimum_age_allowed"
                                     :state="valid_date_birth"
                                     @blur="validFieldDateBirth"
                                     aria-describedby="input-date-birth input-feedback-date-birth"
                                     locale="pt-BR" v-model="date_birth"></b-form-datepicker>
                  <b-form-invalid-feedback id="input-feedback-date-birth">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                    label="Telefone - 1*"
                    label-for="phone_1"
                >
                  <b-form-input
                      id="phone_1"
                      type="tel"
                      @blur="validFieldPhone1"
                      :state="valid_phone_1"
                      v-mask="['(##) ####-####', '(##) # ####-####']"
                      aria-describedby="input-phone-1 input-feedback-phone-1"
                      v-model="phone1"
                  ></b-form-input>
                  <b-form-invalid-feedback id="input-feedback-phone-1">Campo obrigatório, preencha por favor</b-form-invalid-feedback>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                    label="Telefone - 2"
                    label-for="phone_2"
                >
                  <b-form-input
                      id="phone_2"
                      type="tel"
                      v-model="phone2"
                      v-mask="['(##) ####-####', '(##) # ####-####']"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
          <b-card class="w-50" header-class="bg-transparent">
            <template #header>
              <h6 class="mb-0 h4"><b-icon icon="house-door-fill" aria-hidden="true"></b-icon> Dados de endereço</h6>
            </template>
            <b-row>
              <b-col sm="8">
                <b-form-group
                    label="CEP"
                    label-for="zip_code"
                    description="Digite seu CEP e iremos completar seu endereço."
                >
                  <b-form-input
                      id="zip_code"
                      v-model="zip_code"
                      v-mask="'#####-###'"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group
                    label="Número"
                    label-for="number"
                >
                  <b-form-input
                      id="number"
                      type="text"
                      v-model="number"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="8">
                <b-form-group label="Rua" label-for="street">
                  <b-form-input
                      id="street"
                      type="text"
                      v-model="street"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="4">
                <b-form-group label="Bairro"
                              label-for="district">
                  <b-form-input
                      id="district"
                      type="text"
                      v-model="district"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="6">
                <b-form-group
                    label="Cidade"
                    label-for="city"
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
                >
                  <b-form-input
                      id="state"
                      type="text"
                      v-model="state"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group
                    label="Complemento"
                    label-for="complement"
                >
                  <b-form-input
                      id="complement"
                      type="text"
                      v-model="complement"
                  ></b-form-input>
                </b-form-group>
              </b-col>
              <b-col sm="12">
                <b-form-group
                    label="Referências"
                    label-for="reference"
                    description="Ex: Ao lado do Hospital, Em frente ao mercado..."
                >
                  <b-form-input
                      id="reference"
                      type="text"
                      v-model="reference"
                  ></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </div>
        <b-row>
          <b-col sm="12">
            <br/>
            <b-button block type="submit" variant="outline-dark">Cadastrar-se</b-button>
          </b-col>
        </b-row>
      </b-form>
    </div>
  </b-container>
</template>

<script>
  import { createAddress } from '../../../services/user/Address'
  import { register } from '../../../services/user/Authentication'

  export default {
    name: "Register",
    data() {
      return {
        msg: '',
        title_msg: '',
        variant_msg: '',
        valid_name: null,
        valid_password: null,
        valid_confirm_password: null,
        valid_email: null,
        valid_date_birth: null,
        valid_phone_1: null,
        valid_gender: null,
        name: '',
        password: '',
        confirm_password: '',
        email: '',
        zip_code: '',
        phone1: '',
        phone2: '',
        number: '',
        street: '',
        complement: '',
        reference: '',
        district: '',
        city: '',
        state: '',
        minimum_age_allowed: new Date(new Date().getYear() + 1882, 1, new Date().getDate()),
        date_birth: null,
        gender: null,
        genderOptions: [
          { value: null, text: 'Por favor, selecione.' },
          { value: 'M', text: 'Masculino' },
          { value: 'F', text: 'Feminino' },
        ]
      }
    },
    watch:{
      name: function(){
        if(this.valid_name == false) this.validFieldName()
      },
      password: function(){
        if(this.valid_password == false) this.validFieldPassowrd()
      },
      confirm_password: function(){
        if(this.valid_confirm_password == false) this.validFieldPassowrdConfirm()
      },
      email: function(){
        if(this.valid_email == false) this.validFieldEmail()
      },
      gender: function(){
        if(this.valid_gender == null) this.validFieldGender()
      },
      date_birth: function(){
        if(this.valid_date_birth == false) this.validFieldDateBirth()
      },
      phone1: function(){
        if(this.valid_phone_1 == false) this.validFieldPhone1()
      }
    },
    methods:{
      closeMsg(){
        this.$bvToast.hide('msg')
        if(this.variant_msg == 'success') this.$router.push('/entrar')
      },
      registerUser(){
        if(this.validAllFieldsBeforeSubmit()){
          let user = {
            "name": this.name,
            "gender": this.gender,
            "password": this.password,
            "password_confirmation": this.password_confirmation,
            "email": this.email,
            "date_birth": this.date_birth,
            "telephone_1": this.phone1,
            "telephone_2": this.phone2
          }
          register(user)
          .then(res => {
            if(res.data.status == "success"){
              if(this.zip_code.length >= 9){
                let address = {
                  "user_id": res.data.data.id,
                  "city": this.city,
                  "state": this.state,
                  "district": this.district,
                  "zip_code": this.zip_code,
                  "number": this.number,
                  "street": this.street,
                  "complement": this.complement,
                  "reference": this.reference
                }
                createAddress(address)
                .then(() => {
                  this.msg = 'Usuário cadastrado com sucesso!'
                  this.variant_msg = 'success'
                  this.title_msg = 'Cadastro de usuário.'
                  this.$bvToast.show('msg')
                  setTimeout(() => {
                    this.$bvToast.hide('msg')
                    this.$router.push('/entrar')
                  },5000)
                })
              }
            }else{
              this.msg = 'Erro ao cadastrar usuário!'
              this.variant_msg = 'danger'
              this.title_msg = 'Cadastro de usuário.'
              this.$bvToast.show('msg')
              setTimeout(() => {
                this.$bvToast.hide('msg')
              },5000)
            }
          }).catch(() => {
            this.msg = 'Erro ao cadastrar usuário!'
            this.variant_msg = 'danger'
            this.title_msg = 'Cadastro de usuário.'
            this.$bvToast.show('msg')
            setTimeout(() => {
              this.$bvToast.hide('msg')
            },5000)
          })
        }
      },
      validAllFieldsBeforeSubmit(){
        this.validFieldName();
        this.validFieldPassowrd();
        this.validFieldPassowrdConfirm();
        this.validFieldEmail();
        this.validFieldGender();
        this.validFieldDateBirth();
        this.validFieldPhone1();
        if(this.valid_name && this.valid_password && this.valid_confirm_password  && this.valid_email && this.valid_gender && this.valid_date_birth && this.valid_phone_1){
          return true;
        }else{
          return false;
        }
      },
      validFieldName(){
        let name_valid = new RegExp(/^[a-záàâãéèêíïóôõöúçñ ]+$/i);
        (!name_valid.test(this.name) || this.name.trim().length < 10) ? this.valid_name = false : this.valid_name = true
      },
      validFieldPassowrd(){
        (this.password.length < 8) ? this.valid_password = false : this.valid_password = true
      },
      validFieldPassowrdConfirm(){
        (this.confirm_password != this.password || !this.valid_password) ? this.valid_confirm_password = false : this.valid_confirm_password = true
      },
      validFieldEmail(){
        let email_valid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        (!email_valid.test(this.email)) ? this.valid_email = false : this.valid_email = true
      },
      validFieldGender(){
        (this.gender == null) ? this.valid_gender = false : this.valid_gender = true
      },
      validFieldPhone1(){
        (this.phone1.trim().length < 11) ? this.valid_phone_1 = false : this.valid_phone_1 = true
      },
      validFieldDateBirth(){
        (this.date_birth == null) ? this.valid_date_birth = false : this.valid_date_birth = true
      }
    }
  }
</script>

<style scoped>

</style>
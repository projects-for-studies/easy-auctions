<template>
  <div class="w-100 d-flex justify-content-center" id="container-myaccount">
    <b-card class="text-left w-100">
      <b-row>
        <b-col sm="12">
          <span class="text-left d-flex align-items-end title-info">
            <b-icon icon="person-fill" class="h3"></b-icon>
            <b style="margin-left: 5px; cursor: default" class="h5">Meus dados</b>
            <span class="hr-vertical">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Editar meus dados" @click="show_form_edit_user = !show_form_edit_user" v-if="!show_form_edit_user">
              <b-icon icon="pencil-square" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Editar</span>
            </span>
            <span class="submenu-action" v-b-tooltip.hover title="Salvar alterações" v-if="show_form_edit_user">
              <b-icon icon="check-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px" @click="updateUser">Salvar</span>
            </span>
            <span class="hr-vertical" v-if="show_form_edit_user">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Cancelar" v-if="show_form_edit_user" @click="show_form_edit_user = !show_form_edit_user">
              <b-icon icon="x-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Cancelar</span>
            </span>
          </span>
        </b-col>
      </b-row>
      <b-row v-if="!show_form_edit_user">
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Nome:</span> {{ user.data.name }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Email:</span> {{ user.data.email }}
          </div>
        </b-col>
        <br/><br/>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Sexo:</span> {{ user.data.gender }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Data de Nasc.:</span> {{ new Date(user.data.date_birth).toLocaleDateString() }}
          </div>
        </b-col>
        <br/><br/>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Telefone - 1:</span> {{ user.data.telephone_1 }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Telefone - 2:</span> {{ user.data.telephone_2 }}
          </div>
        </b-col>
      </b-row>
      <b-row v-else>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Nome:*" label-for="name" style="margin-bottom: 0px">
              <b-form-input id="name" size="sm" v-model="user.data.name" :state="valid_name"
                            @blur="validFieldName"
                            @input="validFieldName"
                            aria-describedby="input-name input-feedback-name"
                            trim
              ></b-form-input>
              <b-form-invalid-feedback id="input-name input-feedback-name">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-class="font-weight-bold" label-size="sm" label="Email:*" label-for="email" style="margin-bottom: 0px">
              <b-form-input id="email" size="sm" v-model="user.data.email"
                            type="email"
                            :state="valid_email"
                            @blur="validFieldEmail"
                            @input="validFieldEmail"
                            aria-describedby="input-email input-feedback-email"
              ></b-form-input>
              <b-form-invalid-feedback id="input-feedback-email">
                Campo obrigatório, preencha por favor.
              </b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Sexo:*" label-for="gender" style="margin-bottom: 0px">
              <b-form-select id="gender" v-model="user.data.gender" :options="genderOptions" size="sm" :state="valid_gender"
                             @change="validFieldGender"
                             aria-describedby="input-gender input-feedback-gender"
              ></b-form-select>
              <b-form-invalid-feedback id="input-gender">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label="Data nasc.:*" label-class="font-weight-bold" label-for="date_birth" style="margin-bottom: 0px">
              <b-form-datepicker id="date_birth" placeholder="Selecione" dark
                                 :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                 :max="minimum_age_allowed" size="sm"
                                 :state="valid_date_birth"
                                 @blur="validFieldDateBirth"
                                 @input="validFieldDateBirth"
                                 aria-describedby="input-date-birth input-feedback-date-birth"
                                 locale="pt-BR" v-model="user.data.date_birth"></b-form-datepicker>
              <b-form-invalid-feedback id="input-feedback-date-birth">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label="Telefone - 1:*" label-class="font-weight-bold" label-for="phone_1" style="margin-bottom: 0px">
              <b-form-input id="phone_1" size="sm" v-model="user.data.telephone_1" @blur="validFieldPhone1" @input="validFieldPhone1"
                            v-mask="'(##) # ####-####'"
                            :state="valid_phone_1"
                            aria-describedby="input-phone-1 input-feedback-phone-1"
              ></b-form-input>
              <b-form-invalid-feedback id="input-feedback-phone-1">Campo obrigatório, preencha por favor</b-form-invalid-feedback>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label="Telefone - 2:" label-class="font-weight-bold" label-for="phone_2" style="margin-bottom: 0px">
              <b-form-input id="phone_2" size="sm" v-model="user.data.telephone_2" v-mask="'(##) # ####-####'" type="tel"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col sm="12">
          <br/><br/>
          <span class="text-left d-flex align-items-end title-info">
            <b-icon icon="house-door-fill" class="h3"></b-icon>
            <b style="margin-left: 5px; cursor: default" class="h5">Meu endereço</b>
            <span class="hr-vertical">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Editar meu endereço" @click="show_form_edit_address = !show_form_edit_address" v-if="!show_form_edit_address">
              <b-icon icon="pencil-square" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Editar</span>
            </span>
            <span class="submenu-action" v-b-tooltip.hover title="Salvar alterações" v-if="show_form_edit_address">
              <b-icon icon="check-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Salvar</span>
            </span>
            <span class="hr-vertical" v-if="show_form_edit_address">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Cancelar" v-if="show_form_edit_address" @click="show_form_edit_address = !show_form_edit_address">
              <b-icon icon="x-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Cancelar</span>
            </span>
          </span>
        </b-col>
      </b-row>
      <b-row v-if="!show_form_edit_address">
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Cidade:</span> {{ user.address.city }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Estado:</span> {{ user.address.state }}
          </div>
        </b-col>
        <br/><br/>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Bairro:</span> {{ user.address.district }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Rua:</span> {{ user.address.street }}
          </div>
        </b-col>
        <br/><br/>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">CEP:</span> {{ user.address.zip_code }}
          </div>
        </b-col>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Número:</span> {{ user.address.number }}
          </div>
        </b-col>
        <br/><br/>
        <b-col sm="6">
          <div class="info-user">
            <span class="font-weight-bold">Complemento:</span> {{ user.address.complement }}
          </div>
        </b-col>
        <b-col sm="6">
            <div class="info-user">
              <span class="font-weight-bold">Referência:</span> {{ user.address.reference }}
            </div>
          </b-col>
      </b-row>
      <b-row v-else>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Cidade:*" label-for="city" style="margin-bottom: 0px">
              <b-form-input id="city" size="sm" v-model="user.address.city"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Estado:*" label-for="state" style="margin-bottom: 0px">
              <b-form-input id="state" size="sm" v-model="user.address.state"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Bairro:*" label-for="district" style="margin-bottom: 0px">
              <b-form-input id="district" size="sm" v-model="user.address.district"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Rua:*" label-for="street" style="margin-bottom: 0px">
              <b-form-input id="street" size="sm" v-model="user.address.street"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="CEP:*" label-for="zip_code" style="margin-bottom: 0px">
              <b-form-input id="zip_code" size="sm" v-model="user.address.zip_code" v-mask="'#####-###'"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Número:*" label-for="number" style="margin-bottom: 0px">
              <b-form-input id="number" size="sm" v-model="user.address.number"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Complemento:" label-for="complement" style="margin-bottom: 0px">
              <b-form-input id="complement" size="sm" v-model="user.address.complement"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
        <b-col sm="6" style="margin-bottom: 10px">
          <div class="info-user">
            <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Referência:" label-for="reference" style="margin-bottom: 0px">
              <b-form-input id="reference" size="sm" v-model="user.address.reference"></b-form-input>
            </b-form-group>
          </div>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import VueMask from 'v-mask'

  Vue.use(VueMask);

  export default {
    name: "Index",
    data: () => ({
      msg: '',
      title_msg: '',
      variant_msg: '',
      valid_name: null,
      valid_email: null,
      valid_date_birth: null,
      valid_phone_1: null,
      valid_gender: null,
      show_form_edit_user: false,
      show_form_edit_address: false,
      minimum_age_allowed: new Date(new Date().getYear() + 1882, 1, new Date().getDate()),
      genderOptions: [
        { value: null, text: 'Por favor, selecione.' },
        { value: 'M', text: 'Masculino' },
        { value: 'F', text: 'Feminino' },
      ]
    }),
    computed: {
      ...mapState({
        user: state => state.authentication.user,
      })
    },
    methods:{
      updateUser(){
        if(this.validAllFieldsBeforeSubmit()){
          console.log('Usuário atualizado!')
        }
      },
      validAllFieldsBeforeSubmit(){
        this.validFieldName();
        this.validFieldEmail();
        this.validFieldGender();
        this.validFieldDateBirth();
        this.validFieldPhone1();
        if(this.valid_name && this.valid_email && this.valid_gender && this.valid_date_birth && this.valid_phone_1){
          return true;
        }else{
          return false;
        }
      },
      validFieldName(){
        let name_valid = new RegExp(/^[a-záàâãéèêíïóôõöúçñ ]+$/i);
        (!name_valid.test(this.user.data.name) || this.user.data.name.trim().length < 10) ? this.valid_name = false : this.valid_name = true
      },
      validFieldEmail(){
        let email_valid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        (!email_valid.test(this.user.data.email)) ? this.valid_email = false : this.valid_email = true
      },
      validFieldGender(){
        (this.user.data.gender == null) ? this.valid_gender = false : this.valid_gender = true
      },
      validFieldPhone1(){
        (this.user.data.telephone_1.trim().length < 11) ? this.valid_phone_1 = false : this.valid_phone_1 = true
      },
      validFieldDateBirth(){
        (this.user.data.date_birth == null) ? this.valid_date_birth = false : this.valid_date_birth = true
      }
    }
  }
</script>

<style scoped>
  #container-myaccount{
    padding-top: 20px;
  }
  .info-user{
    width: 100%;
    border-radius: 0.25rem;
    padding: 0.5rem;
    color: #383d41;
    background-color: #d6d8db;
    font-size: 0.9em;
    border-left: 5px solid rgba(0, 0, 0, 0.125);
  }
  .title-info{
    margin-bottom: 15px;
    border-bottom: 1px solid #2c3e50;
  }
  .submenu-action{
    cursor: pointer;
    display: flex;
    align-items: flex-end;
    margin: 0px 5px 2px 5px;
  }
  .submenu-action:hover{
    color: #000000;
  }
  .hr-vertical{
    cursor: default;
    margin: 0px 10px 8px 10px;
  }
</style>
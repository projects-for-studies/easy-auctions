<template>
  <div class="w-100 d-flex justify-content-center" id="container-myaccount">
      <message-alert :data="alert"/>
      <confirmation :data="confirm"/>
      <b-card class="text-left w-100">
        <b-row>
          <b-col sm="12">
          <span class="text-left d-flex align-items-end title-info">
            <b-icon icon="person-fill" class="h3"></b-icon>
            <b style="margin-left: 5px; cursor: default" class="h5">Meus dados</b>
            <span class="hr-vertical">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Editar meus dados" @click="changeFormEditUser(false)" v-if="disabled_form_edit_user">
              <b-icon icon="pencil-square" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Editar</span>
            </span>
            <span class="submenu-action" v-b-tooltip.hover title="Salvar alterações" v-if="!disabled_form_edit_user">
              <b-icon icon="check-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px" @click="updateUser">Salvar</span>
            </span>
            <span class="hr-vertical" v-if="!disabled_form_edit_user">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Cancelar" v-if="!disabled_form_edit_user" @click="changeFormEditUser(true)">
              <b-icon icon="x-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Cancelar</span>
            </span>
          </span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="10">
            <b-row>
              <b-col sm="6" style="margin-bottom: 10px">
                <div class="info-user">
                  <b-form-group label-cols="3" label-size="sm" label-class="font-weight-bold" label="Nome:*" label-for="name" style="margin-bottom: 0px">
                    <b-form-input id="name" size="sm" v-model="form.user.name" :state="valid_name"
                                  @blur="validFieldName"
                                  @input="validFieldName"
                                  :disabled="disabled_form_edit_user"
                                  aria-describedby="input-name input-feedback-name"
                                  trim
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-name input-feedback-name">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
                  </b-form-group>
                </div>
              </b-col>
              <b-col sm="6" style="margin-bottom: 10px">
                <div class="info-user">
                  <b-form-group label-cols="3" label-class="font-weight-bold" label-size="sm" label="Email:*" label-for="email" style="margin-bottom: 0px">
                    <b-form-input id="email" size="sm" v-model="form.user.email"
                                  type="email"
                                  :disabled="disabled_form_edit_user"
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
                  <b-form-group label-cols="3" label-size="sm" label-class="font-weight-bold" label="Sexo:*" label-for="gender" style="margin-bottom: 0px">
                    <b-form-select id="gender" v-model="form.user.gender" :options="genderOptions" size="sm" :state="valid_gender"
                                   @change="validFieldGender" :disabled="disabled_form_edit_user"
                                   aria-describedby="input-gender input-feedback-gender"
                    ></b-form-select>
                    <b-form-invalid-feedback id="input-gender">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
                  </b-form-group>
                </div>
              </b-col>
              <b-col sm="6" style="margin-bottom: 10px">
                <div class="info-user">
                  <b-form-group label-cols="3" label-size="sm" label="Data nasc.:*" label-class="font-weight-bold" label-for="date_birth" style="margin-bottom: 0px">
                    <b-form-datepicker id="date_birth" placeholder="Selecione" dark
                                       :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                                       :max="minimum_age_allowed" size="sm"
                                       :state="valid_date_birth" :disabled="disabled_form_edit_user"
                                       @blur="validFieldDateBirth"
                                       @input="validFieldDateBirth"
                                       aria-describedby="input-date-birth input-feedback-date-birth"
                                       locale="pt-BR" v-model="form.user.date_birth"></b-form-datepicker>
                    <b-form-invalid-feedback id="input-feedback-date-birth">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
                  </b-form-group>
                </div>
              </b-col>
              <b-col sm="6">
                <div class="info-user">
                  <b-form-group label-cols="3" label-size="sm" label="Telefone - 1:*" label-class="font-weight-bold" label-for="phone_1" style="margin-bottom: 0px">
                    <b-form-input id="phone_1" size="sm" v-model="form.user.telephone_1" @blur="validFieldPhone1" @input="validFieldPhone1"
                                  :state="valid_phone_1" :disabled="disabled_form_edit_user" v-mask="['(##) ####-####', '(##) # ####-####']"
                                  aria-describedby="input-phone-1 input-feedback-phone-1"
                    ></b-form-input>
                    <b-form-invalid-feedback id="input-feedback-phone-1">Campo obrigatório, preencha por favor</b-form-invalid-feedback>
                  </b-form-group>
                </div>
              </b-col>
              <b-col sm="6">
                <div class="info-user">
                  <b-form-group label-cols="3" label-size="sm" label="Telefone - 2:" label-class="font-weight-bold" label-for="phone_2" style="margin-bottom: 0px">
                    <b-form-input id="phone_2" size="sm" v-mask="['(##) ####-####', '(##) # ####-####']" v-model="form.user.telephone_2" :disabled="disabled_form_edit_user" type="tel"></b-form-input>
                  </b-form-group>
                </div>
              </b-col>
            </b-row>
          </b-col>
          <b-col sm="2">
            <b-form-file v-model="picture" accept=".jpeg, .jpg, .png, .svg" id="picture" class="mt-3" v-show="false" plain></b-form-file>
            <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; padding: 0px">
              <div class="profile_picture_configs" @mouseover="showConfigPicture(true)" @mouseleave="showConfigPicture(false)">
                <div class="d-flex h-50 w-100 justify-content-end align-items-end" v-if="showPicture">
                  <div class="d-flex w-100 justify-content-center align-items-center" style="margin-bottom: 5px">
                    <b-button size="sm" variant="outline-light" class="w-75" @click="selectedPicture" v-if="picture == null">
                      <b-icon icon="pencil-square" aria-hidden="true"></b-icon> Alterar
                    </b-button>
                    <b-button size="sm" variant="outline-primary" class="w-75" @click="changePicture" v-else>
                      <b-icon icon="upload" aria-hidden="true"></b-icon> Salvar
                    </b-button>
                  </div>
                </div>
                <div class="d-flex h-50 w-100 justify-content-end align-items-start" v-if="showPicture">
                  <div class="d-flex w-100 justify-content-center align-items-center" style="margin-top: 5px">
                    <b-button size="sm" variant="outline-danger" class="w-75" v-if="picture == null && profile_actually != null && profile_actually != ''" @click="showConfirmationDeletePicture">
                      <b-icon icon="trash" aria-hidden="true"></b-icon> Apagar
                    </b-button>
                    <b-button size="sm" variant="outline-danger" class="w-75" @click="picture = null" v-else-if="picture != null">
                      <b-icon icon="x-circle" aria-hidden="true"></b-icon> Cancelar
                    </b-button>
                  </div>
                </div>
              </div>
              <img id="show_picture" :src="`${urlProfilePicture}/profile_picture_default.jpg`" class="profile_picture"/>
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
            <span class="submenu-action" v-b-tooltip.hover :title="user_has_address == true ? 'Editar meu endereço' : 'Adicionar meu endereço'" @click="changeFormEditAddress(false)" v-if="disabled_form_edit_address">
              <b-icon icon="pencil-square" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">{{ user_has_address == true ? 'Editar' : 'Adicionar' }}</span>
            </span>
            <span class="submenu-action" v-b-tooltip.hover title="Salvar alterações" v-if="!disabled_form_edit_address" @click="updateUserAddress">
              <b-icon icon="check-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Salvar</span>
            </span>
            <span class="hr-vertical" v-if="!disabled_form_edit_address">|</span>
            <span class="submenu-action" v-b-tooltip.hover title="Cancelar" v-if="!disabled_form_edit_address" @click="changeFormEditAddress(true)">
              <b-icon icon="x-square-fill" class="h5"></b-icon>
              <span class="h6" style="margin-left: 5px">Cancelar</span>
            </span>
          </span>
          </b-col>
        </b-row>
        <b-row>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Cidade:*" label-for="city" style="margin-bottom: 0px">
                <b-form-input id="city" size="sm" v-model="form.address.city" :disabled="disabled_form_edit_address"
                              @blur="validFieldCity"
                              @input="validFieldCity"
                              :state="valid_city"
                              aria-describedby="input-city input-feedback-city"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-city input-feedback-city">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Estado:*" label-for="state" style="margin-bottom: 0px">
                <b-form-input id="state" size="sm" v-model="form.address.state" :disabled="disabled_form_edit_address"
                              @blur="validFieldState"
                              @input="validFieldState"
                              :state="valid_state"
                              aria-describedby="input-state input-feedback-state"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-state input-feedback-state">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Bairro:*" label-for="district" style="margin-bottom: 0px">
                <b-form-input id="district" size="sm" v-model="form.address.district" :disabled="disabled_form_edit_address"
                              @blur="validFieldDistrict"
                              @input="validFieldDistrict"
                              :state="valid_district"
                              aria-describedby="input-district input-feedback-district"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-district input-feedback-district">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Rua:*" label-for="street" style="margin-bottom: 0px">
                <b-form-input id="street" size="sm" v-model="form.address.street" :disabled="disabled_form_edit_address"
                              @blur="validFieldStreet"
                              @input="validFieldStreet"
                              :state="valid_street"
                              aria-describedby="input-street input-feedback-street"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-street input-feedback-street">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="CEP:*" label-for="zip_code" style="margin-bottom: 0px">
                <b-form-input id="zip_code" size="sm" v-model="form.address.zip_code" v-mask="'#####-###'" :disabled="disabled_form_edit_address"
                              @blur="validFieldZipCode"
                              @input="validFieldZipCode"
                              :state="valid_zip_code"
                              aria-describedby="input-zip-code input-feedback-zip-code"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-zip-code input-feedback-zip-code">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Número:*" label-for="number" style="margin-bottom: 0px">
                <b-form-input id="number" size="sm" v-model="form.address.number" :disabled="disabled_form_edit_address"
                              @blur="validFieldNumber"
                              @input="validFieldNumber"
                              :state="valid_number"
                              aria-describedby="input-number input-feedback-number"
                              trim
                ></b-form-input>
                <b-form-invalid-feedback id="input-number input-feedback-number">Campo obrigatório, preencha por favor.</b-form-invalid-feedback>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Complemento:" label-for="complement" style="margin-bottom: 0px">
                <b-form-input id="complement" size="sm" v-model="form.address.complement" :disabled="disabled_form_edit_address"></b-form-input>
              </b-form-group>
            </div>
          </b-col>
          <b-col sm="6" style="margin-bottom: 10px">
            <div class="info-user">
              <b-form-group label-cols="2" label-cols-lg="2" label-size="sm" label-class="font-weight-bold" label="Referência:" label-for="reference" style="margin-bottom: 0px">
                <b-form-input id="reference" size="sm" v-model="form.address.reference" :disabled="disabled_form_edit_address"></b-form-input>
              </b-form-group>
            </div>
          </b-col>
        </b-row>
      </b-card>
    </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { baseProfilePicture } from "../../../constants";
  import { update, getDataUser, uploadProfilePicture, deleteProfilePicture } from "../../../services/user/Authentication";
  import { updateAddress } from "../../../services/user/Address"
  import Messages from "../../../components/Messages";
  import Confirmation from "../../../components/Confirmation";

  export default {
    name: "Index",
    data: () => ({
      urlProfilePicture: baseProfilePicture,
      showPicture: false,
      user_has_address: null,
      picture: null,
      show: false,
      msg: '',
      title_msg: '',
      user_data: {
        data: {},
        address: {}
      },
      variant_msg: '',
      valid_city: null,
      valid_state: null,
      valid_district: null,
      valid_street: null,
      valid_zip_code: null,
      valid_number: null,
      valid_name: null,
      valid_email: null,
      valid_date_birth: null,
      valid_phone_1: null,
      valid_gender: null,
      disabled_form_edit_user: true,
      disabled_form_edit_address: true,
      minimum_age_allowed: new Date(new Date().getYear() + 1882, 1, new Date().getDate()),
      form:{
        user:{
          name: '',
          email: '',
          gender: '',
          date_birth: null,
          telephone_1: '',
          telephone_2: '',
        },
        address:{
          city: '',
          state: '',
          district: '',
          street: '',
          zip_code: '',
          number: '',
          complement: '',
          reference: '',
        }
      },
      genderOptions: [
        { value: null, text: 'Por favor, selecione.' },
        { value: 'M', text: 'Masculino' },
        { value: 'F', text: 'Feminino' },
      ],
      confirm:{
        id: 'confirmation-delete-picture',
        show: true,
        body: '',
        header:{
          title: '',
          close_header_action: () => {}
        },
        footer: {
          ok: true,
          ok_title: 'Confirmar',
          ok_action: () => {},
          cancel: true,
          cancel_title: 'Cancelar',
          cancel_action: () => {}
        },
      }
    }),
    components:{
      "message-alert": Messages,
      "confirmation": Confirmation
    },
    computed: {
      ...mapState('authentication',  [ 'session', 'alert' ]),
      profile_actually: function (){
        return this.user_data.data.photo;
      }
    },
    watch:{
      picture: function (val){
        let img = document.getElementById('show_picture')
        if(val != null){
          let f = new FileReader();
          f.onload = function(e){
            img.src = e.target.result;
          }
          f.readAsDataURL(val);
        }else{
          if(this.profile_actually != null){
            img.src = `${this.urlProfilePicture}/${this.user_data.data.photo}`
          }else{
            img.src = `${this.urlProfilePicture}/profile_picture_default.jpg`
          }
        }
      },
      profile_actually: function (val){
        let img = document.getElementById('show_picture')
        if(val != null){
          img.src = `${this.urlProfilePicture}/${val}`
        }else{
          img.src = `${this.urlProfilePicture}/profile_picture_default.jpg`
        }
      }
    },
    created() {
      this.getUser()
    },
    methods:{
      showConfirmationDeletePicture(){
        this.confirm.header.title = 'Apagar foto de perfil'
        this.confirm.body = 'Ao apagar a foto, não será possvível resgatar a mesma.<br/> Tem certeza de que deseja apagar sua atual foto de perfil?'
        this.confirm.header.close_header_action = () => {
          this.$bvModal.hide('confirmation-delete-picture')
        }
        this.confirm.footer.ok_action = () => {
          this.$bvModal.hide('confirmation-delete-picture')
          this.deletePicture()
        }
        this.confirm.footer.cancel_action = () => {
          this.$bvModal.hide('confirmation-delete-picture')
        }
        this.$bvModal.show('confirmation-delete-picture')
      },
      deletePicture(){
        deleteProfilePicture(this.session.user.id, this.session.config)
        .then(res => {
          if(res.data.status){
            this.user_data.data.photo = null
            this.$store.commit('authentication/SET_PROFILE_PICTURE', "profile_picture_default.jpg")
            this.$store.commit('authentication/SET_ALERT', {
              id: 'success_delete_picture_profile',
              type: 'success',
              message: 'Foto de perfil apagada com sucesso!',
              body_variant: 'success',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          }else{
            this.$store.commit('authentication/SET_ALERT', {
              id: 'error_delete_picture_profile',
              type: 'error',
              message: 'Ocorreu um erro ao tentar apagar sua foto de perfil, por favor tente novamente.',
              body_variant: 'danger',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          }
        }).catch(() => {
          this.$store.commit('authentication/SET_ALERT', {
            id: 'error_delete_picture_profile',
            type: 'error',
            message: 'Ocorreu um erro ao tentar apagar sua foto de perfil, por favor tente novamente.',
            body_variant: 'danger',
            text_variant: 'light',
            show: true,
            blocked: false,
            redirect: false,
            path: '',
            time: 5000
          })
        })
      },
      changePicture(){
        let formData = new FormData();
        formData.append('filename', this.picture)
        uploadProfilePicture(this.session.user.id, formData, this.session.config)
        .then(res => {
          if(res.data.status){
            this.user_data.data.photo = res.data.data
            this.$store.commit('authentication/SET_PROFILE_PICTURE', res.data.data)
            this.picture = null
            this.$store.commit('authentication/SET_ALERT', {
              id: 'success_update_picture_profile',
              type: 'success',
              message: 'Foto de perfil atualizada com sucesso!',
              body_variant: 'success',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          }else{
            this.$store.commit('authentication/SET_ALERT', {
              id: 'error_update_picture_profile',
              type: 'error',
              message: 'Ocorreu um erro ao tentar atualizar sua foto de perfil, por favor tente novamente.',
              body_variant: 'danger',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          }
        })
        .catch(() => {
          this.$store.commit('authentication/SET_ALERT', {
            id: 'error_update_picture_profile',
            type: 'error',
            message: 'Ocorreu um erro ao tentar atualizar sua foto de perfil, por favor tente novamente.',
            body_variant: 'danger',
            text_variant: 'light',
            show: true,
            blocked: false,
            redirect: false,
            path: '',
            time: 5000
          })
        })
      },
      selectedPicture(){
        document.getElementById('picture').click()
      },
      showConfigPicture(bool){
        this.showPicture = bool
      },
      getUser(){
        let body = {
          id: this.session.user.id,
          config: this.session.config,
        }
        getDataUser(body)
        .then(res => {
          this.$store.commit('authentication/SET_USER', res.data.user.name)
          this.$store.commit('authentication/SET_PROFILE_PICTURE', res.data.user.photo)
          this.setDataInFields(res.data.user, res.data.address)
          this.user_data.data = res.data.user
          this.user_data.address = res.data.address
        })
        .catch(() => {
          this.$store.commit('authentication/SET_ALERT', {
            id: 'error_get_user',
            type: 'error',
            message: 'Ocorreu um erro pegar suas informações, por favor tente novamente.',
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
      setDataInFields(user, address){
        this.form.user = user
        this.form.address = address == null ? {city: '', state: '', district: '', street: '', zip_code: '', number: '', complement: '', reference: ''} : address
        if(address == null){
          this.user_has_address = null
        }else{
          this.user_has_address = true
        }
      },
      changeFormEditUser(cancel){
        this.disabled_form_edit_user = !this.disabled_form_edit_user
        if(cancel) {
          this.getUser()
        }else{
          this.setDataInFields(this.user_data.data, this.user_data.address)
        }
        this.valid_name = null
        this.valid_email = null
        this.valid_gender = null
        this.valid_date_birth = null
        this.valid_phone_1 = null
      },
      changeFormEditAddress(cancel){
        this.disabled_form_edit_address = !this.disabled_form_edit_address
        if(cancel) {
          this.getUser()
        }else{
          this.setDataInFields(this.user_data.data, this.user_data.address)
        }
        this.valid_city = null
        this.valid_state = null
        this.valid_district = null
        this.valid_street = null
        this.valid_zip_code = null
        this.valid_number = null
      },
      updateUser(){
        if(this.validAllFieldsBeforeSubmit()){
          update({ id: this.session.user.id, body: this.form.user, config: this.session.config })
          .then(res => {
            if(res.data.status == 'success'){
              this.getUser()
              this.changeFormEditUser(false)
              this.$store.commit('authentication/SET_USER', res.data.user.name)
              this.$store.commit('authentication/SET_ALERT', {
                  id: 'success_update_user',
                  type: 'success',
                  message: 'Informaçoes atualizadas com sucesso!',
                  body_variant: 'success',
                  text_variant: 'light',
                  show: true,
                  blocked: false,
                  redirect: false,
                  path: '',
                  time: 5000
                })
            }else{
              this.$store.commit('authentication/SET_ALERT', {
                id: 'error_update_user',
                type: 'error',
                message: 'Ocorreu um erro ao tentar atualizar suas informaçoes, por favor tente novamente.',
                body_variant: 'danger',
                text_variant: 'light',
                show: true,
                blocked: false,
                redirect: false,
                path: '',
                time: 5000
              })
            }
          })
          .catch(() => {
            this.$store.commit('authentication/SET_ALERT', {
              id: 'error_update_user',
              type: 'error',
              message: 'Ocorreu um erro ao tentar atualizar suas informaçoes, por favor tente novamente.',
              body_variant: 'danger',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          })
        }
      },
      updateUserAddress(){
        if(this.validAllFieldsAddressBeforeSubmit()){
          updateAddress({ id: this.session.user.id, address: this.form.address, config: this.session.config })
          .then(res => {
            if(res.data.status == 'success'){
              this.getUser()
              this.changeFormEditAddress(false)
              this.$store.commit('authentication/SET_ALERT', {
                id: 'success_update_address',
                type: 'success',
                message: 'Informaçoes de endereço atualizadas com sucesso!',
                body_variant: 'success',
                text_variant: 'light',
                show: true,
                blocked: false,
                redirect: false,
                path: '',
                time: 5000
              })
            }else{
              this.$store.commit('authentication/SET_ALERT', {
                id: 'error_update_address',
                type: 'error',
                message: 'Ocorreu um erro ao tentar atualizar suas informaçoes de endereço, por favor tente novamente.',
                body_variant: 'danger',
                text_variant: 'light',
                show: true,
                blocked: false,
                redirect: false,
                path: '',
                time: 5000
              })
            }
          })
          .catch(() => {
            this.$store.commit('authentication/SET_ALERT', {
              id: 'error_update_address',
              type: 'error',
              message: 'Ocorreu um erro ao tentar atualizar suas informaçoes de endereço, por favor tente novamente.',
              body_variant: 'danger',
              text_variant: 'light',
              show: true,
              blocked: false,
              redirect: false,
              path: '',
              time: 5000
            })
          })
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
      validAllFieldsAddressBeforeSubmit(){
        this.validFieldCity()
        this.validFieldState()
        this.validFieldStreet()
        this.validFieldDistrict()
        this.validFieldZipCode()
        this.validFieldNumber()
        if(this.valid_city && this.valid_state && this.valid_street && this.valid_district && this.valid_zip_code && this.valid_number){
          return true;
        }else{
          return false;
        }
      },
      validFieldName(){
        let name_valid = new RegExp(/^[a-záàâãéèêíïóôõöúçñ ]+$/i);
        (!name_valid.test(this.form.user.name) || this.form.user.name.trim().length < 10) ? this.valid_name = false : this.valid_name = true
      },
      validFieldEmail(){
        let email_valid = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        (!email_valid.test(this.form.user.email)) ? this.valid_email = false : this.valid_email = true
      },
      validFieldGender(){
        (this.form.user.gender == null) ? this.valid_gender = false : this.valid_gender = true
      },
      validFieldPhone1(){
        (this.form.user.telephone_1.trim().length < 11) ? this.valid_phone_1 = false : this.valid_phone_1 = true
      },
      validFieldDateBirth(){
        (this.form.user.date_birth == null) ? this.valid_date_birth = false : this.valid_date_birth = true
      },
      validFieldCity(){
        let city_valid = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0 123456789]+$/);
        (!city_valid.test(this.form.address.city) || this.form.address.city.trim().length === 0) ? this.valid_city = false : this.valid_city = true
      },
      validFieldState(){
        let state_valid = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0 123456789]+$/);
        (!state_valid.test(this.form.address.state) || this.form.address.state.trim().length === 0) ? this.valid_state = false : this.valid_state = true
      },
      validFieldDistrict(){
        let district_valid = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0 123456789]+$/);
        (!district_valid.test(this.form.address.district) || this.form.address.district.trim().length === 0) ? this.valid_district = false : this.valid_district = true
      },
      validFieldZipCode(){
        (this.form.address.zip_code.trim().length < 9) ? this.valid_zip_code = false : this.valid_zip_code = true
      },
      validFieldStreet(){
        let street_valid = new RegExp(/^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ0 123456789]+$/);
        (!street_valid.test(this.form.address.street) || this.form.address.street.trim().length === 0) ? this.valid_street = false : this.valid_street = true
      },
      validFieldNumber(){
        (this.form.address.number.trim().length == 0) ? this.valid_number = false : this.valid_number = true
      },
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
  .profile_picture{
    width: 150px;
    height: 160px;
    border: none;
    border-radius: 0.25rem;
  }
  .profile_picture_configs{
    width: 150px;
    height: 160px;
    cursor: pointer;
    border: none;
    border-radius: 0.25rem;
    z-index: 999;
    position: absolute;
    background: rgba(0,0,0,.0);
  }
  .profile_picture_configs:hover{
    background: rgba(0,0,0,.8);
  }
</style>
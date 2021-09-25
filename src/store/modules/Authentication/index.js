import { log_out, log_in, getDataUser } from "../../../services/user/Authentication";

export const Authentication = {
  state: () => ({
    session: {
      adress: undefined,
      user: undefined,
      headers: undefined
    },
    user:{},
    alert:{
      id: '',
      type: '',
      message: '',
      body_variant: '',
      text_variant: '',
      show: false,
      blocked: false,
      time: 5000,
    }
  }),
  namespaced: true,
  actions: {
    login ({ commit }, data) {
      log_in(data.email, data.password)
        .then(res => {
          let session = { user: res.data.data, headers: res.headers }
          data.session.set('current_user', JSON.stringify(session))
          commit('SET_SESSION', JSON.stringify(session))
          commit('SET_USER', { info: session.user.user, address: session.user.adress })
          commit('SET_ALERT', {
            id: 'success_login',
            type: 'success',
            message: 'Login realizado com sucesso!',
            body_variant: 'success',
            text_variant: 'light',
            show: true,
            blocked: true,
            redirect: true,
            path: '/home',
            time: 1000
          })
        })
        .catch(() => {
          commit('SET_ALERT', {
            id: 'error_login',
            type: 'error',
            message: 'Ocorreu um erro, verifique seus dados e tente novamente.',
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
    logout ({ commit }, data) {
      log_out(data.config)
        .then(() => {
          data.session.destroy()
          data.router.push('/entrar')
        })
        .catch(() => {
          commit('SET_ALERT', {
            id: 'error_logout',
            type: 'error',
            message: 'Ocorreu um erro ao tentar sair, por favor tente novamente.',
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
    get_ser ({ commit }, data){
      if(typeof (data) != "undefined"){
        let session = JSON.parse(data)
        let body = {
          id: session.user.user.id,
          config: session.headers,
        }
        getDataUser(body)
          .then(res => {
            commit('SET_USER', { info: res.data.user, address: res.data.address })
          })
          .catch(() => {
            commit('SET_ALERT', {
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
      }
    }
  },
  mutations: {
    SET_SESSION (state, session){
      if(typeof (session) != "undefined"){
        let s = JSON.parse(session)
        state.session.user = s.user.user
        state.session.adress = s.user.adress
        state.session.config = s.headers
      }
    },
    SET_ALERT (state, msg){
      state.alert = msg
    },
    SET_USER (state, data){
      state.user.data = data.info
      state.user.address = data.address
    }
  },
  getters: {}
}
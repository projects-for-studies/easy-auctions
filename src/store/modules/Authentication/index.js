import { log_out, log_in } from "../../../services/user/Authentication";

export const Authentication = {
  state: () => ({
    session: {
      adress: undefined,
      user: undefined,
      config: undefined
    },
    errors: []
  }),
  namespaced: true,
  actions: {
    login ({ commit }, data) {
      log_in(data.email, data.password)
      .then(res => {
        let session = { user: res.data.data, headers: res.headers }
        data.session.set('current_user', JSON.stringify(session))
        commit('SET_SESSION', JSON.stringify(session))
        data.router.push('/home')
      })
      .catch(() => {
        commit('SET_ERRORS', 'Credenciais de login inválidas.')
      })
    },
    logout ({ commit }, data) {
      log_out(data.config)
        .then(() => {
          data.session.destroy()
          data.router.push('/entrar')
        })
        .catch(err => {
          console.log(err.response)
          commit('SET_ERRORS', err.response.data.errors)
        })
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
    SET_ERRORS (state, err){
      state.errors = []
      state.errors.push(err)
    }
  },
  getters: {}
}
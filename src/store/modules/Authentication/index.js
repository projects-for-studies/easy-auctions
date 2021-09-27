export const Authentication = {
  state: () => ({
    session: {
      adress: undefined,
      user: undefined,
      headers: undefined
    },
    user: '',
    picture_current_user: 'profile_picture_default.jpg',
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
  actions: {},
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
    SET_USER (state, name){
      state.user = name
    },
    SET_PROFILE_PICTURE(state, picture){
      state.picture_current_user = picture
    }
  },
  getters: {}
}
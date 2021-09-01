import Vue from 'vue'
import Vuex from 'vuex'
import { Authentication } from './modules/Authentication/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  actions: {},
  mutations: {},
  getters: {},
  modules: {
    authentication: Authentication
  }
})
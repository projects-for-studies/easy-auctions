import Vue from 'vue'
import App from './App.vue'
import store from './store'
import VueSession from 'vue-session'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueSession)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

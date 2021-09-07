import Vue from "vue";
import VueRouter from "vue-router";
import VueSession from 'vue-session'

Vue.use(VueRouter);
Vue.use(VueSession);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/app/Index'),
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "home" */ '../views/app/Home/Index')
      },
      {
        path: '/minha-conta',
        name: 'Minha_Conta',
        component: () => import(/* webpackChunkName: "home" */ '../views/app/MyAccount/Index')
      }
    ]
  },
  {
    path: '/entrar',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/app/Authentication/Login')
  },
  {
    path: '/cadastrar',
    name: 'Register',
    component: () => import(/* webpackChunkName: "home" */ '../views/app/Authentication/Register')
  }
]

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
  hashbang: false,
  history: true,
});

router.beforeEach((to, from, next) => {
  const publicPages = ['/entrar', '/cadastrar'];
  const authRequired = publicPages.includes(to.path);
  const loggedIn = Vue.prototype.$session.get('current_user');

  if (!authRequired && !loggedIn) {
    return next('/entrar');
  }

  if(loggedIn && authRequired){
    return next('/home');
  }

  next();
})

export default router;

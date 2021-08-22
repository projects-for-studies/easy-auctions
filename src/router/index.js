import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import(/* webpackChunkName: "index" */ '../views/app/Index')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/app/Home/Index')
  },
  {
    path: '/entrar',
    name: 'Login',
    component: () => import(/* webpackChunkName: "home" */ '../views/app/Authentication/Login')
  }
]

const router = new VueRouter({
  linkActiveClass: "active",
  routes,
  mode: "history",
  hashbang: false,
  history: true,
});

export default router;

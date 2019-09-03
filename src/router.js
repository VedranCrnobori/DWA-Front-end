import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Registracija from './views/Registracija.vue'
import Prijava from './views/Prijava.vue'
import About from './views/About.vue'
import Skripte from './views/Skripte.vue'
import Novosti from './views/Novosti.vue'
import Profil from './views/Profil.vue'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/registracija',
      name: 'registracija',
      component: Registracija
    },
    {
      path: '/prijava',
      name: 'prijava',
      component: Prijava,
      props: true
    },
    {
      path: '/o-nama',
      name: 'o nama',
      component: About
    },
    {
      path: '/skripte',
      name: 'skripte',
      component: Skripte
    },
    {
      path: '/profil',
      name: 'profil',
      component: Profil
    },
    {
      path: '/novosti',
      name: 'novosti',
      component: Novosti
    }
  ]
})

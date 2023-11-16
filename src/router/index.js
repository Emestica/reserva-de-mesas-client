import { createRouter, createWebHistory } from 'vue-router'

import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ForgotPassword from '../views/ForgotPasswordView.vue'

import HomeView from '../views/HomeView.vue'
import RolesView from '../views/catalogos/RolesView.vue'
import PersonasView from '../views/catalogos/PersonasView.vue'
import UsuariosView from '../views/catalogos/UsuariosView.vue'
import ClasificacionView from '../views/catalogos/ClasificacionView.vue'
import MenuView from '../views/catalogos/MenuView.vue'
import MesasView from '../views/catalogos/MesasView.vue'
import RestauranteView from '../views/catalogos/RestauranteView.vue'
import ReservacionView from '../views/catalogos/ReservacionView.vue'
import Prueba from '../views/pruebas/PruebaView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/prueba',
    name: 'prueba',
    component: Prueba
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/roles',
    name: 'roles',
    component: RolesView
  },
  {
    path: '/personas',
    name: 'personas',
    component: PersonasView
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView
  },
  {
    path: '/clasificacion',
    name: 'clasificacion',
    component: ClasificacionView
  },
  {
    path: '/menu',
    name: 'Menu',
    component: MenuView
  },
  {
    path: '/mesas',
    name: 'Mesas',
    component: MesasView
  },
  {
    path: '/restaurante',
    name: 'Restaurante',
    component: RestauranteView
  },
  {
    path: '/reservacion',
    name: 'Reservacion',
    component: ReservacionView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

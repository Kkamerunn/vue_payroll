import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import Payrolls from '../views/Payrolls.vue'
import Account from '../views/Account.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Payrolls',
      component: Payrolls
    },
    {
      path: '/account',
      name: 'Account',
      component: Account
    }
  ]
})

export default router

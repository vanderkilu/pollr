import Vue from 'vue'
import Router from 'vue-router'
import Auth from './components/Auth.vue'
import Signup from './components/Signup.vue'
import Login from './components/Login.vue'
import PollContainer from './components/PollContainer.vue'
import Polls from './components/Polls.vue'
import PollCreate from './components/PollCreate.vue'
import PollDetail from './components/PollDetail.vue'
import PollEdit from './components/PollEdit.vue'
import PollSearch from './components/PollSearch.vue'
import Home from './components/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      name: 'home',
      component: Home,
    },
    {
      path: '/auth',
      name: 'auth',
      component: Auth,
      children: [
        {
          path: '/',
          name: 'login',
          component: Login,
        },
        {
          path: 'signup',
          name: 'signup',
          component: Signup,
        }
      ]
    },
    {
      path: '/pollContainer',
      name: 'pollContainer',
      component: PollContainer,
      children: [
        {
          path: '/',
          name: 'polls',
          component: Polls,
        },
        {
          path: 'create',
          name: 'create',
          component: PollCreate,
        },
        {
          path: 'poll/:id',
          name: 'poll-detail',
          component: PollDetail
        },
        {
          path: '/:id/edit',
          name: 'edit',
          component: PollEdit,
        },
      ]
    },
    {
      path: '/search',
      name: 'search',
      component: PollSearch,
    }

  ]

});

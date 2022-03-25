import Vue from 'vue'
import Vuex from 'vuex'
import { API } from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userItem: {},
    users: [],
    responseMsg: null,
  },

  getters: {
    getUserItem(state) {
      return state.userItem
    },

    getUsers(state) {
      return state.users
    },

    getResponseMsg(state) {
      return state.responseMsg
    }
  },

  mutations: {
    setUserItem(state, data) {
      state.userItem = data
    },

    setUsers(state, data) {
      state.users = data
    },

    setResponseMsg(state, data) {
      state.responseMsg = data
    },

    resetResponseMsg(state) {
      state.responseMsg = null
    },
  },

  actions: {
    getUsers(context) {
      return new Promise((resolve, reject) => {
        API.get('/users?per_page=10')
          .then((response) => {
            context.commit('setUsers', response.data.data)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    getUserItem(context, user_id) {
      return new Promise((resolve, reject) => {
        API.get(`/users/${user_id}`)
          .then((response) => {
            context.commit('setUserItem', response.data)
            resolve(response)
          })
          .catch((error) => {
            console.log(error)
            reject(error)
          })
      })
    },

    createUser(context, user) {
      return new Promise((resolve, reject) => {
        API.post('/users', user)
          .then((response) => {
            context.commit('setResponseMsg', response.data)
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    }

  }
})

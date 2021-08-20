import Vue from 'vue'
import Vuex from 'vuex'
import {withAuth} from '../backend/axios'
// import axios from 'axios'

// const API_URL = 'http://localhost:3000'

// const token = window.localStorage.getItem('token')

// console.log(token)
// const withAuth = axios.create({
  // baseURL: API_URL,
  // headers: {
    // 'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`
  // }
// })

// export const withoutAuth = axios.create({
  // baseURL: API_URL,
  // headers: {
    // 'Content-Type': 'application/json'
  // }
// })

Vue.use(Vuex)
console.log(withAuth)

const storeData = {
  state: {
    todos: []
  },
  actions: {
    async getTodos({commit}){
      try {
        const response = await withAuth.get('/todos')
        commit('SET_TODOS', response)
      } catch (error){
        console.log(error)
      }
    }
  },
  mutations: {
    SET_TODOS(state, todos) {
      state.todos = todos
    }
  }
}

const store = new Vuex.Store(storeData)

export default store

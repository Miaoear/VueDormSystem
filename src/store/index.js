/* npm install vuex-along --save */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: ''
  },
  mutations: {
    setUserId (state, data) {
      console.log('用户名：' + data)
      state.userId = data
    }
  },
  actions: {
    
  },
  getters: {
    getUserId (state) {
      console.log('用户名2：' + state.userId)
      return state.userId
    }
  }
})

export default store
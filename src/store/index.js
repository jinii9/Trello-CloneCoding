import Vue from 'vue'
import Vuex from 'vuex'
import * as api from '../api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isAddBoard: false,
    boards: [] // 리스트 추가
  },
  mutations: {
    SET_IS_ADD_BOARD (state, toggle) {
      state.isAddBoard = toggle
    },
    SET_BOARDS (state, boards) { // 상태값 바꿔주는 변이 추가
        state.boards = boards
    }
  },
  actions: {
    ADD_BOARD (_, {title}) {
      return api.board.create(title)
    },
    FETCH_BOARDS ({commit}) { // context 객체 중에 commit이라는 함수 쓸 것
      return api.board.fetch().then(data => {
        commit('SET_BOARDS', data.list) // state 값 변경
      })
    }
  }  
})

export default store
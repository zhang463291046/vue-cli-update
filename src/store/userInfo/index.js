/*
*用户信息状态树
*/
export default{
  state: {
    userInfo: localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem("userInfo")):{},
    menuInfo: localStorage.getItem("menuInfo")?JSON.parse(localStorage.getItem("menuInfo")):[]
  },
  actions: {
    setUserInfoAction({ commit }, data) {
      localStorage.setItem('userInfo', JSON.stringify(data));
      commit('setUserInfoMutation', data);
    },
    setMenuInfoAction({ commit }, data) {
      localStorage.setItem('menuInfo', JSON.stringify(data));
      commit('setMenuInfoMutation', data);
    }
  },
  mutations: {
    setUserInfoMutation(state, data) {
      state.userInfo = Object.assign({}, state.userInfo, data);
    },
    setMenuInfoMutation(state, data) {
      state.menuInfo = Object.assign({}, state.menuInfo, data);
    }
  },
  getters: {
    userInfo: state => state.userInfo,
    menuInfo: state => state.menuInfo,
  }
}

/*
*用户信息状态树
*/
export default{
  state: {
    userInfo: {
      name: 'vux管理员'
    }
  },
  actions: {
    setUserInfoAction({ commit }, data) {
      commit('setUserInfoMutation', data);
    }
  },
  mutations: {
    setUserInfoMutation(state, data) {
      state.userInfo = Object.assign({}, state.userInfo);
    }
  },
  getters: {
    userInfo: state => state.userInfo
  }
}

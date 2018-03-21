const state = {
  userInfo: {}
}

const actions = {
  setUserInfoAction({ commit }, data) {
    commit('setUserInfoMutation', data);
  },
  setUserRealName({ commit }, name) {
    commit('setUserNameMutation', name);
  }
}

const mutations = {
  setUserInfoMutation(state, data) {
    state.userInfo = data;
  },
  setUserNameMutation(state, name) {
    state.userInfo = Object.assign({}, state.userInfo, { real_name: name });
  }
}

const getters = {
  userInfo: state => state.userInfo
}

export default{
  state,
  actions,
  mutations,
  getters
}

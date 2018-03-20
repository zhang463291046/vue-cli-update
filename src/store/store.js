export const state = {
  userInfo: {}
};

export const mutations = {
  setUserInfoMutation(state, data) {
    state.userInfo = data;
  },
  setUserNameMutation(state, name) {
    state.userInfo = Object.assign({}, state.userInfo, { real_name: name });
  }
};

export const actions = {
  setUserInfoAction({ commit }, data) {
    commit('setUserInfoMutation', data);
  },
  setUserRealName({ commit }, name) {
    commit('setUserNameMutation', name);
  }
};

export const getters = {
  userInfo: state => state.userInfo
};

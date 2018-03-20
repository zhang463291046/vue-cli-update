import Vuex from 'vuex';
import Vue from 'vue';
import { state, mutations, actions, getters } from './store';

Vue.use(Vuex);

const appStore = new Vuex.Store({
  state, mutations, actions, getters
});

export default appStore;

import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLoggedin: false,
    };
  },
  mutations: {
    logInUser(state) {
      state.isLoggedin = true;
    },
    logOutUser(state) {
      state.isLoggedin = false;
    },
  },
  actions: {},
  modules: {},
});

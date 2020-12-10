import { createStore } from "vuex";
import firebase from "firebase";
import { sessionstates } from "./sessionstates";

export default createStore({
  modules: { session: sessionstates },
  state() {
    return {
      isLoggedIn: false,
      userData: null,
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload;
    },
    setUser(state, payload) {
      state.userData = payload;
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
    userName(state) {
      return state.userData.displayName;
    },
    userID(state) {
      return state.userData.uid;
    },
  },
  actions: {
    async login(contex, user) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);

      contex.commit("setAuth", true);
      let userData = await firebase.auth().currentUser;
      contex.commit("setUser", userData);
    },

    async logout(contex) {
      await firebase.auth().signOut();
      contex.commit("setAuth", false);
    },
  },
});

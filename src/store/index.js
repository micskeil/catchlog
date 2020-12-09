import { createStore } from "vuex";
import firebase from "firebase";

export default createStore({
  state() {
    return {
      isLoggedIn: false,

      isFishing: false,
      isSessionControlActive: false,
    };
  },
  mutations: {
    setAuth(state, payload) {
      state.isLoggedIn = payload;
    },
  },
  getters: {
    userIsAuthenticated(state) {
      return state.isLoggedIn;
    },
  },
  actions: {
    async login(contex, user) {
      await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);

      console.log("Logging in " + user.email);
      contex.commit("setAuth", true);
    },

    logout(contex) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          contex.commit("setAuth", false);
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
  modules: {},
});

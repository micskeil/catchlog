import mutations from "./mutations.js";
import getters from "./getters.js";
import actions from "./actions.js";

export default {
  state() {
    return {
      isLoggedIn: false,
      userData: null,

      userId: null,
      displayName: null,
      token: null,
      tokenExpiration: null,
    };
  },
  mutations,
  getters,
  actions,
};

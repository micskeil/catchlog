export default {
  setUser(state, payload) {
    state.isLoggedIn = payload;
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
    state.displayName = payload.displayName;
  },

  clearUser(state) {
    state.isLoggedIn = false;
    state.userData = null;
    state.userId = null;
    state.displayName = null;
    state.token = null;
    state.tokenExpiration = null;
  },
};

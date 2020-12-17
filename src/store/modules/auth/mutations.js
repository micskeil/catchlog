export default {
  setAuth(state, payload) {
    state.isLoggedIn = payload;
  },

  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
    state.displayName = payload.displayName;
  },
};

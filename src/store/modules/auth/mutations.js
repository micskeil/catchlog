export default {
  setAuth(state, payload) {
    state.isLoggedIn = payload;
    console.log(state.isLoggedIn);
  },

  setUser(state, payload) {
    state.token = payload.token;
    state.userId = payload.userId;
    state.tokenExpiration = payload.tokenExpiration;
    state.displayName = payload.displayName;
  },
};

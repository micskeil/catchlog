export default {
  setUser(state, payload) {
    state.isLoggedIn = payload.isLoggedIn;
    state.user = payload.user;
    localStorage.setItem("user", JSON.stringify(payload.user));
    console.log("User saved: " + state.user.displayName);
  },

  clearUser(state) {
    state.isLoggedIn = false;
    state.user = null;
  },
};

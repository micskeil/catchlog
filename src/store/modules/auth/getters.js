export default {
  isLoggedIn(state) {
    return state.isLoggedIn;
  },

  userName(state) {
    return state.displayName;
  },

  userId(state) {
    return state.userId;
  },

  token(state) {
    return state.token;
  },

  email(state) {
    return state.email;
  },
};

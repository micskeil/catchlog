import firebase from "firebase";

export default {
  async registerUser(contex, payload) {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      response.user.updateProfile({
        displayName: payload.name,
      });

      console.log(response);
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    }
  },

  async login(contex, user) {
    try {
      const response = await firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password);

      contex.commit("setUser", {
        isLoggedIn: true,
        user: response.user,
      });
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    }
  },

  autoLogin(contex) {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      console.log(user);
      contex.commit("setUser", {
        isLoggedIn: true,
        user: user,
      });
    }
  },

  async logout(contex) {
    await firebase.auth().signOut();
    contex.commit("clearUser");
    localStorage.removeItem("user");
  },
};

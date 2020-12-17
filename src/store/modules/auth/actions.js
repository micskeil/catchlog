import firebase from "firebase";

export default {
  async registerUser(contex, payload) {
    try {
      const response = await firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password);

      console.log(response);
      response.user.updateProfile({
        displayName: payload.name,
      });
      this.$router.push("/login");
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

      contex.commit("setAuth", true);
      contex.commit("setUser", {
        token: response.user.idToken,
        userId: response.user.uid,
        tokenExpiration: response.user.expiresIn,
        displayName: response.user.displayName,
      });
    } catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + ": " + errorMessage);
    }
  },

  async logout(contex) {
    await firebase.auth().signOut();
    contex.commit("setAuth", false);
  },
};

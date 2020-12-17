import firebase from "firebase";

export default {
  registerUser(contex, payload) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((res) => {
        console.log(res);
        res.user
          .updateProfile({
            displayName: payload.name,
          })
          .then(() => {
            contex.commit("setUser", {
              token: res.idToken,
              userId: res.localId,
              tokenExpiration: res.expiresIn,
              displayName: res.displayName,
            });
            this.$router.push("/login");
          });
      })
      .catch((error) => {
        alert(error.message);
      });
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

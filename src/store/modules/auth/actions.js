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

  login(contex, user) {
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((res) => {
        console.log(res.user);
        contex.commit("setAuth", true);
        contex.commit("setUser", {
          token: res.user.idToken,
          userId: res.user.localId,
          tokenExpiration: res.user.expiresIn,
          displayName: res.user.displayName,
        });
        this.$router.push({ name: "Home" });
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode + ": " + errorMessage);
      });
  },

  async logout(contex) {
    await firebase.auth().signOut();
    contex.commit("setAuth", false);
  },
};

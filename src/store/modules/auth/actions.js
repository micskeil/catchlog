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

      localStorage.setItem("token", response.user.idToken);
      localStorage.setItem("userId", response.user.uid);
      localStorage.setItem("displayName", response.user.displayName);

      contex.commit("setUser", {
        isLoggedIn: true,
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

  autoLogin(contex) {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const displayName = localStorage.getItem("displayName");

    if (userId && token) {
      contex.commit("setUser", {
        isLoggedIn: true,
        token: token,
        userId: userId,
        tokenExpiration: null,
        displayName: displayName,
      });
    }
  },

  async logout(contex) {
    await firebase.auth().signOut();
    contex.commit("clearUser");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("displayName");
  },
};

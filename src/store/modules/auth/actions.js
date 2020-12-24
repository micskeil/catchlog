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
      // We have to save the user in the Database too
      firebase
        .firestore()
        .collection("/users/")
        .doc(response.user.uid)
        .set(
          {
            displayName: this.user.displayName,
            photoURL: this.newPhotoURL,
          },
          { merge: true }
        )
        .then
        // Create the current session ID locally, and upload it to the store
        ()
        .catch(function(error) {
          console.error("Error adding document: ", error);
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

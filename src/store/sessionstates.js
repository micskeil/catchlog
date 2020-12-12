import firebase from "firebase";

const sessionstates = {
  namespaced: true,
  state() {
    return {
      isFishing: false,
      currentSession: "",

      isSessionControlActive: false,
    };
  },
  mutations: {
    setIsFishing(state, payload) {
      state.isFishing = payload;
    },
    setCurrentSession(state, payload) {
      state.currentSession = payload;
    },
  },

  getters: {
    getIsFishing(state) {
      return state.isFishing;
    },

    getCurrentSession(state) {
      return state.currentSession;
    },
  },

  actions: {
    updateIsFishing(contex) {
      const userID = contex.rootGetters.userID;
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            contex.commit("setIsFishing", doc.data().is_fishing);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    updateCurrentSession(contex) {
      const userID = contex.rootGetters.userID;
      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            console.log("Current session: ", doc.data().current_session);
            contex.commit("setCurrentSession", doc.data().current_session);
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
  },
};
export { sessionstates };

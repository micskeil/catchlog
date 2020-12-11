import firebase from "firebase";

const sessionstates = {
  namespaced: true,
  state() {
    return {
      isFishing: false,
      currentSession: "",
      isSessionControlActive: false,
      totalNumberOfSessions: 0,
    };
  },
  mutations: {
    setIsFishing(state, payload) {
      state.isFishing = payload;
    },
    setCurrentSession(state, payload) {
      state.currentSession = payload;
    },

    setTotalNumberOfSessions(state, payload) {
      state.totalNumberOfSessions = payload;
    },
  },

  getters: {
    getIsFishing(state) {
      return state.isFishing;
    },

    getCurrentSession(state) {
      return state.currentSession;
    },

    getTotalNumberOfSessions(state) {
      return state.totalNumberOfSessions;
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
            console.log("isFishing state: ", doc.data().is_fishing);
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

    updateTotalNumberOfSessions(contex) {
      console.log("updateTotalNumberOfSessions");
      const userID = contex.rootGetters.userID;
      fetch(
        "https://fishlog-75884.firebaseio.com/users/" +
          userID +
          "/totalNumberOfSessions.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== null) {
            contex.commit("setTotalNumberOfSessions", data);
          } else {
            this.totalNumberOfSessions = 0;
            console.log("No fishing history found! ");
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },
};
export { sessionstates };

import firebase from "firebase";

const sessionstates = {
  namespaced: true,
  state() {
    return {
      isFishing: false,
      currentSession: "",

      isStart: false,
      isStop: true,
      isNewCatch: false,
    };
  },
  mutations: {
    setIsFishing(state, payload) {
      state.isFishing = payload;
    },
    setCurrentSession(state, payload) {
      state.currentSession = payload;
    },

    setIsStart(state, payload) {
      state.isStart = payload;
    },

    setIsEnd(state, payload) {
      state.isEnd = payload;
    },

    setIsNewCatch(state, payload) {
      console.log("Congratulations for your catch!");
      state.isNewCatch = payload;
      console.log(state.isNewCatch);
    },
  },

  getters: {
    getIsFishing(state) {
      return state.isFishing;
    },

    getCurrentSession(state) {
      return state.currentSession;
    },

    getIsStart(state) {
      return state.isStart;
    },

    getIsEnd(state) {
      return state.isEnd;
    },

    getIsNewCatch(state) {
      return state.isNewCatch;
    },
  },

  actions: {
    updateIsFishing(contex) {
      const user = contex.rootGetters.user;

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            contex.commit("setIsFishing", doc.data().is_fishing);
          } else {
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    updateCurrentSession(contex) {
      const user = contex.rootGetters.user;

      firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
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

    startFishing(contex) {
      const newState = !contex.state.isStart;
      contex.commit("setIsStart", newState);
    },

    endFishing(contex) {
      const newState = !contex.state.isEnd;
      contex.commit("setIsEnd", newState);
    },

    registerCatch(contex) {
      const newState = !contex.state.isNewCatch;
      contex.commit("setIsNewCatch", newState);
    },
  },
};
export { sessionstates };

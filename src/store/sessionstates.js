const sessionstates = {
  namespaced: true,
  state() {
    return {
      isFishing: false,
      isSessionControlActive: false,
      totalNumberOfSessions: 0,
    };
  },
  mutations: {
    setIsFishing(state, payload) {
      state.isFishing = payload;
    },

    setTotalNumberOfSessions(state, payload) {
      state.totalNumberOfSessions = payload;
    },
  },

  getters: {
    getIsFishing(state) {
      return state.isFishing;
    },

    getTotalNumberOfSessions(state) {
      return state.totalNumberOfSessions;
    },
  },

  actions: {
    updateIsFishing(contex) {
      console.log("updateIsFishing");
      const userID = contex.rootGetters.userID;
      fetch(
        "https://fishlog-75884.firebaseio.com/users/" +
          userID +
          "/isFishing.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== null) {
            contex.commit("setIsFishing", data);
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
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

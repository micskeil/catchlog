<template> <div></div> </template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {},

  data() {
    return {
      sessions: [],
    };
  },
  computed: {
    ...mapGetters("session", {
      getIsFishing: "getIsFishing",
      getIsStart: "getIsStart",
      getIsEnd: "getIsEnd",
      getIsNewCatch: "getIsNewCatch",
    }),
  },
  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateTotalNumberOfSessions: "updateTotalNumberOfSessions",
      updateCurrentSession: "updateCurrentSession",
    }),

    loadSessions() {
      const userID = this.$store.getters.userID;
      const that = this;
      firebase
        .firestore()
        .collection("users/" + userID + "/sessions")
        .orderBy("start_date", "desc")
        .get()
        .then(function(querySnapshot) {
          const results = [];
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            results.push({
              session_id: doc.id,
              user_id: doc.data().user_id,
              start_date: new Date(doc.data().start_date.seconds * 1000),
              location: doc.data().location,
              end_date: new Date(doc.data().end_date.seconds * 1000),
            });
            that.sessions = results;
          });
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },

  beforeMount() {},
};
</script>

<style scoped>
div {
  width: 100%;
}

.session-start {
  width: 100%;
}

.user-img {
  width: 1.75rem;
  height: 1.75rem;
  border: 1px solid #6969d18c;
  padding: 1px;
}
</style>

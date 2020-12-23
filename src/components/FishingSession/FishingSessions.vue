<template>
  <Starting v-if="getIsStart === true" />
  <NewCatch v-if="getIsNewCatch === true" />
  <Ending v-if="getIsEnd === true" />
  <loader v-if="isLoading"></loader>

  <div v-for="session in sessions" v-bind:key="session.id">
    <FishingSessionEnd v-bind:session="session" />
    <Catches v-bind:session="session" />
    <FishingSessionStart v-bind:session="session" />
    <div></div>
  </div>
</template>

<script>
import FishingSessionStart from "./FishingSessionStart.vue";
import FishingSessionEnd from "./FishingSessionEnd.vue";
import Catches from "../CatchFish/Catches.vue";
import Starting from "./Starting";
import Ending from "./Ending";
import NewCatch from "../CatchFish/NewCatch.vue";
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    FishingSessionStart,
    FishingSessionEnd,
    Catches,
    Starting,
    Ending,
    NewCatch,
  },

  data() {
    return {
      sessions: [],
      isLoading: true,
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
      const user = this.$store.getters.user;
      const that = this;

      firebase
        .firestore()
        .collection("users/" + user.uid + "/sessions")
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
            that.isLoading = false;
          });
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },

  beforeMount() {
    this.updateIsFishing();
    this.updateCurrentSession();
    this.loadSessions();
  },
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

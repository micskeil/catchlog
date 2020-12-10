<template>
  <div v-if="isSessionControlActive">
    <Starting v-if="getIsFishing === false" />
    <NewCatch v-if="getIsFishing === true" />
    <Ending v-if="getIsFishing === true" />
  </div>
  <div v-for="session in sessions.slice().reverse()" v-bind:key="session.id">
    <FishingSessionEnd v-bind:session="session" />
    <Catches v-bind:session="session" />
    <FishingSessionStart v-bind:session="session" />
  </div>
</template>

<script>
import FishingSessionStart from "./FishingSessionStart.vue";
import FishingSessionEnd from "./FishingSessionEnd.vue";
import Catches from "../CatchFish/Catches.vue";
import Starting from "./Starting";
import Ending from "./Ending";
import NewCatch from "../CatchFish/NewCatch.vue";
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
      showSessionControl: true,
      isSessionControlActive: true,
    };
  },
  computed: {
    ...mapGetters("session", {
      getIsFishing: "getIsFishing",
    }),
  },
  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateTotalNumberOfSessions: "updateTotalNumberOfSessions",
    }),

    loadSessions() {
      console.log("Loading seassions...");
      const userID = this.$store.getters.userID;
      fetch("https://fishlog-75884.firebaseio.com/sessions/" + userID + ".json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          const results = [];

          for (const id in data) {
            results.push({
              id: id,
              start_date: data[id].start_date,
              location: data[id].location,
              end_date: data[id].end_date,
            });
          }

          this.sessions = results;
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },

  beforeMount() {
    this.updateIsFishing();
    this.updateTotalNumberOfSessions();
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

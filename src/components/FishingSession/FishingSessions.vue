<template>
  <div v-if="isSessionControlActive">
    <SessionStarting
      v-if="isFishing === false"
      v-on:start-fishing-session="startFishing"
      v-bind:totalNumberOfSessions="totalNumberOfSessions"
    />
    <NewCatch
      v-if="isFishing === true"
      v-bind:totalNumberOfSessions="totalNumberOfSessions"
    />
    <SessionEnding
      v-if="isFishing === true"
      v-on:finish-fishing-session="finishFishing"
      v-bind:totalNumberOfSessions="totalNumberOfSessions"
    />
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
import SessionStarting from "./SessionStarting";
import SessionEnding from "./SessionEnding";
import NewCatch from "../CatchFish/NewCatch.vue";

export default {
  emits: ["startFishing", "finishFishing"],
  props: ["isSessionControlActive", "isFishing"],
  components: {
    FishingSessionStart,
    FishingSessionEnd,
    Catches,
    SessionStarting,
    SessionEnding,
    NewCatch,
  },

  data() {
    return {
      sessions: [],
      totalNumberOfSessions: null,
      showSessionControl: false,
    };
  },
  methods: {
    loadSessions() {
      this.isLoading = true;
      fetch("https://fishlog-75884.firebaseio.com/sessions.json")
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

    startFishing() {
      if (this.isFishing === false) {
        this.$emit("start-fishing");
        this.updateTotalNumberOfSessions();
        console.log("Fishing session started.");
        this.$forceUpdate();
      } else {
        console.log("Can't start fishing session");
      }
    },

    finishFishing() {
      if (this.isFishing === true) {
        this.$emit("finish-fishing");
        console.log("Fishing session ended");
        this.$forceUpdate();
      }
    },

    updateTotalNumberOfSessions() {
      console.log(this.totalNumberOfSessions + 1 + " session(s) registered");
      this.totalNumberOfSessions = this.totalNumberOfSessions + 1;
      fetch("https://fishlog-75884.firebaseio.com/app_data.json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalNumberOfSessions: this.totalNumberOfSessions,
          isFishing: true,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            this.startFishingSession();
          }
        })
        .catch((error) => {
          if (error.message === "Could not save data!") {
            this.error = "Could not save data!";
            console.log(error);
          } else {
            this.error = "Something went wrong. Pls try again later!";
          }
        });
    },

    getTotalNumberOfSessions() {
      fetch(
        "https://fishlog-75884.firebaseio.com/app_data/totalNumberOfSessions.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== null) {
            this.totalNumberOfSessions = data;
            console.log(
              "Total number of sessions updated to " +
                this.totalNumberOfSessions
            );
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

  beforeMount() {
    this.getTotalNumberOfSessions();
  },

  mounted() {
    this.loadSessions();
    console.log(
      "Session control is active: " +
        this.isSessionControlActive +
        "and set it up for isFishing" +
        this.isFishing
    );
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

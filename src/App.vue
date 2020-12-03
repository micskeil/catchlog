<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <StickyNav />
    <div class=" container  d-flex justify-content-between row">
      <main class="col-md-8 p-3 d-flex flex-column align-items-center">
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
        <FishingSessions />
      </main>
      <div class=" col-md-4 p-3">
        <h5>Activity in your arrea</h5>
        <br />
        <div>Other users' catches will be here</div>

        <br />
        <footer class="footer pt-3">
          ©2020 with ❤ from Lali Micskei
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import StickyNav from "./components/LayoutElements/StickyNav";
import FishingSessions from "./components/FishingSession/FishingSessions";
import SessionStarting from "./components/FishingSession/SessionStarting";
import SessionEnding from "./components/FishingSession/SessionEnding";
import NewCatch from "./components/CatchFish/NewCatch.vue";

export default {
  components: {
    StickyNav,
    FishingSessions,
    SessionStarting,
    SessionEnding,
    NewCatch,
  },
  emits: ["start-fishing-session", "finish-fishing-session"],
  data() {
    return {
      isFishing: false,
      activeSession: "",
      totalNumberOfSessions: 0,
    };
  },
  methods: {
    startFishing() {
      if (this.isFishing === false) {
        this.isFishing = true;
        this.totalNumberOfSessions = this.totalNumberOfSessions + 1;
        this.updateTotalNumberOfSessions();
      } else {
        console.log("Can't start fishing session");
      }
    },
    finishFishing() {
      if (this.isFishing === true) {
        this.isFishing = false;
      }
    },
    updateTotalNumberOfSessions() {
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
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
    getIsFishing() {
      fetch("https://fishlog-75884.firebaseio.com/app_data/isFishing.json")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== null) {
            this.isFishing = data;
          }
        })
        .catch((error) => {
          this.isFishing = false;
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },
  created() {
    this.getTotalNumberOfSessions();
    this.getIsFishing();
  },
};
</script>

<style lang="scss" scoped>
#app {
  * {
    padding: 0;
    margin: 0;
  }
  .footer {
    font-size: 0.75rem;
  }
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>

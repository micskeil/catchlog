<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <StickyNav />
    <div class=" container row">
      <main class="col-md-8 p-3 d-flex flex-column align-items-center">
        <SessionStarting
          v-if="isFishing === false"
          v-on:start-fishing-session="startFishing"
        />
        <SessionEnding
          v-if="isFishing === true"
          v-on:finish-fishing-session="finishFishing"
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

export default {
  components: {
    StickyNav,
    FishingSessions,
    SessionStarting,
    SessionEnding,
  },
  data() {
    return {
      isFishing: false,
    };
  },
  methods: {
    startFishing() {
      if (this.isFishing === false) {
        this.isFishing = true;
      } else {
        console.log("Can't start fishing session");
      }
    },
    finishFishing() {
      console.log("finish fishing");
      if (this.isFishing === true) {
        this.isFishing = false;
      } else {
        console.log("Can't stop fishing session");
      }
    },
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

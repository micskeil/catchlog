<template>
  <div class="container-fluid d-flex flex-column align-items-center">
    <StickyNav
      v-bind:isFishing="isFishing"
      v-on:toggle-session-control="toggleSessionControl()"
    />
    <div class=" container  d-flex justify-content-between row">
      <main
        class="content col-md-8 d-flex flex-column align-items-center m-0 pb-5"
      >
        <FishingSessions
          v-bind:isSessionControlActive="isSessionControlActive"
          v-bind:isFishing="isFishing"
          v-bind:key="isFishing"
          v-on:start-fishing="startFishing"
          v-on:finish-fishing="finishFishing"
        />
      </main>
      <div class="side-bar d-none d-md-block col-md-4 p-5">
        <div class="side-bar-content">
          <h5>Activity in your area</h5>
          <br />
          <div>Other users' catches will be here</div>

          <br />
          <footer class="footer pt-3">
            ©2020 with ❤ from Lali Micskei
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StickyNav from "../components/LayoutElements/StickyNav";
import FishingSessions from "../components/FishingSession/FishingSessions";

export default {
  components: {
    StickyNav,
    FishingSessions,
  },
  data() {
    return {
      isSessionControlActive: false,
      isFishing: false,
    };
  },
  methods: {
    toggleSessionControl() {
      console.log(
        "Show session control set to " + !this.isSessionControlActive
      );
      this.isSessionControlActive = !this.isSessionControlActive;
    },

    startFishing() {
      this.isFishing = true;
      this.isSessionControlActive = false;
    },

    finishFishing() {
      this.isFishing = false;
      this.isSessionControlActive = false;
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
  mounted() {
    this.getIsFishing();
  },
};
</script>

<style lang="scss" scoped>
.side-bar {
}

.side-bar-content {
  position: sticky;
  top: 90px;
}

.footer {
  font-size: 0.75rem;
}
</style>

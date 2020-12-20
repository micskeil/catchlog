<template>
  <base-card ref="starting">
    <template v-slot:user-info><div></div></template>
    <template v-slot:card-img>
      <div id="location" class="d-flex flex-column pt-0 align-items-center">
        <iframe
          width="100%"
          height="300"
          frameborder="0"
          style="border:0"
          :src="locationURL"
        >
        </iframe>
        <img v-if="!coordinates" src="../../assets/location.png" width="120" />
      </div>

      <div class="d-flex flex-column  p-3 align-items-center">
        <div
          class="warning pl-3 pr-3 p-1 text-center bg-info text-white rounded"
        >
          A pecahelyed pontos kordinátáit csak te láthatod. Mi nem osztjuk meg
          senkivel!
        </div>
      </div>
    </template>
    <template v-slot:card-info>
      <div id="form" class="form form-group  row p-0 m-0">
        <form
          class="pb-3  col-12 p-0 m-0"
          v-on:submit.prevent="startFishingSession()"
        >
          <div class="form-group row pt-3">
            <label
              class="col-6 col-form-label font-weight-bold"
              for="start-date"
              >Kezdés:
            </label>
            <div class="datetime col-6 text-right">
              <input
                class="form-control"
                id="start-date"
                name="start-date"
                type="datetime-local"
                v-model="start_date"
              />
            </div>

            <label
              class="col-6 pt-3 col-form-label font-weight-bold"
              for="coordinates"
              >Koordináták:
            </label>
            <div class="col-6 pt-3">
              <input
                class="form-control"
                id="coordinates"
                name="coordinates"
                type="text"
                v-model="coordinates"
              />
            </div>

            <label
              class="col-6 pt-3 col-form-label font-weight-bold"
              for="start-date"
              >Horgászhely neve:
            </label>
            <div class="col-6 pt-3">
              <input
                class="form-control"
                id="session-location"
                name="session-location"
                type="text"
                v-model="new_session_location"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-5 ">
            <base-button>
              Horgászat megkezdése!
            </base-button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
import { mapActions } from "vuex";
import firebase from "firebase";

export default {
  data() {
    return {
      new_session_location: "",
      coordinates: "",
      current_session: "",
      start_date: "",
    };
  },

  computed: {
    locationURL() {
      return (
        `https://www.google.com/maps/embed/v1/place?key=AIzaSyC-I8MZCRc1JQgZeC7SdhTt-PjqHuBn5J8&q=` +
        this.coordinates
      );
    },
  },

  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateCurrentSession: "updateCurrentSession",
      startFishing: "startFishing",
    }),

    parseYMDHM(s) {
      var b = s.split(/\D+/);
      return new Date(b[0], b[1] - 1, b[2], b[3], b[4], 0 || 0, 0 || 0);
    },

    startFishingSession() {
      const userId = this.$store.getters.userId;
      const that = this;
      let startDate = "";

      if (this.start_date === "") {
        startDate = new Date();
      } else {
        startDate = this.parseYMDHM(this.start_date);
      }

      firebase
        .firestore()
        .collection("/users/" + userId + "/sessions")
        .add({
          user_id: userId,
          start_date: startDate,
          coordinates: this.coordinates,
          location: this.new_session_location,
          end_date: "undifined",
          cought_fish: 0,
        })
        .then(function(docRef) {
          // Create the current session ID locally, and upload it to the store
          that.current_session = docRef.id;
          that.updateUserStatus();
          that.startFishing();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    updateUserStatus() {
      const userId = this.$store.getters.userId;
      const that = this;

      firebase
        .firestore()
        .collection("users")
        .doc(userId)
        .set({
          is_fishing: true,
          current_session: that.current_session,
        })
        .then(function() {
          // Update the  session states
          that.updateIsFishing();
          that.updateCurrentSession();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    getLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(this.showPosition);
      }
    },

    showPosition(position) {
      let latlon = position.coords.latitude + "," + position.coords.longitude;
      this.coordinates = latlon;
      console.log(this.coordinates);
    },

    goto(refName) {
      var element = this.$refs[refName];
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },

  mounted() {
    this.goto("starting");
    this.getLocation();
  },
};
</script>

<style lang="scss" scoped>
#form {
  width: 100%;
}

form {
  height: 100%;
  width: 100%;
}
.form-control {
  width: 100%;
}

.btn-dark {
  background-color: #2c3e50;
}
</style>

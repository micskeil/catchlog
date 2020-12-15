<template>
  <base-card ref="starting">
    <template v-slot:card-img> <div id="location"></div></template>
    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="startFishing()"
        >
          <div class="form-group row">
            <label
              class="col-sm-3 col-form-label font-weight-bold"
              v-on:click="getLocation;"
              for="start-date"
              >Starting time:
            </label>
            <div class="col-sm-9">
              <input
                class="form-control"
                id="start-date"
                name="start-date"
                type="datetime-local"
                v-model="new_session_start_date"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-3 ">
            <button class="btn btn-dark rounded justify-self-center">
              Start fishing!
            </button>
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
      current_session: "",
    };
  },

  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateCurrentSession: "updateCurrentSession",
    }),

    startFishing() {
      const userID = this.$store.getters.userID;
      const that = this;

      firebase
        .firestore()
        .collection("/users/" + userID + "/sessions")
        .add({
          user_id: userID,
          start_date: new Date(),
          location: this.new_session_location,
          end_date: "undifined",
          cought_fish: 0,
        })
        .then(function(docRef) {
          // Create the current session ID locally, and upload it to the store
          that.current_session = docRef.id;
          that.updateUserStatus();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    updateUserStatus() {
      const userID = this.$store.getters.userID;
      const that = this;

      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .set({
          is_fishing: true,
          current_session: that.current_session,
        })
        .then(function() {
          console.log("Fishing session started: ", that.current_session);
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
      var x = document.getElementById("location");

      let latlon = position.coords.latitude + "," + position.coords.longitude;
      this.new_session_location = latlon;

      x.innerHTML =
        `<iframe
          width="100%"
           height="250"
            frameborder="0" style="border:0"
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyC-I8MZCRc1JQgZeC7SdhTt-PjqHuBn5J8
                &q=location="` +
        latlon +
        ` allowfullscreen>
        </iframe>`;
    },

    goto(refName) {
      var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  beforeMount() {
    this.getLocation();
  },
  mounted() {
    this.goto("starting");
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
</style>

<template>
  <base-card ref="ending">
    <template v-slot:card-img> <div id=""></div></template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="endFishingSession()"
        >
          <div class="form-group row">
            <label
              class="col-sm-3 col-form-label font-weight-bold"
              v-on:click="getLocation;"
              for="end-date"
              >Ending time:
            </label>
            <div class="col-sm-9">
              <input
                class="form-control"
                id="end-date"
                name="end-date"
                type="datetime-local"
                v-model="new_session_end_date"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-3 ">
            <button class="btn btn-dark rounded justify-self-center">
              End
            </button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      end_date: "",
    };
  },

  computed: {
    ...mapGetters("session", {
      getCurrentSession: "getCurrentSession",
    }),
  },

  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateCurrentSession: "updateCurrentSession",
      endFishing: "endFishing",
    }),

    parseYMDHM(s) {
      var b = s.split(/\D+/);
      return new Date(b[0], b[1] - 1, b[2], b[3], b[4], 0 || 0, 0 || 0);
    },

    endFishingSession() {
      const userID = this.$store.getters.userId;
      const current_session = this.getCurrentSession;
      const that = this;

      let endDate = "";

      if (this.end_date === "") {
        endDate = new Date();
      } else {
        endDate = this.parseYMDHM(this.start_date);
      }

      firebase
        .firestore()
        .collection("users/" + userID + "/sessions/")
        .doc(current_session)
        .update({
          end_date: endDate,
        })
        .then(() => {
          // Create the current session ID locally, and upload it to the store
          that.updateUserStatus();
          that.endFishing();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    updateUserStatus() {
      const userID = this.$store.getters.userId;
      const that = this;

      firebase
        .firestore()
        .collection("users")
        .doc(userID)
        .set({
          is_fishing: false,
          current_session: "",
        })
        .then(function() {
          console.log("Fishing session ended: ", that.getCurrentSession);
          // Update the  session states
          that.updateIsFishing();
          that.updateCurrentSession();
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    goto(refName) {
      var element = this.$refs[refName];

      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  mounted() {
    this.goto("ending");
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

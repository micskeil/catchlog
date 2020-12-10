<template>
  <base-card>
    <template v-slot:card-img> <div id=""></div></template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="stopFishing"
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
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      new_session_end_date: new Date(),
    };
  },

  computed: {
    ...mapGetters("session", {
      getTotalNumberOfSessions: "getTotalNumberOfSessions",
    }),
  },

  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
    }),

    stopFishing() {
      this.uploadSession();
      this.uploadUserID();
    },

    uploadSession() {
      const userID = this.$store.getters.userID;
      const sessionID = this.getTotalNumberOfSessions - 1;
      fetch(
        "https://fishlog-75884.firebaseio.com/" +
          userID +
          "/" +
          sessionID +
          ".json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            end_date: new Date(),
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            //
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

    uploadUserID() {
      const userID = this.$store.getters.userID;
      fetch("https://fishlog-75884.firebaseio.com/" + userID + "/.json", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isFishing: false,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            this.updateIsFishing();
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

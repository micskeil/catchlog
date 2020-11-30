<template>
  <base-card>
    <template v-slot:card-img> <div id="location"></div></template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form class="pb-3 mb-3 col-12 p-0 m-0" v-on:submit.prevent="submitForm">
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
            <button
              v-on:click="finishFishingSession"
              class="btn btn-dark rounded justify-self-center"
            >
              End
            </button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      new_session_start_date: new Date(),
      new_session_location: "",
      new_session_end_date: "",
    };
  },
  methods: {
    finishFishingSession() {
      this.$emit("finish-fishing-session");
    },
    submitForm() {
      fetch("https://fishlog-75884.firebaseio.com/sessions.json", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          start_date: this.new_session_start_date,
          location: this.new_session_location,
          end_date: this.new_session_end_date,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            console.log(response);
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
  },
  mounted() {
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
</style>

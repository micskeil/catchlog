<template>
  <base-card>
    <template v-slot:card-img>
      <div id="">
        <div
          class="image-upload d-flex flex-column align-items-center justify-content-center border pt-3 pb-3"
        >
          <label for="file-input">
            <img src="../../assets/img_upload.png" />
          </label>

          <input id="file-input" type="file" />
        </div></div
    ></template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="submitCatch"
        >
          <div class="form-group row">
            <label
              class="col-sm-4 col-form-label font-weight-bold mt-3"
              for="catch_time"
              >Catch time:
            </label>
            <div class="col-sm-8 mt-3">
              <input
                class="form-control"
                id="catch_time"
                name="catch_time"
                type="datetime-local"
                v-model="catch_time"
              />
            </div>

            <label
              class="col-sm-4 col-form-label font-weight-bold mt-3"
              for="species"
              >Species:
            </label>
            <div class="col-sm-8 mt-3">
              <input
                class="form-control"
                id="species"
                name="species"
                type="text"
                v-model="species"
              />
            </div>

            <label
              class="col-sm-4 col-form-label font-weight-bold mt-3"
              for="species"
              >Weight (kg):
            </label>
            <div class="col-sm-8 mt-3">
              <input
                class="form-control"
                id="weight"
                name="weight"
                type="text"
                v-model="weight"
              />
            </div>

            <label
              class="col-sm-4 col-form-label font-weight-bold mt-3"
              v-on:click="getLocation;"
              for="length"
              >Length (cm):
            </label>
            <div class="col-sm-8 mt-3">
              <input
                class="form-control"
                id="length"
                name="length"
                type="text"
                v-model="lenght"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-3 ">
            <button class="btn btn-dark rounded justify-self-center">
              Register catch
            </button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  props: ["totalNumberOfSessions"],
  data() {
    return {
      catch_date: new Date(),
      species: "",
      weight: "",
      lenght: "",
      catch_id: 0,
      currentSession: this.totalNumberOfSessions - 1,
    };
  },

  methods: {
    submitCatch() {
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
          this.currentSession +
          "/catches/" +
          this.catch_id +
          "/.json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: this.location,
            catch_date: this.catch_date,
            species: this.species,
            weight: this.weight,
            lenght: this.lenght,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            location.reload();
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
.image-upload > input {
  display: block;
}
form {
  height: 100%;
  width: 100%;
}
.form-control {
  width: 100%;
}
</style>

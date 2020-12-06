<template>
  <base-card>
    <template v-slot:card-img>
      <img v-bind:src="imageUrl" />
    </template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="submitCatch()"
        >
          <label for="file-input"> </label>
          <button class="btn btn-outline-dark" v-on:click="onPickFile()">
            Upload Image
          </button>
          <input
            id="fileInput"
            type="file"
            class="d-none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
          />
          <div class="form-group row">
            <label
              class="col-sm-4 col-form-label font-weight-bold mt-3"
              for="catch_date"
              >Catch time:
            </label>
            <div class="col-sm-8 mt-3">
              <input
                class="form-control"
                id="catch_date"
                name="catch_date"
                type="datetime-local"
                v-model="catch_date"
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
      species: "Pike",
      weight: "2.5",
      lenght: "75",
      totalNumberOfCoughtFish: 0,
      currentSession: this.totalNumberOfSessions,
      imageUrl: "",
      image: null,
    };
  },
  methods: {
    onPickFile() {
      console.log("Choose a picture to upload!");
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;
      console.log("Uploaded image: " + filename);
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Plase add a valid image file! ");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },

    submitCatch() {
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
          this.currentSession +
          "/catches/" +
          this.totalNumberOfCoughtFish +
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
            console.log(
              "Saving catch no. " +
                this.totalNumberOfCoughtFish +
                " details for session no." +
                this.currentSession
            );
            this.updateTotalNumberOfCoughtFish();
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

    updateTotalNumberOfCoughtFish() {
      // We update the number of the cought fish during this session in the database
      this.totalNumberOfCoughtFish = this.totalNumberOfCoughtFish + 1;
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
          this.currentSession +
          ".json",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cought_fish: this.totalNumberOfCoughtFish,
          }),
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Could not save data!");
          } else {
            console.log(
              "Updating total catch number for session no. " +
                this.currentSession +
                " to " +
                this.totalNumberOfCoughtFish
            );
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

    getTotalNumberOfCoughtFish() {
      console.log(
        "Update catch history for session no. " + this.currentSession
      );
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
          this.currentSession +
          "/cought_fish.json"
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          if (data !== null) {
            this.totalNumberOfCoughtFish = data;
          } else {
            console.log(
              "No catch history for session no. " + this.currentSession
            );
            this.totalNumberOfCoughtFish = 0;
          }
        })
        .catch((error) => {
          console.log(error);
          this.error = "Failed to fetch data - pls try again later!";
        });
    },
  },

  created() {
    this.getTotalNumberOfCoughtFish();
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

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

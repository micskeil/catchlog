<template>
  <base-card>
    <template v-slot:card-img>
      <img v-bind:src="imageUrl" />
    </template>

    <template v-slot:card-info>
      <button class="btn btn-outline-dark" v-on:click="onPickFile()">
        Upload Image
      </button>
      <label for="file-input"> </label>
      <input
        id="fileInput"
        type="file"
        class="d-none"
        ref="fileInput"
        accept="image/*"
        v-on:change="onFilePicked"
      />
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="submitCatch()"
        >
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
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";

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
      image_src: "",
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
      updateTotalNumberOfSessions: "updateTotalNumberOfSessions",
    }),

    onPickFile() {
      console.log("onPickfile is running");
      console.log("Choose a picture to upload!");
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      console.log("onFilePicked is running");
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
      console.log(this.image);
      this.uploadPicture();
    },

    submitCatch() {
      const userID = this.$store.getters.userID;
      const sessionID = this.getTotalNumberOfSessions;
      fetch(
        "https://fishlog-75884.firebaseio.com/catches/" +
          userID +
          "/" +
          sessionID +
          "/" +
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
            image_src: this.image_src,
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

    uploadPicture() {
      let that = this;
      console.log("Uploading " + this.image.name + " to Firebase Storage.");
      // File to upload to Firebase Storage
      const file = this.image;
      const metadata = {
        contentType: "image/*",
      };

      // Upload file and metadata
      const storageRef = firebase.storage().ref();
      console.log(storageRef);

      let regex = new RegExp("[^.]+$");
      let extension = this.image.name.match(regex);

      const uploadTask = storageRef
        .child(
          "/" +
            this.currentSession +
            "/catches/" +
            this.totalNumberOfCoughtFish +
            "." +
            extension
        )
        .put(file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log("Upload is running");
              break;
          }
        },
        function(error) {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function() {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            // this.downloadURL = downloadURL;
            that.image_src = downloadURL;
            console.log("File available at", downloadURL);
          });
        }
      );
    },

    updateTotalNumberOfCoughtFish() {
      const userID = this.$store.getters.userID;
      const sessionID = this.getTotalNumberOfSessions;

      this.totalNumberOfCoughtFish = this.totalNumberOfCoughtFish + 1;
      fetch(
        "https://fishlog-75884.firebaseio.com/sessions/" +
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

<template>
  <base-card ref="settings">
    <template v-slot:user-info><div></div></template>
    <template v-slot:card-img> <div></div></template>
    <template v-slot:card-info>
      <form class="form row pb-3 p-0 m-0" v-on:submit.prevent="updateUser()">
        <div class="form-group row form pt-5 pb-5">
          <div class="col-6 font-weight-bold d-flex justify-content-center">
            <img
              class="rounded-circle border"
              :src="imageUrl"
              width="120"
              height="120"
            />
          </div>
          <div class="col-6 text-right">
            <base-button v-on:click="onPickFile()"> KÉP CSERÉJE </base-button>
          </div>
          <input
            id="fileInput"
            type="file"
            class="d-none"
            ref="fileInput"
            accept="image/*"
            v-on:change="onFilePicked"
          />
        </div>
        <div class="form-group row form pt-3">
          <label class="col-6 col-form-label font-weight-bold" for="user-name"
            >Felhasználónév:
          </label>
          <div class="datetime col-6 text-right">
            <input
              class="form-control"
              id="user-name"
              name="user-name"
              type="text"
              v-model.lazy="displayName"
            />
          </div>

          <label
            class="col-6 pt-3 col-form-label font-weight-bold"
            for="start-date"
            >E-mail cím:
          </label>
          <div class="col-6 pt-3 pb-3">
            <input
              class="form-control"
              id="coordinates"
              name="coordinates"
              type="text"
              v-model="email"
            />
          </div>
        </div>

        <base-button class="">
          MENTÉS
        </base-button>

        <base-button class="warning" @click="logout()">
          KILÉPÉS
        </base-button>
      </form>
    </template>
  </base-card>
</template>

<script>
import firebase from "firebase";
import BaseButton from "../BaseElements/BaseButton.vue";
export default {
  components: { BaseButton },
  data() {
    return {
      userId: "",
      displayName: "",
      email: "",
      imageUrl: "",
      image: null,

      image_src: "",
    };
  },
  watch: {
    updatedDisplayName() {
      return this.displayName;
    },
  },

  methods: {
    getUser() {
      this.displayName = this.$store.getters.userName;
      this.email = this.$store.getters.email;
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      console.log("onFilePicked is running");
      const files = event.target.files;
      let filename = files[0].name;
      console.log("Choosed image: " + filename);
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
        .child("/" + this.userId + "/avatar" + "." + extension)
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
  },
  created() {
    this.getUser();
  },
};
</script>
<style scoped>
form {
  width: 100%;
}

.form-group {
  width: 100%;
}

.warning {
  background-color: orange;
}
</style>

<template>
  <base-card v-bind:uid="uid" ref="settings">
    <template v-slot:user-info><div></div></template>
    <template v-slot:card-img> <div></div></template>
    <template v-slot:card-info>
      <form class="form row pb-3 p-0 m-0" v-on:submit.prevent="saveUser">
        <div class="form-group row form pt-5 pb-5">
          <div class="col-6  d-flex justify-content-center">
            <img
              class="rounded-circle"
              v-bind:src="avatar"
              width="120"
              height="120"
            />
          </div>
          <div class="col-6">
            <base-button v-on:click.prevent="onPickFile()">
              KÉP CSERÉJE
            </base-button>
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
              v-model.lazy="user.displayName"
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
              v-model="user.email"
            />
          </div>
        </div>

        <base-button class="" @click.prevent="saveUser()">
          MENTÉS
        </base-button>

        <base-button class="warning" @click.prevent="logout()">
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
      user: "",

      storedPhotoURL: null,
      newPhotoURL: null,
      image: null,
      image_src: "",
    };
  },
  computed: {
    avatar() {
      if (this.image_src !== "") {
        return this.image_src;
      } else {
        return this.storedPhotoURL;
      }
    },
    uid() {
      return this.$store.getters.user.uid;
    },
  },
  watch: {},

  methods: {
    getUser() {
      this.user = this.$store.getters.user;

      if (this.user.photoURL === null) {
        this.storedPhotoURL = "/img/user_1.c159038c.png";
      } else {
        this.storedPhotoURL = this.user.photoURL;
      }
    },

    async saveUser() {
      const that = this;
      var user = await firebase.auth().currentUser;

      user
        .updateProfile({
          email: this.user.email,
          displayName: this.user.displayName,
          photoURL: this.newPhotoURL,
        })
        .then(function() {
          that.$store.commit("setUser", {
            isLoggedIn: true,
            user: that.user,
          });
        })
        .catch(function(error) {
          // An error happened.
          console.log(error);
        });

      firebase
        .firestore()
        .collection("/users/")
        .doc(user.uid)
        .update({
          displayName: this.user.displayName,
          photoURL: this.newPhotoURL,
        })
        .then
        // Create the current session ID locally, and upload it to the store
        ()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },

    onPickFile() {
      this.$refs.fileInput.click();
    },

    onFilePicked(event) {
      const files = event.target.files;
      let filename = files[0].name;

      if (filename.lastIndexOf(".") <= 0) {
        return alert("Plase add a valid image file! ");
      }

      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.storedPhotoURL = fileReader.result;
      });

      fileReader.readAsDataURL(files[0]);
      this.image = files[0];

      this.uploadPicture();
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
        .child("/avatars/" + this.user.uid + "." + extension)
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
            that.newPhotoURL = downloadURL;
            that.user.photoURL = that.newPhotoURL;
            console.log("File available at", that.newPhotoURL);
            that.saveUser();
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

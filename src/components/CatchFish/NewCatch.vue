<template>
  <base-card v-bind:uid="uid" ref="new-catch">
    <template v-slot:card-img>
      <base-button v-if="!imageUrl" class="upload" v-on:click="onPickFile()">
        KÉP FELTÖLTÉSE!
      </base-button>
      <img v-bind:src="imageUrl" />
    </template>

    <template v-slot:card-info>
      <label for="file-input"> </label>
      <input
        id="fileInput"
        type="file"
        class="d-none"
        ref="fileInput"
        accept="image/*"
        v-on:change="onFilePicked"
      />
      <div v-if="imageUrl" id="form" class="form-group row p-0 m-0">
        <form
          autocomplete="off"
          class="form pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="submitCatch()"
        >
          <div class="form-group row">
            <label
              class="col-6 col-form-label font-weight-bold mt-3"
              for="catch_date"
              >Időpont:
            </label>
            <div class="col-6  mt-3">
              <input
                class="form-control"
                id="catch_date"
                name="catch_date"
                type="datetime-local"
                v-model="catch_date"
              />
            </div>

            <label
              class="col-6 col-form-label font-weight-bold mt-3"
              for="species"
              >Halfaj:
            </label>
            <div class="col-6 mt-3 d-flex flex-column ">
              <input class="" type="text" v-model="species" />

              <div v-if="species && showSuggestions === true" class="">
                <div
                  class=""
                  v-for="suggestion in matches.slice(0, 5)"
                  v-bind:key="suggestion"
                >
                  <div class="btn btn-outline" v-on:click="chooseSpecies">
                    {{ suggestion }}
                  </div>
                </div>
              </div>
            </div>

            <label
              class="col-6 col-form-label font-weight-bold mt-3"
              for="species"
              >Súly (kg):
            </label>
            <div class="col-6 mt-3 d-flex">
              <input
                class="form-control"
                id="weight"
                name="weight"
                type="text"
                v-model="weight"
              />
            </div>

            <label
              class="col-6 col-form-label font-weight-bold mt-3"
              v-on:click="getLocation;"
              for="length"
              >Hossz (cm):
            </label>
            <div class="col-6 mt-3 d-flex">
              <input
                class="form-control"
                id="length"
                name="length"
                type="text"
                v-model="lenght"
              />
            </div>

            <label
              class="col-12 col-form-label font-weight-bold mt-3"
              v-on:click="getLocation;"
              for="length"
              >Történet:
            </label>
            <div class="col-12 mt-3 d-flex">
              <input
                class="form-control"
                id="comment"
                name="comment"
                type="text"
                v-model="comment"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-3 ">
            <base-button class="">
              ELKÜLD
            </base-button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
import firebase from "firebase";
import { mapActions, mapGetters } from "vuex";
import BaseButton from "../BaseElements/BaseButton.vue";

export default {
  components: { BaseButton },
  data() {
    return {
      catch_date: "",
      species: null,
      weight: "",
      lenght: "",
      comment: "",

      currentSession: this.getCurrentSession,
      imageUrl: "",
      image: null,
      image_src: "",
      location: "",
      catchID: "",

      showSuggestions: true,
      fish: [
        "tiszai ingola ",
        "dunai ingola ",
        "vágó tok ",
        "sima tok ",
        "kecsege ",
        "sőregtok ",
        "viza ",
        "szibériai tok ",
        "angolna ",
        "dunai hering ",
        "kövi csík ",
        "vágó csík ",
        "réti csík ",
        "kőfúró csík ",
        "lapos keszeg ",
        "dévérkeszeg ",
        "bagolykeszeg ",
        "karikakeszeg ",
        "sujtásos küsz ",
        "szélhajtó küsz ",
        "állas küsz ",
        "balin ",
        "márna ",
        "petényi-márna ",
        "ezüstkárász ",
        "aranykárász ",
        "paduc ",
        "amur ",
        "ponty ",
        "fenékjáró küllő ",
        "homoki küllő ",
        "felpillantó küllő ",
        "halványfoltú küllő ",
        "fehér busa ",
        "pettyes busa ",
        "kurta baing ",
        "fejes domolykó ",
        "jászkeszeg ",
        "nyúldomolykó ",
        "vaskos csabak ",
        "fekete amur ",
        "garda ",
        "fürge cselle ",
        "kínai razbóra ",
        "szivárványos ökle ",
        "gyöngyös koncér ",
        "leánykoncér ",
        "bodorka ",
        "vörösszárnyú keszeg ",
        "compó ",
        "szilvaorrú keszeg ",
        "európai harcsa ",
        "afrikai harcsa ",
        "fekete törpeharcsa ",
        "törpeharcsa ",
        "pettyes harcsa ",
        "törpemaréna ",
        "nagy maréna ",
        "dunai galóca ",
        "szivárványos pisztráng ",
        "sebes pisztráng ",
        "pataki szajbling ",
        "pénzes pér ",
        "csuka ",
        "lápi póc ",
        "menyhal ",
        "szúnyogirtó fogasponty ",
        "Szivárványos guppi ",
        "tüskés pikó ",
        "szivárványsügér ",
        "folyami géb ",
        "csupasztorkú géb ",
        "kessler géb ",
        "feketeszájú géb ",
        "szirman géb ",
        "tarka géb ",
        "amurgéb ",
        "széles durbincs ",
        "vágó durbincs ",
        "selymes durbincs ",
        "csapósügér ",
        "süllő ",
        "kősüllő ",
        "német bucó ",
        "magyar bucó ",
        "naphal ",
        "pisztrángsügér ",
        "botos kölönte ",
        "cifra kölönte ",
      ],
    };
  },
  computed: {
    ...mapGetters("session", {
      getCurrentSession: "getCurrentSession",
    }),

    uid() {
      return this.$store.getters.user.uid;
    },

    matches() {
      return this.fish.filter((string) => string.match(this.species));
    },
  },
  methods: {
    ...mapActions("session", {
      updateIsFishing: "updateIsFishing",
      updateTotalNumberOfSessions: "updateTotalNumberOfSessions",
    }),

    parseYMDHM(s) {
      var b = s.split(/\D+/);
      return new Date(b[0], b[1] - 1, b[2], b[3], b[4], 0 || 0, 0 || 0);
    },

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
    },

    submitCatch() {
      if (this.species !== "" && this.weight !== "" && this.lenght !== "") {
        const user = this.$store.getters.user;
        const currentSession = this.getCurrentSession;
        const that = this;
        console.log(this.catch_date);

        let catchDate = "";

        if (this.catch_date === "") {
          catchDate = new Date();
        } else {
          catchDate = this.parseYMDHM(this.catch_date);
        }

        firebase
          .firestore()
          .collection("/catches")
          .add({
            user_id: user.uid,
            session_id: currentSession,
            location: this.location,
            catch_date: catchDate,
            species: this.species,
            weight: this.weight,
            lenght: this.lenght,
            comment: this.comment,
            // We don't have the src yet, we have to update later this field with the file upload
            image_src: "",
          })
          .then(function(docRef) {
            that.catchID = docRef.id;
            console.log("Catch registered: " + docRef.id);
            that.uploadPicture();
          })
          .catch(function(error) {
            console.error("Error adding document: ", error);
          });
      }
    },

    updateImgSrc() {
      const that = this;
      console.log("update IMG Source in database");

      firebase
        .firestore()
        .collection("catches/")
        .doc(this.catchID)
        .update({
          // Update the src after upload
          image_src: that.image_src,
        })
        .then(function() {})
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    uploadPicture() {
      const userID = this.$store.getters.userID;
      const currentSession = this.getCurrentSession;
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
            userID +
            "/" +
            currentSession +
            "/" +
            this.catchID +
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
            that.updateImgSrc();
          });
        }
      );
    },

    chooseSpecies(event) {
      this.species = event.target.firstChild.data;
      this.toggleSuggestions();
    },

    toggleSuggestions() {
      this.showSuggestions = !this.showSuggestions;
    },

    goto(refName) {
      var element = this.$refs[refName];
      console.log(element);
      var top = element.offsetTop;
      window.scrollTo(0, top);
    },
  },
  mounted() {
    this.goto("new-catch");
  },
};
</script>

<style lang="scss" scoped>
img {
  width: 100%;
}

.upload {
  height: 300px;
  font-weight: bold;
  color: #2c3e50;
  border: 1px solid #2c3e50;
  background-color: transparent;
  border-radius: 0px;
}

.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
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

select {
  border: none;
  border-bottom: 1px solid #2c3e50;
  border-radius: 0;
}
.form-control {
  width: 100%;
}
</style>

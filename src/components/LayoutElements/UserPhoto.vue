<template>
  <div>
    <img class="nav-avatar" :src="updatedPhotoURL" alt="user-avatar" />
  </div>
</template>

<script>
import { db } from "../../firebase";

export default {
  props: {
    uid: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      photoURL: "",
    };
  },
  computed: {
    updatedPhotoURL() {
      if (this.photoURL === "") {
        return require("../../assets/img/user_1.png");
      } else {
        return this.photoURL;
      }
    },
  },
  watch: {
    uid: function() {
      this.getPhotoUrl();
    },
  },
  methods: {
    getPhotoUrl() {
      const that = this;
      db.collection("users")
        .doc(this.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            that.photoURL = doc.data().photoURL;
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },
  },
  mounted() {
    if (this.uid !== undefined || this.uid === "") {
      this.getPhotoUrl();
    }
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  padding: 3px;
  border: 1px solid #c7913655;
  box-shadow: 0 0 0 1px #fff, 0 0 0 2px #c7913655;
  border-radius: 50%;
}
</style>

<template>
  <div>
    <img class="" :src="updatedPhotoURL" alt="user-avatar" />
  </div>
</template>

<script>
import { db } from "../../firebase";

export default {
  props: {
    uid: {
      type: String,
      required: true,
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
    this.getPhotoUrl();
  },
};
</script>

<style scoped>
img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
</style>

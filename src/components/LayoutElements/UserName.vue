<template>
  <div>
    {{ updatedDisplayName }}
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
      displayName: null,
    };
  },
  computed: {
    updatedDisplayName() {
      return this.displayName;
    },
  },
  methods: {
    getDisplayName() {
      const that = this;
      db.collection("users")
        .doc(this.uid)
        .get()
        .then(function(doc) {
          if (doc.exists) {
            that.displayName = doc.data().displayName;
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
    this.getDisplayName();
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

<template>
  <div class="d-flex">
    <img
      @click="toggleLike()"
      class=""
      :src="imgURL"
      width="24"
      height="24"
      alt="like"
    />
    <div class="pl-1">{{ totalLikes }}</div>
  </div>
</template>

<script>
import { db } from "../../firebase.js";

export default {
  props: {
    catchId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      counter: 0,
      postLikes: [],
      isUserLiked: null,
    };
  },
  computed: {
    isAlreadyLiked() {
      return this.isUserLiked;
    },

    imgURL() {
      if (this.isAlreadyLiked) {
        return require("../../assets/heart_red.png");
      } else {
        return require("../../assets/heart.png");
      }
    },

    totalLikes() {
      return this.counter;
    },
  },

  methods: {
    getPostLikes() {
      const that = this;

      db.collection("catches/" + this.catchId + "/likedBy/")
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            that.postLikes.push(doc.id);
          });
          that.counter = that.postLikes.length;
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    getIsUserLiked() {
      const that = this;
      const uid = this.$store.getters.user.uid;

      db.collection("users/" + uid + "/likedPosts")
        .doc(this.catchId)
        .get()
        .then(function(doc) {
          if (doc.data()) {
            that.isUserLiked = true;
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    toggleLike() {
      if (this.$store.getters.user) {
        if (this.isAlreadyLiked) {
          this.counter = this.counter - 1;
          this.isUserLiked = false;
          this.deleteUserLike();
          this.deletePostLike();
        } else {
          this.counter = this.counter + 1;
          this.isUserLiked = true;
          this.updateUserLike();
          this.updatePostLikes();
        }
      } else {
        console.log("Log in, or sign up if you still not a member! ");
      }
    },

    updatePostLikes() {
      const uid = this.$store.getters.user.uid;

      db.collection("catches/" + this.catchId + "/likedBy/")
        .doc(uid)
        .set(
          {
            like_date: new Date(),
          },
          { merge: true }
        )
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    updateUserLike() {
      const uid = this.$store.getters.user.uid;

      db.collection("users/" + uid + "/likedPosts")
        .doc(this.catchId)
        .set(
          {
            like_date: new Date(),
          },
          { merge: true }
        )
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    deletePostLike() {
      const uid = this.$store.getters.user.uid;

      db.collection("catches/" + this.catchId + "/likedBy/")
        .doc(uid)
        .delete()
        .catch(function(error) {
          console.error("Can't delete the document: ", error);
        });
    },

    deleteUserLike() {
      const uid = this.$store.getters.user.uid;

      db.collection("users/" + uid + "/likedPosts/")
        .doc(this.catchId)
        .delete()
        .catch(function(error) {
          console.error("Can't delete the document: ", error);
        });
    },
  },

  beforeMount() {
    if (this.$store.getters.user !== null) {
      this.getIsUserLiked();
    }

    this.getPostLikes();
  },
};
</script>

<template>
  <div class="d-flex">
    <img
      @click="likePost()"
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
import { mapActions, mapGetters } from "vuex";

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
      userNewLikes: [],
    };
  },
  computed: {
    uid() {
      return this.$store.getters.user.uid;
    },

    isAlreadyLiked() {
      return this.userLikes.includes(this.catchId);
    },

    imgURL() {
      if (this.isAlreadyLiked) {
        return require("../../assets/heart_red.png");
      } else {
        return require("../../assets/heart.png");
      }
    },

    ...mapGetters("social", {
      userLikes: "userLikes",
    }),

    totalLikes() {
      return this.counter;
    },
  },

  methods: {
    ...mapActions("social", {
      getUserLikes: "getUserLikes",
      updateUserLikes: "updateUserLikes",
    }),

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

    toggleLike() {
      if (this.isAlreadyLiked) {
        this.counter = this.counter - 1;
        this.userNewLikes = this.userLikes;
        this.userNewLikes.splice(this.userLikes.indexOf(this.catchId), 1);
        this.postLikes.splice(this.postLikes.indexOf(this.uid), 1);
        this.deletePostLikes();
      } else {
        this.counter = this.counter + 1;
        this.userNewLikes = this.userLikes;
        this.userNewLikes.push(this.catchId);
        this.postLikes.push(this.uid);
        this.updatePostLikes();
      }
    },

    updatePostLikes() {
      const that = this;
      db.collection("catches/" + this.catchId + "/likedBy/")
        .doc(that.uid)
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

    deletePostLikes() {
      const that = this;
      db.collection("catches/" + this.catchId + "/likedBy/")
        .doc(that.uid)
        .delete()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },

    likePost() {
      this.updatePostLikes();
      this.toggleLike();
      this.updateUserLikes(this.userNewLikes);
    },
  },

  beforeMount() {
    this.getUserLikes();
    this.getPostLikes();
  },
};
</script>

<template>
  <div class="d-flex">
    <img
      @click="toggleLike"
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
      allLikes: [],

      userLikes: [],
      isAlreadyLiked: false,
    };
  },
  computed: {
    uid() {
      return this.$store.getters.user.uid;
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
    getLikes() {
      console.log("Getting Likes");
      const that = this;

      db.collection("users")
        .doc(this.uid)
        .get()
        .then(function(doc) {
          if (doc.data().likes) {
            that.userLikes = doc.data().likes;
            that.isAlreadyLiked = that.userLikes.includes(that.catchId);
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });

      db.collection("catches")
        .doc(that.catchId)
        .get()
        .then(function(doc) {
          if (doc.data().likes) {
            that.allLikes = doc.data().likes;
            that.counter = that.allLikes.length;
          } else {
            that.counter = 0;
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    },

    async toggleLike() {
      await this.getLikes();

      console.log("All likes: " + this.userLikes);

      if (this.isAlreadyLiked) {
        this.counter = this.counter - 1;
        this.userLikes.splice(this.userLikes.indexOf(this.catchId), 1);
        this.allLikes.splice(this.allLikes.indexOf(this.uid), 1);
        this.updateLikes();
        this.isAlreadyLiked = false;
      } else {
        this.counter = this.counter + 1;
        this.userLikes.push(this.catchId);
        this.allLikes.push(this.uid);
        this.updateLikes();
        this.isAlreadyLiked = true;
      }
    },

    updateLikes() {
      const that = this;

      db.collection("users")
        .doc(this.uid)
        .set(
          {
            likes: that.userLikes,
          },
          { merge: true }
        )
        .then()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });

      db.collection("catches")
        .doc(that.catchId)
        .set(
          {
            likes: that.allLikes,
          },
          { merge: true }
        )
        .then()
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
    },
  },
  beforeMount() {
    this.getLikes();
  },
  updated() {
    this.getLikes();
  },
};
</script>

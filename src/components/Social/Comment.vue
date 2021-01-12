<template>
  <div>
    <form class="container row">
      <label class="font-weight-bold col-12 d-none" for="comment"
        >Komment:</label
      >
      <div class="d-flex">
        <input
          class="pr-3"
          type="text"
          id="comment"
          name="comment"
          v-model="comment"
          placeholder="Hozzászólás írása..."
        />
        <img
          class="ml-3 "
          src="../../assets/send.png"
          width="24"
          height="24"
          v-on:click="saveComment"
        />
      </div>
    </form>
  </div>
</template>

<script>
import { db } from "../../firebase";
export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
    postOwnerId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comment: "",
    };
  },
  computed: {
    uid() {
      return this.$store.getters.user.uid;
    },
  },
  methods: {
    saveComment() {
      db.collection("catches/" + this.postId + "/comments")
        .doc()
        .set({
          comment_date: new Date(),
          user: this.uid,
          comment: this.comment,
        })
        .catch((error) => {
          console.log("Error: " + error);
        });

      db.collection("social/" + this.postOwnerId + "/comments")
        .doc(this.postId)
        .set({
          comment_date: new Date(),
          user: this.uid,
          comment: this.comment,
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
$color: #2c3e50;
div {
  width: 100%;

  form {
    width: 100%;
    div {
      input {
        border: none;
        width: 100%;
        border-bottom: 1px solid $color;
        border-radius: 0px;
      }
      img {
        opacity: 0.9;
      }
      select {
        border: none;
        border-bottom: 1px solid $color;
        border-radius: 0;
      }
    }
    .warning {
      color: white;
      background-color: #c79136;
    }
  }
}
</style>

<template>
  <div class="container row mb-1">
    <div
      class="col-12 mb-1 d-flex"
      v-for="comment in comments"
      v-bind:key="comment"
    >
      <user-name class="font-weight-bold" v-bind:uid="comment.user"></user-name
      >: {{ comment.comment }}
    </div>
  </div>
</template>

<script>
import { db } from "../../firebase";
import UserName from "../LayoutElements/UserName.vue";

export default {
  components: { UserName },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  methods: {
    loadComments() {
      const that = this;

      console.log("Loading comments!");
      db.collection("catches/" + this.postId + "/comments")
        .get()
        .then(function(querySnapshot) {
          console.log(querySnapshot.docs);
          querySnapshot.forEach(function(doc) {
            that.comments.push({
              user: doc.data().user,
              comment_date: doc.data().comment_date,
              comment: doc.data().comment,
            });
          });
        })
        .catch((error) => {
          console.log("Error: " + error);
        });
    },
  },
  created() {
    this.loadComments();
  },
};
</script>

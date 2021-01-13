<template>
  <div v-if="isCommentsActive" class="container row mb-1">
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
      numberOfComments: 0,
      isCommentsActive: false,
    };
  },

  methods: {
    loadComments() {
      const that = this;
      db.collection("catches/" + this.postId + "/comments")
        .orderBy("comment_date", "desc")
        .get()
        .then(function(querySnapshot) {
          const queryArray = querySnapshot.docs;
          if (queryArray[0] === undefined) {
            that.isCommentsActive = false;
          } else {
            that.isCommentsActive = true;
            querySnapshot.forEach(function(doc) {
              that.comments.push({
                user: doc.data().user,
                comment_date: doc.data().comment_date,
                comment: doc.data().comment,
              });
              that.numberOfComments += 1;
            });
            that.$emit("number-of-comments", that.numberOfComments);
          }
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

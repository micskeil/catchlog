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
      isCommentsActive: false,
    };
  },
  computed: {},
  watch: {
    comments(oldComments, newComments) {
      if (newComments.lenght > 0) {
        this.isCommentsActive = true;
        console.log("iscommentactive: " + this.isCommentsActive);
      } else {
        this.isCommentsActive = false;
        console.log("iscommentactive: " + this.isCommentsActive);
      }
    },
  },
  methods: {
    loadComments() {
      const that = this;
      db.collection("catches/" + this.postId + "/comments")
        .get()
        .then(function(querySnapshot) {
          const queryArray = querySnapshot.docs;
          if ((queryArray[0] = undefined)) {
            console.log("No comment found for this post");
          } else {
            that.isCommentsActive = true;
            querySnapshot.forEach(function(doc) {
              that.comments.push({
                user: doc.data().user,
                comment_date: doc.data().comment_date,
                comment: doc.data().comment,
              });
            });
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

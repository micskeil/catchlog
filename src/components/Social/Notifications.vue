<template> </template>

<script>
import { db } from "../../firebase";

export default {
  data() {
    return {
      comments: [],
      likes: [],
    };
  },
  methods: {
    getComments() {
      db.collection("social/" + uid + "/comments")
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
};
</script>

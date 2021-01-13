<template>
  <base-card v-bind:uid="uid">
    <template v-slot:user-info>
      <div class="catch-date pr-3 d-flex align-self-center align-content-end">
        {{ getFormattedDate(post.catch_date) }}
      </div>
    </template>
    <template v-slot:card-img>
      <img
        v-bind:src="post.image_src"
        class="card-img"
        alt="img_uploaded_by_user"
      />
      <div class="fish-info d-flex justify-content-between">
        <div class="species card-text pl-3 font-weight-bold">
          {{ post.species }}
        </div>

        <div class="size d-flex justify-content-end mr-3  align-content-end">
          <p class="measures align-self-center">
            Méret: &nbsp; {{ post.weight }} kg, {{ post.lenght }} cm
          </p>
        </div>
      </div>
      <div class="social d-flex pt-1 justify-content-between ml-3 mr-3">
        <div class="d-flex">
          <like-button v-bind:catchId="catchId"></like-button>
          <img
            v-on:click="toggleIsCommentActive"
            class="comment-button ml-3"
            src="../../assets/message.png"
            width="24"
            height="24"
            alt="message"
          />
          <div class="pl-1">{{ numberOfComments }}</div>
        </div>
        <div>
          <img
            class="ml-3"
            src="../../assets/bookmark.png"
            width="24"
            height="24"
            alt="bookmark"
          />
        </div>
      </div>
      <div v-if="post.comment" class="row pt-3">
        <p class="align-self-center col-12  pl-3 pr-3 ">
          {{ post.comment }}
        </p>
      </div>
    </template>

    <template v-slot:card-info>
      <show-comments
        @number-of-comments="setNumberOfComments"
        :postId="postId"
        :key="isCommentActive"
      ></show-comments>
      <comment
        class="comment-field"
        v-on:submit="toggleIsCommentActive"
        v-if="commentField"
        :postId="postId"
        :postOwnerId="post.user_id"
      ></comment
    ></template>
  </base-card>
</template>

<script>
import { db } from "../../firebase";
import Comment from "../Social/Comment";
import ShowComments from "../Social/ShowComments.vue";

export default {
  components: { Comment, ShowComments },
  props: {
    postId: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      post: {},
      numberOfComments: 0,
      isCommentActive: false,
      componentKey: 0,
    };
  },
  computed: {
    uid() {
      return this.post.user_id;
    },
    catchId() {
      return this.postId;
    },
    commentField() {
      return this.isCommentActive;
    },
  },

  methods: {
    setNumberOfComments(payload) {
      this.numberOfComments = payload;
    },

    toggleIsCommentActive() {
      this.isCommentActive = !this.isCommentActive;
    },

    getFormattedDate(date) {
      if (date) {
        var year = date.getFullYear();
        var month = (1 + date.getMonth()).toString();
        month = month.length > 1 ? month : "0" + month;

        var day = date.getDate().toString();
        day = day.length > 1 ? day : "0" + day;

        var hour = date.getHours().toString();
        hour = hour.length > 1 ? hour : "0" + hour;

        var minute = date.getMinutes().toString();
        minute = minute.length > 1 ? minute : "0" + minute;

        return year + "/" + month + "/" + day + " " + hour + ":" + minute;
      }
    },

    loadPost() {
      const that = this;

      db.collection("catches/")
        .doc(that.postId)
        .get()
        .then(function(doc) {
          that.post = {
            catch_id: doc.id,
            catch_date: new Date(doc.data().catch_date.seconds * 1000),
            comment: doc.data().comment,
            species: doc.data().species,
            lenght: doc.data().lenght,
            user_id: doc.data().user_id,
            weight: doc.data().weight,
            image_src: doc.data().image_src,
          };
        })
        .then(() => {
          that.isLoading = false;
        });
    },
  },
  created() {
    if (
      this.postId !== "" ||
      this.postId !== null ||
      this.postId !== undefined
    ) {
      this.loadPost();
    }
  },
};
</script>

<style lang="scss" scoped>
.user-bar {
  .user-img {
    width: 2rem;
    height: 2rem;
    border: 1px solid #6969d1b7;
  }
  .user-info {
    width: 100%;
  }
  .user-name {
    white-space: nowrap;
  }
  .catch-date {
    white-space: nowrap;
  }
}

.card-img {
  border-radius: 0;
}

.fish-info {
  width: 100%;
  border-top: 1px solid white;
  color: white;
  background-color: #2c3e50;

  .species {
    font-size: 1.5rem;
    width: fit-content;
  }
  .measures {
    font-size: 1rem;
    width: fit-content;
  }
}
</style>

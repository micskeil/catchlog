<template> </template>

<script>
import { db } from "../../firebase";

export default {
  props: {
    postId: {
      type: String,
      required: true,
    },
  },
  methods: {
    loadComments() {},
  },
};
</script>

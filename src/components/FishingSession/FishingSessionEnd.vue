<template>
  <div class="card shadow mt-5 rounded-0">
    <base-card>
      <template v-slot:card-info>
        <div class="session-end pb-3">
          <strong>Finished fishing </strong>on {{ session.end_date }} at
          {{ session.location }}
        </div>
      </template>
    </base-card>
  </div>
</template>

<script>
export default {
  props: ["session"],
  data() {
    return {};
  },
  mounted() {},
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>

<template>
  <div class="card shadow mt-3 rounded-0">
    <base-card>
      <template v-slot:card-info>
        <div class="session-end pb-3">
          <strong>Finished fishing </strong> on {{ session.end_date }}
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
};
</script>

<style scoped>
div {
  width: 100%;
}
</style>

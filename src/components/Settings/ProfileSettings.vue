<template>
  <base-card ref="settings">
    <template v-slot:user-info><div></div></template>
    <template v-slot:card-img> <div></div></template>
    <template v-slot:card-info>
      <form class="form pb-3 p-0 m-0" v-on:submit.prevent="updateUser()">
        <div class="form-group row form pt-3">
          <label class="col-6 col-form-label font-weight-bold" for="user-name"
            >Felhasználónév:
          </label>
          <div class="datetime col-6 text-right">
            <input
              class="form-control"
              id="user-name"
              name="user-name"
              type="text"
              v-model.lazy="displayName"
            />
          </div>

          <label
            class="col-6 pt-3 col-form-label font-weight-bold"
            for="start-date"
            >E-mail cím:
          </label>
          <div class="col-6 pt-3 pb-3">
            <input
              class="form-control"
              id="coordinates"
              name="coordinates"
              type="text"
              v-model="email"
            />
          </div>
        </div>

        <base-button class="">
          Adatok mentése
        </base-button>

        <base-button class="warning" @click="logout()">
          Kilépés
        </base-button>
      </form>
    </template>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      userId: "",
      displayName: "",
      email: "",
    };
  },
  watch: {
    updatedDisplayName() {
      return this.displayName;
    },
  },

  methods: {
    getUser() {
      this.displayName = this.$store.getters.userName;
      this.email = this.$store.getters.email;
    },

    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push({ name: "Login" });
    },
  },
  created() {
    this.getUser();
  },
};
</script>
<style scoped>
form {
  width: 100%;
}

.form-group {
  width: 100%;
}

.warning {
  background-color: orange;
}
</style>

<template>
  <base-card ref="settings">
    <template v-slot:user-info><div></div></template>
    <template v-slot:card-img>
      <div
        id="location"
        class="d-flex flex-column pt-3 align-items-center"
      ></div>

      <div class="d-flex flex-column  p-3 align-items-center"></div>
    </template>
    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form
          class="pb-3 mb-3 col-12 p-0 m-0"
          v-on:submit.prevent="updateUser()"
        >
          <div class="form-group form row pt-3">
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
              {{ updatedDisplayName }}
            </div>

            <label
              class="col-6 pt-3 col-form-label font-weight-bold"
              for="start-date"
              >E-mail cím:
            </label>
            <div class="col-6 pt-3">
              <input
                class="form-control"
                id="coordinates"
                name="coordinates"
                type="text"
                v-model="email"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-5 ">
            <base-button
              class="btn btn-dark container-fluid p-2 justify-self-center"
            >
              Adatok mentése
            </base-button>
          </div>
        </form>
      </div>
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
  },
  created() {
    this.getUser();
  },
};
</script>

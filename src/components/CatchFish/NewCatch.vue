<template>
  <base-card>
    <template v-slot:card-img>
      <div id="">
        <div
          class="image-upload d-flex flex-column align-items-center justify-content-center border pt-3 pb-3"
        >
          <label for="file-input">
            <img src="../../assets/img_upload.png" />
          </label>

          <input id="file-input" type="file" />
        </div></div
    ></template>

    <template v-slot:card-info>
      <div id="form" class="form-group row p-0 m-0">
        <form class="pb-3 mb-3 col-12 p-0 m-0" v-on:submit.prevent="submitForm">
          <div class="form-group row">
            <label
              class="col-sm-3 col-form-label font-weight-bold"
              v-on:click="getLocation;"
              for="start-date"
              >Catch time:
            </label>
            <div class="col-sm-9">
              <input
                class="form-control"
                id="start-date"
                name="start-date"
                type="datetime-local"
                v-model="new_session_start_date"
              />
            </div>
          </div>

          <div id="button" class="d-flex justify-content-center pt-3 ">
            <button class="btn btn-dark rounded justify-self-center">
              Register catch
            </button>
          </div>
        </form>
      </div>
    </template>
  </base-card>
</template>

<script>
export default {
  props: [""],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#form {
  width: 100%;
}
.image-upload > input {
  display: block;
}
form {
  height: 100%;
  width: 100%;
}
.form-control {
  width: 100%;
}
</style>

<template>
  <div class="login">
    <form
      class="form d-flex flex-column shadow p-5"
      @submit.prevent="forgetPassword"
    >
      <h3>Elfelejtett jelszó?</h3>

      <div class="form-group pt-3 mt-3">
        <input
          type="email"
          class="form-control "
          placeholder="E-mail cím"
          v-model="user.email"
        />
      </div>

      <base-button type="submit" class="btn btn-dark btn-lg mt-3 btn-block">
        Küldés
      </base-button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert(
            "A jelszó megváltoztatásához szükséges linket elküldtük az általad megadott címre! "
          );
          this.user = {
            email: "",
          };
        })
        .catch((error) => {
          alert(error);
        });
    },
  },
};
</script>

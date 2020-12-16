<template>
  <div class="login">
    <form
      class="form  border d-flex flex-column shadow p-5"
      @submit.prevent="forgetPassword"
    >
      <h3>Elfelejtett jelszó?</h3>

      <div class="form-group pt-3">
        <label>E-mail cím: </label>
        <input type="email" class="form-control " v-model="user.email" />
      </div>

      <button type="submit" class="btn btn-dark btn-lg mt-3 btn-block">
        Küldés
      </button>
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

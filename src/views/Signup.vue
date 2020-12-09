<template>
  <div class="login p-0">
    <form
      class="form  border d-flex flex-column shadow p-5"
      @submit.prevent="userRegistration"
    >
      <h3>Sign Up</h3>

      <div class="form-group">
        <label>Name</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model="user.name"
        />
      </div>

      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control form-control-lg"
          v-model="user.email"
        />
      </div>

      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="user.password"
        />
      </div>

      <button type="submit" class="btn btn-dark btn-lg mt-3 btn-block">
        Sign Up
      </button>

      <p class="forgot-password text-right">
        Already registered
        <router-link :to="{ name: 'Login' }">sign in?</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
  },
};
</script>

<template>
  <div class="login p-0 m-0">
    <form
      class="form d-flex shadow flex-column p-5"
      @submit.prevent=""
      novalidate
    >
      <div
        class="brand d-flex flex-column pb-5 justify-content-around
      align-items-center "
      >
        <img class="" src="../assets/logo.png" width="64" height="64" />
        <h3 class="brand-name pt-3 ">Pecázunk.hu</h3>
      </div>
      <div class="form-group">
        <input
          required="true"
          title="Az e-mail cím legalább egy '@'-ot tartalmaz. Például: horgasz@mail.hu"
          type="email"
          class="email-input form-control"
          placeholder="E-mail"
          v-model.trim="user.email"
        />
      </div>

      <div class="form-group pt-3">
        <input
          type="password"
          class="password-input form-control "
          placeholder="Password"
          v-model.trim="user.password"
        />
      </div>
      <p v-if="!formIsValid" class="warning mt-3 p-1 ">
        A belépés sikertelen, kérlek ellenőrízd az e-mail címed és a
        jelszavadat!
      </p>

      <base-button @click="login" type="submit" class="submit">
        BELÉPÉS
      </base-button>
      <p class="forgot-password text-right pt-3">
        Még nem vagy tag?
        <router-link :to="{ name: 'Signup' }">Regisztráj! </router-link>
      </p>

      <p class="forgot-password text-right mt-3 ">
        <router-link to="/forgot-password">Elfelejtett jelszó!</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formIsValid: true,

      user: {
        email: "",
        password: "",
      },
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLoggedIn;
    },
  },
  methods: {
    async login() {
      const that = this;
      if (
        this.user.email === "" ||
        this.user.email === null ||
        !this.user.email.includes("@")
      ) {
        this.formIsValid = false;
        return;
      } else {
        try {
          this.isLoading = true;
          await this.$store.dispatch("login", {
            email: this.user.email,
            password: this.user.password,
          });
          console.log(this.$store.getters.isLoggedIn);
          if (this.isLoggedIn) {
            this.$router.push({ name: "Timeline" });
          } else {
            that.formIsValid = false;
          }
        } catch (error) {
          that.formIsValid = false;
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode + ": " + errorMessage);
        }
      }
    },
  },
};
</script>

<style lang="scss">
$color: #2c3e50;

$breakpoint-tablet: 768px;

.login {
  display: grid;
  place-items: center;
  height: 100vh;
  width: 100vw;
  background-image: url("../assets/bg.jpg");
  background-size: cover;

  @media (max-width: $breakpoint-tablet) {
    background-image: none;
    height: 90vh;
  }

  .form {
    input {
      border: none;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    select {
      border: none;
      border-bottom: 1px solid $color;
      border-radius: 0;
    }
    .warning {
      color: white;
      background-color: #c79136;
    }
    font-size: 1rem;
    width: 400px;
    max-width: 100vw;
    background-color: rgb(255, 255, 255);
    @media (max-width: $breakpoint-tablet) {
      box-shadow: none !important;
      max-width: 100vw;
    }
  }
}
</style>

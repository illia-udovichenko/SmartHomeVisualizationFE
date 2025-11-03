<script>
import axios from 'axios';
import {useUserStore} from "@/stores/useUserStore";
import {VueCookieNext} from "vue-cookie-next";
import MyHeader from "@/components/UI/myHeader.vue";

export default {
  components: {MyHeader},
  data() {
    return {
      user: useUserStore(),
      username: '',
      password: '',
      message: '',
      loading: false,
      submitAttempted: false
    };
  },
  computed: {
    passwordValid() {
      // Minimum password length of 8 characters
      const hasMinimumLength = this.password.length >= 8;

      // At least one uppercase letter
      const hasUppercaseLetter = /[A-Z]/.test(this.password);

      // At least one lowercase letter
      const hasLowercaseLetter = /[a-z]/.test(this.password);

      // At least one number
      const hasNumber = /\d/.test(this.password);

      // Password is valid if it meets all the criteria
      return hasMinimumLength && hasUppercaseLetter && hasLowercaseLetter && hasNumber;
    }
  },
  methods: {
    async handleLogin() {
      this.submitAttempted = true;
      this.message = "";

      // Post username and password
      if (this.passwordValid) {
        this.loading = true;
        try {
          const response = await axios.post('token/', {
            username: this.username,
            password: this.password,
          });
          // Store tokens
          this.user.setTokens(response.data);

          // Store user's info
          await this.storeUserInfo();

          this.$router.push('/mainMenu');
        } catch (error) {
          this.message = error.response?.data?.detail;
          console.log("Error while doing login:", this.message);
        } finally {
          this.loading = false;
        }
      }
    },
    async storeUserInfo () {
      try {
        console.log("inside storeUserInfo: " + VueCookieNext.getCookie("accessToken"));
        // Get info
        const response = await axios.get('user/');
        // Store info
        this.user.setUserInfo(response.data);
        console.log("Successfully got user's uuid");
      } catch (error) {
        console.log("Error while getting user's info:", error);
      }
    }
  }
};
</script>

<template>
  <div class="background">
    <my-header link="/"/>
    <div class="login-container">
      <el-header>Login</el-header>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" @input="submitAttempted = false" type="password" required class="form-control" :class="{ 'is-invalid': submitAttempted && !passwordValid }">
          <div v-if="submitAttempted && !passwordValid" class="error-feedback">
            Password must be at least 8 characters: <br>
            1 uppercase, 1 lowercase, 1 number
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"/>
            Log In
          </button>
        </div>
      </form>
      <div v-if="message" class="alert">
        {{ message }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
  overflow: auto; /* Prevents margin collapsing */
}

.login-container {
  max-width: 400px;
  margin-top: 14vh;
  margin-left: auto;
  margin-right: auto;
  padding: 25px;
  text-align: center;
  color: white;
  font-size: 1.5rem;
}

.el-header {
  margin-bottom: 8vh;
  font-size: 3rem;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
}

.form-control:focus {
  outline: none;
  border: 1px solid black;
  box-shadow: 0 0 0 2px rgba(102, 88, 237, 0.2);
}

.is-invalid {
  border-color: #e3342f;
}

.error-feedback {
  margin-top: 5px;
  font-size: 14px;
  color: #e3342f;
  text-align: left;
}

.btn-primary {
  background: linear-gradient(45deg, rgb(180, 150, 255), #ff416c, #ff4b2b, #ff416c, rgb(180, 150, 255));
  border: none;
  padding: 10px;
  text-transform: uppercase;
  border-radius: 20px;
  margin-top: 10vh;
}


.btn-primary:disabled {
  background-color: #a9a9a9;
}

.alert {
  padding: 10px;
  margin-top: 20px;
  border-radius: 4px;
  text-align: center;
  background-color: #f8d7da;
  color: #721c24;
}

.spinner-border {
  margin-right: 5px;
}
</style>
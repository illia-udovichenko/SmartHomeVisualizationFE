<script>
import axios from 'axios';
import {useUserStore} from "@/stores/useUserStore";
import MyHeader from "@/components/UI/myHeader.vue";

export default {
  components: {MyHeader},
  data() {
    return {
      user: useUserStore(),
      username: '',
      email: '',
      password: '',
      message: '',
      loading: false,
      emailAttempted: false,
      passwordAttempted: false
    };
  },
  computed: {
    emailValid() {
      return /\S+@\S+\.\S+/.test(this.email);
    },
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
    async handleRegister() {
      this.emailAttempted = true;
      this.passwordAttempted = true;
      this.message = "";

      if (this.emailValid && this.passwordValid) {
        this.loading = true;
        try {
          delete axios.defaults.headers.common['Authorization'];
          const response = await axios.post('register/', {
            username: this.username,
            email: this.email,
            password: this.password,
          });
          this.successful = true;
          // Save info about the user
          this.user.setUserInfo(response.data);

          // Get user's tokens
          try {
            const response = await axios.post('token/', {
              username: this.username,
              password: this.password,
            });

            this.user.setTokens(response.data);
            this.$router.push('/mainMenu');
          } catch (error) {
            console.log(error);
          }
        } catch (error) {
          this.successful = false;

          // Output all errors
          if (error.response && error.response.data) {
            // Iterate over each key-value pair
            Object.entries(error.response.data).forEach(([key, value]) => {
              // Iterate over each problem
              value.forEach(errorMessage => {
                this.message += `${key}: ${errorMessage}\n`;
              });
            });
          } else
            this.message = "Error from server side :("
        } finally {
          this.loading = false;
        }
      }
    }
  }
};
</script>

<template>
  <div class="background">
    <my-header link="/"/>
    <div class="register-container">
      <el-header>Registration</el-header>
      <form @submit.prevent="handleRegister">
        <div class="form-group">
          <label for="username">Username</label>
          <input id="username" v-model="username" type="text" class="form-control" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input id="email" v-model="email" @input="emailAttempted = false" type="email" class="form-control" required :class="{ 'is-invalid': emailAttempted && !emailValid }">
          <div v-if="emailAttempted && !emailValid" class="error-feedback">
            Email must be valid
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input id="password" v-model="password" @input="passwordAttempted = false" type="password" class="form-control" required :class="{ 'is-invalid': passwordAttempted && !passwordValid }">
          <div v-if="passwordAttempted && !passwordValid" class="error-feedback">
            Password must be at least 8 characters: <br>
            1 uppercase, 1 lowercase, 1 number
          </div>
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-primary btn-block" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm"></span>
            Sign Up
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
  overflow: auto;
}

.register-container {
  max-width: 400px;
  margin: 10vh auto;
  padding: 25px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
}

.el-header {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
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
  border-color: #301beb;
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
  background-color: #200dca;
  border: none;
  padding: 10px 20px;
  color: #fff;
  text-transform: uppercase;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #280ed1;
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

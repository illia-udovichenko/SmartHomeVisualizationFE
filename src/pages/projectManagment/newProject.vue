<script>
import MyHeader from "@/components/UI/myHeader.vue";
import {useProjectStore} from "@/stores/useProjectStore";
import axios from "axios";
import {useUserStore} from "@/stores/useUserStore";
import {VueCookieNext} from "vue-cookie-next";

export default {
  components: {
    MyHeader
  },
  data() {
    return {
      user: useUserStore(),
      project: {
        name: '',
        description: '',
        x: 0,
        y: 0,
      },
      message: '',
      loading: false,
      submitAttempted: false,
    };
  },
  computed: {
    nameValid() {
      return this.project.name.length >= 5;
    }
  },
  methods: {
    useProjectStore,
    async createProject() {
      this.submitAttempted = true;
      this.message = "";

      if (this.nameValid) {
        this.loading = true;
        try {
          const response = await axios.post('project/', this.project);
          // In the response same info as in project + uuid + empty array of floors
          // Save uuid to use it in editor to open current project
          VueCookieNext.setCookie("activeProject", response.data.uuid);

          // Open project in editor
          this.$router.push('/editor');
        } catch (error) {
          this.message = error.response?.data;
          console.log("Error while doing login:", error.response?.data);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>

<template>
  <div class="background">
    <my-header/>
    <div class="container">
      <h2 class="text-center mt-4 mb-3">Create New Project</h2>
      <div class="card">
        <div class="card-header">
          <router-link class="btn btn-outline-info float-right" to="/openProject">View All Projects</router-link>
        </div>
        <div class="card-body">
          <form @submit.prevent="createProject">
            <div class="form-group">
              <label for="name">Name</label>
              <input v-model="project.name" @input="submitAttempted = false" type="text" id="name" name="name" required class="form-control" :class="{'is-invalid': submitAttempted && !nameValid}"/>
              <div v-if="submitAttempted && !nameValid" class="error-feedback">
                Name should contain at least 5 characters
              </div>
            </div>
            <div class="form-group">
              <label for="description">Description</label>
              <textarea  v-model="project.description" type="text" class="form-control" rows="3"/>
            </div>
            <div class="form-group">
              <label>Dimensions</label>
              <div class="input-group">
                <input type="number" class="form-control" placeholder="Size: x" min="0" v-model="project.x" required>
                <div class="input-group-append">
                  <span class="input-group-text">m</span>
                </div>
              </div>
              <div class="input-group mt-2">
                <input type="number" class="form-control" placeholder="Size: y" min="0" v-model="project.y" required>
                <div class="input-group-append">
                  <span class="input-group-text">m</span>
                </div>
              </div>
            </div>
            <div class="submit">
              <button type="submit" class="btn btn-outline-info custom-btn" :disabled="loading">
                <span v-if="loading" class="spinner-border spinner-border-sm"/>
                Submit
              </button>
            </div>
            <div v-if="message" class="alert">
              {{message}}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.background {
  height: 100vh;
  overflow: auto;
  color: white;
}

.card {
  width: 60%;
  margin-left: auto;
  margin-right: auto;
  border-radius: 50px;
  padding: 10px;
  color: black;
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

.custom-btn {
  color: rgba(0, 149, 255, 0.8);
  background-color: transparent;
  border-color: rgba(0, 149, 255, 0.8);
}

.custom-btn:hover {
  color: #fff;
  background-color: rgba(0, 149, 255, 0.8);
  border-color: rgba(0, 149, 255, 0.8);
}

.submit {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
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
<script>
import MainMenuHeader from "@/components/mainMenu/mainMenuHeader.vue";
import {useUserStore} from "@/stores/useUserStore";
import {VueCookieNext} from "vue-cookie-next";
import axios from "axios";

export default {
  components: {MainMenuHeader},
  created() {
    useUserStore().isAuthenticated();
  },
  // delete after presentation
  methods: {
    deleteAccess () {
      VueCookieNext.removeCookie("accessToken");
    },
    trashAccess () {
      VueCookieNext.setCookie("accessToken", "won't tell you twice")
    },
    deleteRefresh () {
      VueCookieNext.removeCookie("refreshToken");
    },
    trashRefresh () {
      VueCookieNext.setCookie("refreshToken", `i'm thief in a night`)
    },
    async getUser () {
      try {
        console.log("inside storeUserInfo: " + VueCookieNext.getCookie("accessToken"));
        // Get info
        const response = await axios.get('user/');
        // Store info
        console.log("Successfully got user's uuid: " + response.data.uuid);
      } catch (error) {
        console.log("Error while getting user's info:", error);
      }
    },
    getButtonColor(index) {
      const totalButtons = 8;
      // purple variant
      const startColor = [80, 100, 255];
      const endColor = [180, 170, 255];
      // const startColor = [0, 120, 255, 0.5];
      // const endColor = [0, 120, 255, 1];
      const colorIncrement = endColor.map((end, i) => (end - startColor[i]) / totalButtons);
      const color = startColor.map((start, i) => (start + colorIncrement[i] * index));
      return `rgba(${color.join(',')})`;
    }
  }
}
</script>

<template>
  <div class="background">
    <main-menu-header/>
    <el-space class="center" :fill="true">
      <el-button @click="$router.push('/openProject')" :style="{backgroundColor: getButtonColor(1)}">My projects</el-button>
      <el-button @click="$router.push('/newProject')" :style="{backgroundColor: getButtonColor(2)}">Create new project</el-button>
      <el-upload drag>
        <el-text>Drop file here or click to upload</el-text>
      </el-upload>
      <el-button @click="deleteAccess" :style="{backgroundColor: getButtonColor(4)}">Delete access (to show how it works)</el-button>
      <el-button @click="deleteRefresh" :style="{backgroundColor: getButtonColor(5)}">Delete refresh (to show how it works)</el-button>
      <el-button @click="trashAccess" :style="{backgroundColor: getButtonColor(6)}">Put some trash into access (to show how it works)</el-button>
      <el-button @click="trashRefresh" :style="{backgroundColor: getButtonColor(7)}">Put some trash into refresh (to show how it works)</el-button>
      <el-button @click="getUser" :style="{backgroundColor: getButtonColor(8)}">Get user info</el-button>
    </el-space>
  </div>
</template>

<style scoped>
.background {
  height: 100vh;
}

.center {
  max-width: 40vw;
  margin: 5vh auto;
  padding: 5vh 2vw;
  border-radius: 8px;
  text-align: center;
}

.el-button {
  font-size: 1rem;
  margin: 0.2vh;
  border-radius: 20px; /* Rounded border */
  color: white; /* Default font color */
  border: none; /* Remove border */
  outline: none;
}

.el-button:hover {
  color: rgba(0, 0, 0, 0.4);
}

.el-upload {
  border-radius: 20px;
}
</style>
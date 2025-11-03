<script>
import {useUserStore} from "@/stores/useUserStore";
import { VueCookieNext} from "vue-cookie-next";

export default {
  data() {
    return {
      username: VueCookieNext.getCookie('username'),
      defaultAvatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
    };
  },
  methods: {
    handleLogOut() {
      useUserStore().clearData();
      this.$router.push('/');
    }
  },
};
// todo add hover color on buttons
</script>

<template>
  <el-row class="header">
    <el-col :span="12">
        <el-space>
          <el-avatar :size="52" :src="defaultAvatar"/>
          <el-text>Welcome, {{ username }}</el-text>
        </el-space>
      </el-col>
    <el-col :span="12">
      <el-space style="display: flex; justify-content: flex-end">
        <el-button>Edit</el-button>
        <el-button @click="handleLogOut">Log Out</el-button>
      </el-space>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-text{
  color: white;
  font-size: 1.5rem;
  margin-left: 1vw;
}

.el-button {
  font-size: 1.2rem;
  margin-top: 2vh;
  margin-left: 1vw;
  padding: 1.5vw;
  border-radius: 10px; /* Rounded border */
  background-color: rgb(0, 120, 255);
  color: white;
  border: none;
}

.el-button:hover {
  color: rgba(0, 0, 0, 0.4);
}

</style>